//appo.js
const util = require('../../utils/util.js')



Page({
  data: {
      list:[{
          kindPet:"",
          size:"",
          kindService:""
      },{
          kindPet:"",
          size:"",
          kindService:""
      },{
          kindPet:"",
          size:"",
          kindService:""
      }],

      shopId:"",
      workTime:"",
      mobile:"",
      multiArray: [['犬', '猫','请选择'], ['中型', '大型', '小型',' '], ['洗澡', '造型','SPA',' ']],
      objectMultiArray: [
          [
              {
                  id: 0,
                  name: '犬'
              },
              {
                  id: 1,
                  name: '猫'
              },
              {
                  id: 2,
                  name: '请选择'
              }
          ], [
              {
                  id: 0,
                  name: '中型'
              },
              {
                  id: 1,
                  name: '大型'
              },
              {
                  id: 2,
                  name: '小型'
              },
              {
                  id: 3,
                  name: ' '
              }
          ], [
              {
                  id: 0,
                  name: '洗澡'
              },
              {
                  id: 1,
                  name: '造型'
              },
              {
                  id: 2,
                  name: 'SPA'
              },
              {
                  id: 3,
                  name: ' '
              }
          ]
      ],
      multiIndex: [2, 3, 3],

      multiArray1: [['犬', '猫','请选择'], ['中型', '大型', '小型',' '], ['洗澡', '造型','SPA',' ']],
      objectMultiArray1: [
          [
              {
                  id: 0,
                  name: '犬'
              },
              {
                  id: 1,
                  name: '猫'
              },
              {
                  id: 2,
                  name: '请选择'
              }
          ], [
              {
                  id: 0,
                  name: '中型'
              },
              {
                  id: 1,
                  name: '大型'
              },
              {
                  id: 2,
                  name: '小型'
              },
              {
                  id: 3,
                  name: ' '
              }
          ], [
              {
                  id: 0,
                  name: '洗澡'
              },
              {
                  id: 1,
                  name: '造型'
              },
              {
                  id: 2,
                  name: 'SPA'
              },
              {
                  id: 3,
                  name: ' '
              }
          ]
      ],
      multiIndex1: [2, 3, 3],

      multiArray2: [['犬', '猫','请选择'], ['中型', '大型', '小型',' '], ['洗澡', '造型','SPA',' ']],
      objectMultiArray2: [
          [
              {
                  id: 0,
                  name: '犬'
              },
              {
                  id: 1,
                  name: '猫'
              },
              {
                  id: 2,
                  name: '请选择'
              }
          ], [
              {
                  id: 0,
                  name: '中型'
              },
              {
                  id: 1,
                  name: '大型'
              },
              {
                  id: 2,
                  name: '小型'
              },
              {
                  id: 3,
                  name: ' '
              }
          ], [
              {
                  id: 0,
                  name: '洗澡'
              },
              {
                  id: 1,
                  name: '造型'
              },
              {
                  id: 2,
                  name: 'SPA'
              },
              {
                  id: 3,
                  name: ' '
              }
          ]
      ],
      multiIndex2: [2, 3, 3],
  },
    //页面打开后渲染数据
    onLoad: function () {
        const that = this;
        console.log("进入了预约详情页面");
        this.data.shopId = wx.getStorageSync('shopId');
        this.data.workTime = wx.getStorageSync('workTime');

        var shopName = wx.getStorageSync('shopName');
        this.setData({
            shopName : shopName,
        });

        var isApp = wx.getStorageSync('isApp');
        var petLists = '';

        //如果有历史预约记录，则进行回显
        //如果是修改，回显今日的记录，如果是预约，回显历史记录
        console.log("预约详情页面isApp：" + isApp);
        if (isApp == 1){
            petLists = wx.getStorageSync('petLists');
            console.log("获取缓存预约列表：" + petLists);
            //渲染petList
            that.showPetList(petLists);
        }else {
            wx.request({
                url: 'https://qinxuan.club/dog-mini/customer/showAppointHistory.do',
                data: {
                    shopId: this.data.shopId,
                    openid: wx.getStorageSync('openid'),
                },
                success(res) {
                    if (res.data.historyState == 1) {
                        petLists = res.data.pets;
                        //渲染petList
                        console.log("success功能回调");
                        that.showPetList(petLists);

                    }
                },
                complete(){
                    console.log("complete功能回调");
                }
            });
        }

    },

    //渲染petList
    showPetList:function (petList) {
        console.log("进入到数据回显渲染功能" + petList[0] + petList[2]);
        console.log("回显原始数据：" + petList[0].kindPet);
        console.log("回显原始数据：" + petList[0].kindService);
        console.log("回显原始数据：" + petList[0].size);

        //渲染第一个
        if (petList[0] != undefined){
            var kindPet = petList[0].kindPet;
            var kingService = petList[0].kindService;
            var size = petList[0].size;
            var _0;
            var _1;
            var _2;

            const data = {
                multiIndex:[1,2,2],
            };

            if (kindPet == "dog"){
                _0 = 0;
                if (size == "mini"){
                    _1 = 2;
                }else if (size == "normal"){
                    _1 = 0;
                }else if (size == "large"){
                    _1 = 1;
                }
            }else if (kindPet == "cat"){
                _0 = 1;
                if (size == "mini"){
                    _1 = 1;
                }else if (size == "normal"){
                    _1 = 0;
                }
            }
            if (kingService == "wash"){
                _2 = 0;
            }else if (kingService == "modeling"){
                _2 = 1;
            }else if (kingService == "spa"){
                _2 = 2;
            }
            data.multiIndex = [_0,_1,_2];
            console.log(data);
            this.setData(data)
            this.transPet(_0,_1,_2,0);
        }

        //渲染第二个
        if (petList[1] != undefined){
            var kindPet = petList[1].kindPet;
            var kingService = petList[1].kindService;
            var size = petList[1].size;
            var _0;
            var _1;
            var _2;

            const data = {
                multiIndex1:[1,2,2],
            };

            if (kindPet == "dog"){
                _0 = 0;
                if (size == "mini"){
                    _1 = 2;
                }else if (size == "normal"){
                    _1 = 0;
                }else if (size == "large"){
                    _1 = 1;
                }
            }else if (kindPet == "cat"){
                _0 = 1;
                if (size == "mini"){
                    _1 = 1;
                }else if (size == "normal"){
                    _1 = 0;
                }
            }
            if (kingService == "wash"){
                _2 = 0;
            }else if (kingService == "modeling"){
                _2 = 1;
            }else if (kingService == "spa"){
                _2 = 2;
            }
            data.multiIndex1 = [_0,_1,_2];
            console.log(data);
            this.setData(data)
            this.transPet(_0,_1,_2,1);
        }

        //渲染第三个
        if (petList[2] != undefined ){
            var kindPet = petList[2].kindPet;
            var kingService = petList[2].kindService;
            var size = petList[2].size;
            var _0;
            var _1;
            var _2;

            const data = {
                multiIndex2:[1,2,2],
            };

            if (kindPet == "dog"){
                _0 = 0;
                if (size == "mini"){
                    _1 = 2;
                }else if (size == "normal"){
                    _1 = 0;
                }else if (size == "large"){
                    _1 = 1;
                }
            }else if (kindPet == "cat"){
                _0 = 1;
                if (size == "mini"){
                    _1 = 1;
                }else if (size == "normal"){
                    _1 = 0;
                }
            }
            if (kingService == "wash"){
                _2 = 0;
            }else if (kingService == "modeling"){
                _2 = 1;
            }else if (kingService == "spa"){
                _2 = 2;
            }
            data.multiIndex2 = [_0,_1,_2];
            console.log(data);
            this.setData(data);
            this.transPet(_0,_1,_2,1);
        }

    },

    // 将选择的宠物转化为宠物对象，然后添加到数组中
    transPet:function(_kindPet,_size,_kindService,index){
      console.log("++++++++++++" + _kindPet,_size,_kindService,index);
      switch (_kindPet){
          case 0:
              _kindPet = "dog";
              break;
          case 1:
              _kindPet = "cat";
              break;
          case 2:
              _kindPet = "";
      }
      switch (_size){
          case 0:
             _size = "normal";
              break;
          case 1:
              _size = "large";
              break;
          case 2:
              _size = "mini";
              break;
      }
      switch (_kindService){
          case 0:
              _kindService = "wash";
              break;
          case 1:
              _kindService = "modeling";
              break;
          case 2:
              _kindService = "SPA";
              break;
      }
        if (_kindPet == "dog" || _kindPet == "cat"){
          this.data.list[index].kindPet = _kindPet;
          this.data.list[index].kindService = _kindService;
          this.data.list[index].size = _size;
        }else {
            this.data.list[index].kindPet = _kindPet;
        }

    },
    addPetList:function (pet,index) {
      const that = this
        //console.log("数组为：" + that.petList.toString())
    },
    bindPickerChange(e) {
        console.log('picker发送选择改变，携带值为', e.detail.value);
        this.setData({
            index: e.detail.value
        })
    },
    bindMultiPickerChange(e) {
        console.log('MultiPicker发送选择改变，携带值为', e.detail.value);
        var size = e.detail.value[0];
        // [kindPet,size,kindService]
        this.transPet(e.detail.value[0],e.detail.value[1],e.detail.value[2],0);

        this.setData({
            multiIndex: e.detail.value
        })
    },
    bindMultiPickerColumnChange(e) {
        console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
        const data = {
            multiArray: this.data.multiArray,
            multiIndex: this.data.multiIndex
        }
        data.multiIndex[e.detail.column] = e.detail.value
        // e.detail.column  第一列
        // 0：狗，1猫，3空

        switch (data.multiIndex[0]) {
            case 0:
                data.multiArray[1] = ['中型', '大型', '小型'];
                data.multiArray[2] = ['洗澡', '造型','SPA'];
                break;
            case 1:
                data.multiArray[1] = ['成年','幼年'];
                data.multiArray[2] = ['洗澡'];
                break;
            case 2:
                data.multiArray[1] = [' '];
                data.multiArray[2] = [' '];
        }


        this.setData(data)
    },

    //删除记录
    delete:function(e){
        console.log('删除');
        const data = {
            multiArray: this.data.multiArray,
            multiIndex:this.data.multiIndex,
        }
        data.multiIndex[0] = 2
        data.multiArray[1] = [' '];
        data.multiArray[2] = [' '];
        this.setData(data);
        this.transPet(2,0,0,0);
    },
    delete1:function(e){
        console.log('删除');
        const data = {
            multiArray1: this.data.multiArray1,
            multiIndex1:this.data.multiIndex1,
        }
        data.multiIndex1[0] = 2
        data.multiArray1[1] = [' '];
        data.multiArray1[2] = [' '];
        this.setData(data);
        this.transPet(2,0,0,1);

    },
    delete2:function(e){
        console.log('删除');
        const data = {
            multiArray2: this.data.multiArray2,
            multiIndex2:this.data.multiIndex2,
        }
        data.multiIndex2[0] = 2
        data.multiArray2[1] = [' '];
        data.multiArray2[2] = [' '];
        this.setData(data);
        this.transPet(2,0,0,2);

    },

    bindPickerChange1(e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            index: e.detail.value
        })
    },
    bindMultiPickerChange1(e) {
        console.log('MultiPicker发送选择改变，携带值为', e.detail.value);
        this.transPet(e.detail.value[0],e.detail.value[1],e.detail.value[2],1);
        this.setData({
            multiIndex1: e.detail.value
        })
    },
    bindMultiPickerColumnChange1(e) {
        console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
        const data = {
            multiArray1: this.data.multiArray1,
            multiIndex1: this.data.multiIndex1
        }
        data.multiIndex1[e.detail.column] = e.detail.value
        switch (data.multiIndex1[0]) {
            case 0:
                data.multiArray1[1] = ['中型', '大型', '小型'];
                data.multiArray1[2] = ['洗澡', '造型','SPA'];
                break;
            case 1:
                data.multiArray1[1] = ['成年','幼年'];
                data.multiArray1[2] = ['洗澡'];
                break;
            case 2:
                data.multiArray1[1] = [' '];
                data.multiArray1[2] = [' '];
        }
        this.setData(data)
    },

    bindPickerChange2(e) {
        console.log('picker发送选择改变，携带值为', e.detail.value);
        this.setData({
            index: e.detail.value
        })
    },
    bindMultiPickerChange2(e) {
        console.log('picker发送选择改变，携带值为', e.detail.value);
        this.transPet(e.detail.value[0],e.detail.value[1],e.detail.value[2],2);
        this.setData({
            multiIndex2: e.detail.value
        })
    },
    bindMultiPickerColumnChange2(e) {
        console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
        this.transPet(e.detail.value[0],e.detail.value[1],e.detail.value[2],2);
        const data = {
            multiArray2: this.data.multiArray2,
            multiIndex2: this.data.multiIndex2
        }
        data.multiIndex2[e.detail.column] = e.detail.value
        switch (data.multiIndex2[0]) {
            case 0:
                data.multiArray2[1] = ['中型', '大型', '小型'];
                data.multiArray2[2] = ['洗澡', '造型','SPA'];
                break;
            case 1:
                data.multiArray2[1] = ['成年','幼年'];
                data.multiArray2[2] = ['洗澡'];
                break;
            case 2:
                data.multiArray2[1] = [' '];
                data.multiArray2[2] = [' '];
        }
        this.setData(data)
    },

    mobileInput: function (e) {
        this.setData({
            mobile: e.detail.value
        })
    },

    formSubmit(e) {
        console.log('form发生了submit事件，携带数据为：', e.detail.formId);
        console.log('form发生了submit事件，携带数据为：', e.detail.value);
        console.log('数组转化：', JSON.stringify(this.data.list));
        //var param = {"petLists":this.data.list};

        var mobile = this.data.mobile;
        var phonetel = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
        if (mobile == '') {
            wx.showToast({
                title: '手机号不能为空',
                icon: 'none',
                duration: 1500
            })
            return false
        } else if (mobile.length != 11) {
            wx.showToast({
                title: '手机号长度有误',
                icon: 'none',
                duration: 1500
            })
            return false;
        }

        var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
        if (!myreg.test(mobile)) {
            wx.showToast({
                title: '手机号有误',
                icon: 'none',
                duration: 1500
            })
            return false;
        }
        if (this.data.list[0].kindPet == ""&&this.data.list[1].kindPet == ""&&this.data.list[2].kindPet == ""){
            wx.showToast({
                title: '预约列表不能为空',
                icon: 'none',
                duration: 1500
            })
            console.log("=-=-=-=-=-=-=")
            return false;
        }

        wx.request({
            url: 'https://qinxuan.club/dog-mini/customer/appointment.do',
            dataType:'json',
            data: {
                shopId: this.data.shopId,
                workTime: '2019/04/21',
                openid: wx.getStorageSync('openid'),
                dtype:e.detail.formId,
                'CustomerAppointment.petLists':this.data.list
                //petLists:JSON.stringify(this.data.list)
            },

            success(res) {
                console.log("发送预约请求结果：" + res.data);
            }
        });

    },
    formReset() {
        console.log('form发生了reset事件')
    },

});

