// pages/category/index.js
import{ request } from "../../request/index.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 左边菜单数据
    leftMenuList:[],
    // 右边商品数据
    rightContent:[],
    // 被点击的左侧菜单索引
    curentIndex: 0,
    // 右侧滚动条距离顶部的距离
    scrollTop: 0
  },
  //接口的返回数据
  Cates:[],

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /*
    1 现判断本地存储的有没有旧数据
    2 没有旧数据 直接发送请求
    3 有旧数据 同时旧数据没有过期就是用
    */

    // 1 获取本地存储中的数据
    const Cates = wx.getStorageSync('cates');
    // 2 判断
    if(!Cates) {
      // 不存在，发送请求获取数据
      this.getCates();
    } else {
      // 有数据，定义过期时间 10s 改成 5分钟
      if(Date.now() - Cates.time > 1000 * 10) {
        // 重新发送请求
        this.getCates();
      } else {
        // 可以使用旧数据
        console.log("使用旧数据")
        this.Cates = Cates.data;
        let leftMenuList = this.Cates.map(v=>v.cat_name)
        let rightContent = this.Cates[0].children
        this.setData({
          leftMenuList,
          rightContent
        })
      }
    }
  },

  // 获取分类数据
  getCates: function() {
    request({url: "https://api-hmugo-web.itheima.net/api/public/v1/categories"})
    .then(res=>{
      //console.log(res)
      this.Cates = res.data.message;

      // 把接口返回的数据存入本地缓存中
      wx.setStorageSync("cates", {
        time: Date.now(),
        data: this.Cates
      });
        

      // 构造左侧的大菜单数据
      let leftMenuList = this.Cates.map(v=>v.cat_name)
      // 构造右侧的商品数据
      let rightContent = this.Cates[0].children
      this.setData({
        leftMenuList,
        rightContent
      })
    })
  },

  handleItemTap: function(e) {
    console.log(e)
    let curentIndex = e.target.dataset.index;
    let rightContent = this.Cates[curentIndex].children;
    this.setData({
      curentIndex,
      rightContent,
      scrollTop: 0
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})