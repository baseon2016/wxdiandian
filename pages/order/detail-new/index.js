Page({
  data: {
    show: false,

    goodsCover: null,
    goodsTitle: "",
    goodsSubtitle: "",
    qty: null,
    bill: "",
	
	shopCover: null,
	shopTitle: "",
	shopSubtitle: "",
	star:null,
	location:'',
	
    buyer: "",
    phone: "",
	
    payment: "",
    discount: "",
    paybill:''
    
  },
  onLoad: function (e) {
    this.getData();
  },
  onReachBottom: function () {},
  onPullDownRefresh: function () {
    // wx.stopPullDownRefresh();
  },
  getData: function () {
    var t = this;
    var a = {
      show: true,
	  
      goodsCover: "/static/images/tempImg/shopCover.png",
      goodsTitle: "商品标题",
      goodsSubtitle: "副标题",
      qty: 2,
      bill: 420,
	  
	  shopCover: "/static/images/tempImg/shopCover.png",
      shopTitle: "西湖区西溪路蚂",
      shopSubtitle: "文昌路茂业中心四楼",
	  star:5,
	  location:'5km',
	  
      buyer: "还好",
      phone: "1344444444",
	  
      payment: 34,
      discount: 34,
      paybill:34,
      
    };
    setTimeout(function () {
      t.setData(a);
    }, 200);
  },
  inputComment: function (val) {
    var a = {};
    a[val.currentTarget.dataset.name] = val.detail.value.trim();
    this.setData(a);
  },
  pay: function () {
    console.log(this.data.comment);
  },
});
