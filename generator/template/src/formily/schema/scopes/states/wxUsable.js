// Vue
import router from '@/router'
// wx JS SDK
import wx from 'weixin-js-sdk'
import { fetchWxConfig } from "@/common/rest"
// Formily
import { observable, } from '@formily/reactive'

// route params
const route = router.match(location.hash.replace('#/', ''))
const { query } = route

const wxUsable = observable.ref(true)

// configurate WX JS SDK
const config = {
  debug: query?.debug, // 调试模式，客户端 alert，pc端 console.log；
  appId: "wxec0dddbf8f93e083", // 必填，公众号的唯一标识
  jsApiList: ["checkJsApi", "chooseImage", "getLocalImgData"], // 必填，需要使用的JS接口列表
  /* timestamp、nonceStr 和 signature 通过后台获取 */
  // timestamp: 1632469166, // 必填，生成签名的时间戳
  // nonceStr: "bcc1fc464af34077", // 必填，生成签名的随机串
  // signature: "9cd55615fd0efc410aaafdee3195037a8bf7ee04", // 必填，签名
}
if (!query?.dontUseSDK) {
  fetchWxConfig(config).then(wxConfig => {
    wx.config(wxConfig)
    wx.error(() => {
      wxUsable.value = false
    })
  })
}

export default wxUsable
