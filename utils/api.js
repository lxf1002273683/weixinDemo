//上传图片
function uploadFile(that){
    wx.chooseImage({
      count: 4, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        console.log(res)
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        that.setData({
          array: tempFilePaths,         //图片地址列表
          hide: true,                   //判断显示隐藏
        })
      }
    })
}
//拨打电话
function makePhoneCall(tell){
    wx.makePhoneCall({
      phoneNumber: tell //仅为示例，并非真实的电话号码
    })
}
//获取当前位置
function getLocation(){
    wx.getLocation({
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        wx.openLocation({
          latitude: latitude,
          longitude: longitude,
          scale: 28
        })
      }
    })
}
module.exports = {
  uploadFile,
  makePhoneCall,
  getLocation
}
