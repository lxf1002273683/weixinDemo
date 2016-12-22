Page({
  data: {
      mmmm:'0',
      nnnn:'0'
  },
  switchover: function(e){
      this.setData({
          mmmm:e.currentTarget.dataset.index,
          nnnn:e.currentTarget.dataset.index
      })
  }
})