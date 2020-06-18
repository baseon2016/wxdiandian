Page({
  data: {
    show: false,
    avatar: null,
    shopName: "",
    goodsCover: null,
    goodsTitle: "",
    goodsSubtitle: "",
    qty: null,
    bill: "",
    buyer: "",
    phone: "",
    payment: "",
    discount: "",
    buyer: "",
    benefit: null,
    originalBill: null,
    comment: "",
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
      avatar: "/static/images/tempImg/avatar.png",
      shopName: "门店名称",
      goodsCover: "/static/images/tempImg/shopCover.png",
      goodsTitle: "商品标题",
      goodsSubtitle: "副标题",
      qty: 2,
      bill: 420,
      buyer: "还好",
      phone: "1344444444",
      payment: 34,
      discount: 34,
      buyer: "还好",
      benefit: 23,
      originalBill: 568,
      comment: "",
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
