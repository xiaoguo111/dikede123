import request from '@/utils/request'

export function verifiCationApi(randernum) {
  return request({
    url: `/user-service/user/imageCode/${randernum}`,
    responseType: 'arraybuffer'
  })
}
export const loginApi = (data) => {
  return request({
    method: 'POST',
    url: '/user-service/user/login',
    data:data,
  })
}

