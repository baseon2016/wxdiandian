Page({
    data: {
       show: false,
       loading: false,
		paythroughData:{}
    },
    onLoad: function(e) {
        this.getData();
    },
    onReachBottom: function() {
        
    },
    onPullDownRefresh: function() {
        // wx.stopPullDownRefresh();
    },
    getData: function() {
        var t = this;
       var a = {
           show: true,
           loading: true,
           paythroughData:{
			   title:'西湖区西溪路蚂',
			   buyer:'还好',
			   phone:'13444444444',
			   payment:34
		   }
    
       };
	   setTimeout(function(){t.setData(a)},2000)
       
    },
    itemClick: function(t) {
        var a = this, i = e.pdata(t).id, s = e.pdata(t).goodsid;
        if (a.data.isedit) {
            var c = a.data.checkObj, l = a.data.checkNum;
            c[i] ? (c[i] = !1, l--) : (c[i] = !0, l++);
            var o = !0;
            for (var n in c) if (!c[n]) {
                o = !1;
                break;
            }
            a.setData({
                checkObj: c,
                isCheckAll: o,
                checkNum: l
            });
        } else wx.navigateTo({
            url: "/pages/goods/detail/index?id=" + s
        });
    },
    btnClick: function(t) {
        var a = this, i = t.currentTarget.dataset.action;
        if ("edit" == i) {
            c = {};
            for (var s in this.data.list) c[this.data.list[s].id] = !1;
            a.setData({
                isedit: !0,
                checkObj: c,
                isCheckAll: !1
            });
        } else if ("delete" == i) {
            var c = a.data.checkObj, l = [];
            for (var s in c) c[s] && l.push(s);
            if (l.length < 1) return;
            e.confirm("删除后不可恢复，确定要删除吗？", function() {
                e.post("member/favorite/remove", {
                    ids: l
                }, function(t) {
                    a.setData({
                        isedit: !1,
                        checkNum: 0,
                        page: 0,
                        list: []
                    }), a.getList();
                });
            });
        } else "finish" == i && a.setData({
            isedit: !1,
            checkNum: 0
        });
    },
    checkAllClick: function() {
        var t = !this.data.isCheckAll, e = this.data.checkObj, a = {
            isCheckAll: t,
            checkObj: e
        };
        for (var i in e) a.checkObj[i] = !!t;
        a.checkNum = t ? this.data.list.length : 0, this.setData(a);
    }
});