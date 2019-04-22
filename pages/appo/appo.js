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
    onLoad: function () {
        const that = this;
        console.log("进入了预约详情页面");
        this.data.shopId = wx.getStorageSync('shopId');
        this.data.workTime = wx.getStorageSync('workTime');
        var shopName = wx.getStorageSync('shopName');





        this.setData({
            shopName : shopName,
            /*multiArray:' ',
            multiIndex:' ',
            multiArray1:' ',
            multiIndex1:' ',
            multiArray2:' ',
            multiIndex2:' ',*/
            // {{multiArray[0][multiIndex[0]]}} {{multiArray[1][multiIndex[1]]}} {{multiArray[2][multiIndex[2]]}}


        });

        console.log("shopId：" + this.data.shopId);
        console.log("workTime："  + this.data.workTime);




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
    delete:function(e){
        console.log('删除');
        const data = {
            multiArray: this.data.multiArray,
            multiIndex:this.data.multiIndex,
        }
        data.multiIndex[0] = 2
        data.multiArray[1] = [' '];
        data.multiArray[2] = [' '];
        this.setData(data)

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
        this.setData(data)

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
        this.setData(data)

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
    formSubmit(e) {
        console.log('form发生了submit事件，携带数据为：', e.detail.formId);
        console.log('form发生了submit事件，携带数据为：', e.detail.value);
        console.log('数组转化：', JSON.stringify(this.data.list));
        //var param = {"petLists":this.data.list};
        if (this.data.list[0].kindPet == ""&&this.data.list[1].kindPet == ""&&this.data.list[2].kindPet == ""){
            console.log("预约列表为空值，不能提交");
            //alert("预约列表为空值，不能提交");
            return false;
        }

        wx.request({
            url: 'https://qinxuan.club/dog-mini/customer/appointment.do',
            data: {
                shopId: this.data.shopId,
                workTime: '2019/04/21',
                openid: wx.getStorageSync('openid'),
                dtype:e.detail.formId,
                //petLists:JSON.stringify(this.data.list)
            },

            success(res) {
                console.log("发送预约请求结果：" + res);
            }
        });

    },
    formReset() {
        console.log('form发生了reset事件')
    },


      /*this.setData({
          multiIndex: e.detail.value
      })*/

     /* that.data.multiArray[0] = "";
      that.data.multiArray[1] = "";
      that.data.multiArray[2] = "";
      that.data.multiIndex[0] = "";
      that.data.multiIndex[1] = "";
      that.data.multiIndex[2] = "";
      that.data.multiArray1[0] = "";
      that.data.multiArray1[1] = "";
      that.data.multiArray1[2] = "";
      that.data.multiIndex1[0] = "";
      that.data.multiIndex1[1] = "";
      that.data.multiIndex1[2] = "";
      that.data.multiArray2[0] = "";
      that.data.multiArray2[1] = "";
      that.data.multiArray2[2] = "";
      that.data.multiIndex2[0] = "";
      that.data.multiIndex2[1] = "";
      that.data.multiIndex2[2] = "";
      */
      /*this.data.multiArray[0] = "";
      this.data.multiArray[1] = "";
      this.data.multiArray[2] = "";
      this.data.multiIndex[0] = "";
      this.data.multiIndex[1] = "";
      this.data.multiIndex[2] = "";
      this.data.multiArray1[0] = "";
      this.data.multiArray1[1] = "";
      this.data.multiArray1[2] = "";
      this.data.multiIndex1[0] = "";
      this.data.multiIndex1[1] = "";
      this.data.multiIndex1[2] = "";
      this.data.multiArray2[0] = "";
      this.data.multiArray2[1] = "";
      this.data.multiArray2[2] = "";
      this.data.multiIndex2[0] = "";
      this.data.multiIndex2[1] = "";
      this.data.multiIndex2[2] = "";*/


});

