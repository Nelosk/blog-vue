import request from "@/utils/request";  


export function getUserInfo() {
  return request({
    url: '/user/info',
    method: 'get'
  })    
}

export function tologin(data: any) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}