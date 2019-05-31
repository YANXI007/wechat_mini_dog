//appo.js
const util = require('../../utils/util.js')


const app = getApp();
Page({
    data: {
        //判断小程序的API，回调，参数，组件等是否在当前版本可用。
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        currentTab : 0,
        addressTab : 0,
        addressName1: "龙江店",
        addressName2: "龙山店",
        addressName3: "容桂店",
        noOrder: true,
        dateSelect:'',
        addressSelect:'',
        btnColor:false,
        orderDate:'',
        orderAddress:'',
        orderTel:'',
        orderLists:'',
        appointmentId:null,
        appointmentId1:'',
        board:'',
        petList :[],
        timeYear1:'',
        timeYear2:'',
        timeYear3:'',
        //判断小程序的API，回调，参数，组件等是否在当前版本可用。
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        isHide: false

    },
    onLoad: function () {
        var that = this;
        // 查看是否授权
        wx.getSetting({
            success: function(res) {
                if (res.authSetting['scope.userInfo']) {
                    wx.getUserInfo({
                        success: function(res) {
                            wx.showToast({
                                title: '用户已授权',
                                icon: 'none',
                                duration: 1500
                            });
                            console.log("用户已授权");
                            // 用户已经授权过,不需要显示授权页面,所以不需要改变 isHide 的值
                            // 根据自己的需求有其他操作再补充
                            // 我这里实现的是在用户授权成功后，调用微信的 wx.login 接口，从而获取code
                            //wx.login({
                            //success: res => {
                            // 获取到用户的 code 之后：res.code
                            //console.log("用户的code:" + res.code);
                            // 可以传给后台，再经过解析获取用户的 openid
                            // 或者可以直接使用微信的提供的接口直接获取 openid ，方法如下：
                            // wx.request({
                            //     // 自行补上自己的 APPID 和 SECRET
                            //     url: 'https://api.weixin.qq.com/sns/jscode2session?appid=自己的APPID&secret=自己的SECRET&js_code=' + res.code + '&grant_type=authorization_code',
                            //     success: res => {
                            //         // 获取到用户的 openid
                            //         console.log("用户的openid:" + res.data.openid);
                            //     }
                            // });
                            //}
                            //});
                        }
                    });
                } else {
                    wx.showToast({
                        title: '用户未授权',
                        icon: 'none',
                        duration: 1500
                    });
                    console.log("用户未授权");
                    // 用户没有授权
                    // 改变 isHide 的值，显示授权页面
                    that.setData({
                        isHide: true
                    });
                }
            }
        });


        var timeT = util.formatDate(new Date());
        var dateT = util.getDates(3, timeT);
        // console.log(dateT);
        if(!this.data.havePlace1){
            this.setData({
                timeAm: '已满'
            })
        }
        if(!this.data.havePlace2){
            this.setData({
                timePm: '已满'
            })
        }

        this.setData({
            dateNum1: dateT[0].time,
            weekNum1: dateT[0].week,
            dateNum2: dateT[1].time,
            weekNum2: dateT[1].week,
            dateNum3: dateT[2].time,
            weekNum3: dateT[2].week,
            timeYear1:dateT[0].time_year,
            timeYear2:dateT[1].time_year,
            timeYear3:dateT[2].time_year,

        })
        this.queryInfo(0,0);
    },

    bindGetUserInfo: function(e) {
        if (e.detail.userInfo) {
            //用户按了允许授权按钮
            var that = this;
            // 获取到用户的信息了，打印到控制台上看下
            console.log("用户的信息如下：" + e.detail.userInfo.nickName);
            const userInfo = e.detail.userInfo;
            const nickName = userInfo.nickName;
            const avatarUrl = userInfo.avatarUrl;
            wx.request({
                url: 'https://qinxuan.club/dog-mini/core/saveClientInfo.do',
                data: {
                    openid: wx.getStorageSync('openid'),
                    nickName: nickName,
                    wxImg: avatarUrl
                },
                success(res) {
                    console.log("保存用户头像，昵称成功！");
                }
            });
            //授权成功后,通过改变 isHide 的值，让实现页面显示出来，把授权页面隐藏起来
            that.setData({
                isHide: false
            });
        } else {
            //用户按了拒绝按钮
            wx.showModal({
                title: '警告',
                content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
                showCancel: false,
                confirmText: '返回授权',
                success: function(res) {
                    // 用户没有授权成功，不需要改变 isHide 的值
                    if (res.confirm) {
                        console.log('用户点击了“返回授权”');
                    }
                }
            });
        }
    },

    //点击切换选择日期
    clickTab: function (e) {
        const that = this;
        if (that.data.currentTab === e.currentTarget.dataset.current) {
            return false;
        } else {
            // console.log(e.currentTarget.dataset.current);
            that.setData({
                currentTab: e.currentTarget.dataset.current,
            });
        }
        console.log(that.data.currentTab);
        this.queryInfo(that.data.addressTab,that.data.currentTab);


    },
    //点击切换选择地点
    addressTab: function (e) {
        const that = this;
        if (this.data.addressTab === e.currentTarget.dataset.address) {
            return false;
        } else {
            // console.log(e.currentTarget.dataset.address);
            that.setData({
                addressTab: e.currentTarget.dataset.address,
            })
        }
        console.log(this.data.addressTab);
        this.queryInfo(this.data.addressTab,this.data.currentTab);
    },
    queryInfo:function(shopId,workTime){
        console.log("选择店铺数字" + shopId + workTime);
        var shopName = '';
        const that = this;
        if (shopId==0){
            shopId = 'lj';
            shopName = '龙江店';
        }else if(shopId==1){
            shopId = 'ls';
            shopName = '龙山店';
        }else if(shopId == 2){
            shopId = 'rg';
            shopName = '容桂店';
        }
        if (workTime==0){
            workTime = that.data.timeYear1;
        }else if(workTime==1){
            workTime = that.data.timeYear2;
        }else if(workTime == 2){
            workTime = that.data.timeYear3;
        }
        console.log("选择workTime------" + workTime);
        wx.setStorageSync('shopId', shopId);
        wx.setStorageSync('workTime', workTime);
        wx.setStorageSync('shopName', shopName);
        wx.request({
            url: 'https://qinxuan.club/dog-mini/customer/appointmentPage.do',
            data: {
                shopId: shopId,
                workTime: workTime,
                openid: wx.getStorageSync('openid')
            },
            success(res) {
                console.log(res);
                //缓存是否预约过
                that.setData({
                    board:res.data.board
                });
                if(res.data.sysStatue==1){
                    that.setData({
                        btnColor: true
                    });
                }else{
                    that.setData({
                        btnColor: false
                    });
                }
                if(res.data.isApp==1){
                    //缓存预约列表
                    wx.setStorageSync("isApp",res.data.isApp);
                    wx.setStorageSync("petLists",res.data.CustomerAppointment.petLists);
                    wx.setStorageSync("appointmentId",res.data.CustomerAppointment.appointmentId);
                    wx.setStorageSync("phone",res.data.CustomerAppointment.phone);
                    wx.setStorageSync("orderDate",res.data.CustomerAppointment.oppointmentTimeStr);
                    var _petList = res.data.CustomerAppointment.petLists;
                    var list0 = '';
                    var list1 = '';
                    var list2 = '';
                    //渲染第一个
                    if (_petList[0] != undefined){
                        var kindPet = _petList[0].kindPet;
                        var kingService = _petList[0].kindService;
                        var size = _petList[0].size;
                        var _kindPet;
                        var _kingService;
                        var _size;
                        if (kindPet == "dog"){
                            _kindPet = '狗';
                            if (size == "mini"){
                                _size = '小型';
                            }else if (size == "normal"){
                                _size = '中型';
                            }else if (size == "large"){
                                _size = '大型';
                            }
                        }else if (kindPet == "cat"){
                            _kindPet = '猫';
                            if (size == "mini"){
                                _size = '幼年';
                            }else if (size == "normal"){
                                _size = '成年';
                            }
                        }
                        if (kingService == "wash"){
                            _kingService = '洗澡';
                        }else if (kingService == "modeling"){
                            _kingService = '造型';
                        }else if (kingService == "SPA"){
                            _kingService = 'SPA';
                        }
                        list0 = _size + " " + _kindPet + " " + _kingService;
                    }
                    //渲染第二个
                    if (_petList[1] != undefined){
                        var kindPet = _petList[1].kindPet;
                        var kingService = _petList[1].kindService;
                        var size = _petList[1].size;
                        var _kindPet;
                        var _kingService;
                        var _size;
                        if (kindPet == "dog"){
                            _kindPet = '犬';
                            if (size == "mini"){
                                _size = '小型';
                            }else if (size == "normal"){
                                _size = '中型';
                            }else if (size == "large"){
                                _size = '大型';
                            }
                        }else if (kindPet == "cat"){
                            _kindPet = '猫';
                            if (size == "mini"){
                                _size = '幼年';
                            }else if (size == "normal"){
                                _size = '成年';
                            }
                        }
                        if (kingService == "wash"){
                            _kingService = '洗澡';
                        }else if (kingService == "modeling"){
                            _kingService = '造型';
                        }else if (kingService == "SPA"){
                            _kingService = 'SPA';
                        }
                        list1 = _size + " " + _kindPet + " " + _kingService;
                    }
                    //渲染第三个
                    if (_petList[2] != undefined){
                        var kindPet = _petList[2].kindPet;
                        var kingService = _petList[2].kindService;
                        var size = _petList[2].size;
                        var _kindPet;
                        var _kingService;
                        var _size;
                        if (kindPet == "dog"){
                            _kindPet = '狗';
                            if (size == "mini"){
                                _size = '小型';
                            }else if (size == "normal"){
                                _size = '中型';
                            }else if (size == "large"){
                                _size = '大型';
                            }
                        }else if (kindPet == "cat"){
                            _kindPet = '猫';
                            if (size == "mini"){
                                _size = '幼年';
                            }else if (size == "normal"){
                                _size = '成年';
                            }
                        }
                        if (kingService == "wash"){
                            _kingService = '洗澡';
                        }else if (kingService == "modeling"){
                            _kingService = '造型';
                        }else if (kingService == "SPA"){
                            _kingService = 'SPA';
                        }
                        list2 = _size + " " + _kindPet + " " + _kingService;
                    }
                    that.setData({
                        petList:[list0,list1,list2],
                        noOrder: false,
                        orderDate: res.data.CustomerAppointment.oppointmentTimeStr,
                        orderAddress:shopName,
                        orderTel:res.data.CustomerAppointment.phone,
                        appointmentId:res.data.CustomerAppointment.appointmentId,
                        orderLists:res.data.CustomerAppointment.petLists,
                    });
                }else{
                    wx.setStorageSync("appointmentId",null);
                    wx.setStorageSync("isApp",0);
                    that.setData({
                        noOrder: true
                    });
                }
            }
        });
    },

    goappo:function(){
        wx.navigateTo({
            url: '../appo/appo'
        })
    },
    goindex:function(){
        wx.navigateTo({
            url: 'index'
        })
    },
    cancelOrder:function(){
        const that = this;
        wx.showModal({
            title: '提示',
            content: '取消预约后需要您再次进行预约才能享受服务。',
            showCancel:true,
            success(res) {
                if (res.confirm) {
                    console.log('用户点击确定');
                    that.confirmCancel();
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        })


    },
    confirmCancel:function () {
        const that = this;
        wx.request({
            url: 'https://qinxuan.club/dog-mini/customer/cancelApponitment.do',
            data: {
                appointmentId: that.data.appointmentId,
            },
            success(res) {
                if (res.data.type == 1){
                    wx.showToast({
                        title: '取消成功！',
                        icon: 'none',
                        duration: 1500
                    })
                }else {
                    wx.showToast({
                        title: '取消失败，请您稍后再试！',
                        icon: 'none',
                        duration: 1500
                    })
                }
            }
        });
        //取消操作后，刷新页面
        that.goindex();
    },
    /* bindGetUserInfo: function(e){
         var that = this;
         //此处授权得到userInfo
         console.log(e.detail.userInfo);
         //接下来写业务代码

         //最后，记得返回刚才的页面
         wx.navigateBack({
             delta: 1
         })
     },*/
    //上午的预约时间
    bindTimeChangeAm: function (e) {
        //console.log('picker发送选择改变，携带值为', e.detail.value);
        this.setData({
            timeAm: e.detail.value
        })
    },
    //下午的预约时间
    bindTimeChangePm: function (e) {
        //console.log('picker发送选择改变，携带值为', e.detail.value);
        this.setData({
            timePm: e.detail.value
        })
    },


});

