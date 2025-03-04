import request from "@/utils/request";  


export function getUserInfo() {
  return request({
    url: '/user/info',
    method: 'get'
  })    
}

export function toregister(data: any) {
  return request({
    url: '/user/register',
    method: 'post',
    data
  })
}

export function tologin(data: any) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}