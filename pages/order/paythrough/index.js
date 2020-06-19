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
});