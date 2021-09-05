import {request} from "@/network/request";
import axios from "axios";
import {baseURL} from "@/common/const";

export function getDetail(detailId) {
  return request({
    url:'/detail/'+detailId,
    params: {
      detailId
    }
  })
}

//直接利用axios.post发送数据到前端
export function updateSQL(updateMsg) {
  return axios.post(baseURL+'/updateMsg',updateMsg).then(res => {
    console.log(res)
  }).catch(err => {
    console.log(err)
  })
}
