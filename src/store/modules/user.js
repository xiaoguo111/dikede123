import {verifiCationApi} from '@/api/user'
import {loginApi} from '@/api/user'
import router from '@/router'
export default {
  namespaced: true,
  state: {
    verifiCation: '',
    code:'',
    token:''
  },
  mutations: {
    getcheck(state, payload) {
      state.verifiCation = payload
      console.log(payload);
    },
    getmath(state,payload){
     state.code=payload
    },
    gettoken(state,payload){
      state.token=payload
    }
  },
  actions: {
    async getcheck(context) {
      const len =32;
      const chars = 'ABCDEFGHIJKLMNOPQRSTWXYZabcdefhijkmnprstwxyz2345678'
      const maxPos =chars.length;
      let character ='';
      for (let i=0;i<len ;i++){
        character+=chars.charAt(Math.floor(Math.random()*maxPos))
      }
      context.commit('getmath',character)
      const res = await verifiCationApi(character)
      console.log(res);
      if (res.status === 200) {
        let imgurl = 'data:image/png;base64,' +
          btoa(
            new Uint8Array(res.data).reduce((data, byte) => data + String.fromCharCode(byte), '')
          );
          context.commit('getcheck',imgurl)
      }
    },
    async getloginApi(context,payload){
      const res =await loginApi(payload)
      console.log(res);
      context.commit('gettoken',res.data.token)
      if(res.data.msg==='登录成功'){
        router.push('/')
        Message({
        showClose:true,
        message:res.data.msg,
        type:'success'
        })
      }else{
        Message({
          showClose:true,
          message:res.data.msg,
          type:'error'
          })
      }
    }
  }
}
