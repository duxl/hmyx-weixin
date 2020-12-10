export const request=(params)=>{
    // 显示加载中
    wx.showLoading({
        title: "加载中",
        mask: true // 蒙板
    });
    
    // 定义公共的url
    const baseUrl = "https://api-hmugo-web.itheima.net/api/public/v1";
    return new Promise((resolve, reject)=>{
        var reqTask = wx.request({
            ...params,
            url: baseUrl+params.url,
            success: (result) => {
                resolve(result.data.message);
            },
            fail: (err) => {
                reject(err);
            },
            complete: () => {
                wx.hideLoading();
            }
        });          
    })
}