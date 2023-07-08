import createRequest from '../utils/request'

export function loginRequest(data){
  return createRequest({
      url:'/login',
      method:'POST',
      data,
      needLogin:false


  })
}
export function getCourseListRequest(data) {
  return createRequest({
    url: '/courses',
    data
  })
}
// export function get