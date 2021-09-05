import {request} from "@/network/request";

export function getHomeMultidata() {
  return request({
    url: '/swiper'
  })
}

export function getHomeList(type, page) {
  return request({
    // url: '/homeList?type='+type+'&page='+page,
    url:'/homeList/'+type+'/'+page,
    // url:'/homeList',
    params: {
      type,
      page
    }
  })
}


