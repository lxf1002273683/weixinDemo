var api=require('../../utils/api.js')
const date = new Date()
const years = []
const months = []
const days = []

for (let i = 1990; i <= date.getFullYear(); i++) {
  years.push(i)
}

for (let i = 1 ; i <= 12; i++) {
  months.push(i)
}

for (let i = 1 ; i <= 31; i++) {
  days.push(i)
}
Page({
  data: {
    // text:"这是一个页面"
    array: [],
    hide: false,
    latitude: '',
    longitude: '',
    speed: '',
    accuracy: '',
    networkType: '',
    model: '',
    pixelRatio: '',
    windowWidth: '',
    windowHeight: '',
    language: '',
    version: '',
    //数据缓存 保存数据变量
    texta: '',
    hhhh: 1,
    years: years,
    year: date.getFullYear(),
    months: months,
    month: 2,
    days: days,
    day: 2,
    year: date.getFullYear(),
    value: [9999, 1, 1],
  },
  bindChange: function(e) {
    const val = e.detail.value
    this.setData({
      year: this.data.years[val[0]],
      month: this.data.months[val[1]],
      day: this.data.days[val[2]]
    })
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '当前页面'
    })
  },
  onReady: function () {
    this.mapCtx = wx.createMapContext('myMap')
  },
  onPullDownRefresh: function(){
    console.log("sad")
  },
  handleLoadMore () {
    console.log('下拉加载')
    if (!this.data.itemlist_recommend_hasMore) return
    this.setData({ loading: true })
    return app.api.getItemList({
      item_style: this.data.itemlist_recommend_item_style,
      item_type: this.data.itemlist_recommend_item_type,
      cur_page: this.data.itemlist_recommend_cur_page++,
      page_size: this.data.itemlist_recommend_page_size
    }).then(res => {
      if (this.data.itemlist_recommend_cur_page >= res.data.total_pages) {
        this.setData({
          itemlist_recommend_hasMore: false,
          loading: false
        })
        return
      }
      this.setData({
        itemlist_recommend_list: this.data.itemlist_recommend_list.concat(res.data.items),
        loading: false
      })
    }).catch(e => {
      console.log('sdfsdfsdfsdf:', e)
    })
  },
  bindViewTap: function () {
    wx.navigateTo({
      url: '../user/user'
    })
  },
  downloadFile: function () {

  },
  //上传图片
  listenerButtonupolFile: function () {
    var that = this;
    api.uploadFile(that)
  },
  previewImage: function () {
    wx.previewImage({
      urls: this.data['array'] // 需要预览的图片http链接列表
    })
  },
  previewmap: function () {
    api.getLocation();
  },
  getNetworkType: function () {
    var that = this;
    wx.getNetworkType({
      success: function (res) {
        that.setData({
          networkType: res.networkType
        })
      }
    })
  },
  getSystemInfo: function () {
    var that = this;

    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          model: res.model,
          pixelRatio: res.pixelRatio,
          windowWidth: res.windowWidth,
          windowHeight: res.windowHeight,
          language: res.language,
          version: res.version,
        })
      }
    })
  },
  hh: function () {
    this.data.hhhh = 10;
    console.log(this.data.hhhh)
  },
  //拨打电话
  makePhoneCall: function () {
    api.makePhoneCall("10086")
  },
  setStoragebindinput: function (e) {
    this.setData({
      texta: e.detail.value
    })
  },
  setStorage: function (e) {
    var that = this;
    console.log(this.data.texta)
    wx.setStorage({
      key: "key",
      data: that.data.texta
    })
    setTimeout(function () {
      wx.getStorage({
        key: 'key',
        success: function (res) {
          console.log(res.data)
        }
      })
    }, 1000)
  },
  tiaozhuan: function () {
      wx.switchTab({
        url: '/pages/index/index'
      })
  },
  scanCode: function (){
    wx.scanCode({
      success: function(res){
        console.log(res)
      }
    })
  },
  getCenterLocation: function () {
    this.mapCtx.getCenterLocation({
      success: function(res){
        console.log(res.longitude)
        console.log(res.latitude)
      }
    })
  },
  moveToLocation: function () {
    this.mapCtx.moveToLocation()
  },
  onShareAppMessage: function () {
    return {
      title: '消息',
      desc: '分享描述',
    }
  }
  // onReachBottom: function () {
  //   wx.showToast({
  //     title: '成功',
  //     icon: 'success',
  //     duration: 2000
  //   })
  //   // Do something when page reach bottom.
  // }
})
