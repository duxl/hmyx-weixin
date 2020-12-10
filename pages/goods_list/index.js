import{ request } from "../../request/index.js";
import regeneratorRuntime, { async } from '../../lib/runtime/runtime';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
        id: 0,
        value:"综合",
        isActive: true
      },
      {
        id: 1,
        value:"销量",
        isActive: false
      },
      {
        id: 2,
        value:"价格",
        isActive: false
      }
    ],
    goodsList:[]
  },
  // 接口需要的参数
  QuearyParam: {
    query: "",
    cid: "",
    pagenum: 1,
    pagesize: 10
  },
  // 总页数
  totalPages:1,

  tabsItemChange:function(e) {
    // 1、获取被点击标题索引
    const {index} = e.detail
    // 2、修改元数组
    let {tabs} = this.data
    tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false)
    // 3、赋值到data中
    this.setData({
      tabs
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.QuearyParam.cid = options.cid;
    this.getGoodsList();
  },

  // 获取商品列表数据
  getGoodsList: async function() {
    const res = await request({
      url: "/goods/search",
      data: this.QuearyParam
    })
    // 获取总条数
    const total = res.total;
    this.totalPages = Math.ceil(total / this.QuearyParam.pagesize);

    //console.log(res)
    this.setData({
      // 拼接的数组（分页加载）
      goodsList: [...this.data.goodsList, ...res.goods]
    })
    // 关闭下拉刷新窗口
    wx.stopPullDownRefresh();
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
    // 1、重置数组
    this.setData({
      goodsList:[]
    })
    // 2、重置页码
    this.QuearyParam.pagenum = 1;
    // 3、请求数据
    this.getGoodsList();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if(this.QuearyParam.pagenum >= this.totalPages) {
      // 没有下一页数据了
      //console.log("没有下一页数据拉")
      wx.showToast({
        title: '没有下一页数据了'
      });
        
    } else {
      console.log("有下一页数据")
      this.QuearyParam.pagenum++;
      this.getGoodsList();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})