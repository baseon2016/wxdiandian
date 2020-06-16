var e = getApp(),
	t = e.requirejs("core"),
	a = e.requirejs("wxParse/wxParse"),
	o = e.requirejs("biz/diypage"),
	i = e.requirejs("jquery");

Page({
	data: {
		route: "member",
		icons: e.requirejs("icons"),
		member: {},
		diypages: {},
		audios: {},
		audiosObj: {},
		modelShow: !1,
		autoplay: !0,
		interval: 5e3,
		duration: 500,
		swiperheight: 0,
		iscycelbuy: !1,
		bargain: !1,
		result: {},
		tList: [],
		bList: [],
		statusBarHeight: e.globalData.statusBarHeight,
	},
	onLoad: function(e) {
		this.setData({
			options: e
		});
	},
	getInfo: function() {
		var e = this;
		t.get("member", {}, function(t) {
			1 == t.isblack && wx.showModal({
				title: "无法访问",
				content: "您在商城的黑名单中，无权访问！",
				success: function(t) {
					t.confirm && e.close(), t.cancel && e.close();
				}
			}), 0 != t.error ? e.setData({
				member: t,
				show: !0,
				islogin: 0,
				customer: t.customer,
				customercolor: t.customercolor || "",
				phone: t.phone,
				phonecolor: t.phonecolor || "",
				phonenumber: t.phonenumber || "",
				iscycelbuy: t.iscycelbuy,
				bargain: t.bargain
			}) : e.setData({
				member: t,
				show: !0,
				islogin: 1,
				customer: t.customer,
				customercolor: t.customercolor || "",
				phone: t.phone,
				phonecolor: t.phonecolor || "",
				phonenumber: t.phonenumber || "",
				iscycelbuy: t.iscycelbuy,
				bargain: t.bargain
			}), a.wxParse("wxParseData", "html", t.copyright, e, "5");
		});
		// console.log(this.data.diypages)
	},
	onShow: function() {
		var t = this;
		this.getInfo(), wx.getSystemInfo({
			success: function(e) {
				var a = e.windowWidth / 1.7;
				t.setData({
					windowWidth: e.windowWidth,
					windowHeight: e.windowHeight,
					swiperheight: a
				});
			}
		}), t.setData({
			imgUrl: e.globalData.approot
		}), o.get(this, "member", function(e) {
			console.log(e.diypage.items)
			t.setData({
				bList: e.diypage.items.M1519885061238,
				tList: e.diypage.items.M1519884959829
			})
			console.log(t.data)
		});
	},
	onShareAppMessage: function() {
		return t.onShareAppMessage();
	},
	imagesHeight: function(e) {
		var t = e.detail.width,
			a = e.detail.height,
			o = e.target.dataset.type,
			i = this;
		wx.getSystemInfo({
			success: function(e) {
				i.data.result[o] = e.windowWidth / t * a, (!i.data[o] || i.data[o] && result[o] < i.data[o]) && i.setData({
					result: i.data.result
				});
			}
		});
	},
	memberLogin: function() {
		e.checkAuth();
	},
	cancelclick: function() {
		wx.switchTab({
			url: "/pages/index/index"
		});
	},
	confirmclick: function() {
		wx.openSetting({
			success: function(e) {}
		});
	},
	phone: function() {
		var e = this.data.phonenumber + "";
		wx.makePhoneCall({
			phoneNumber: e
		});
	},
	play: function(e) {
		var t = e.target.dataset.id,
			a = this.data.audiosObj[t] || !1;
		if (!a) {
			a = wx.createInnerAudioContext("audio_" + t);
			var o = this.data.audiosObj;
			o[t] = a, this.setData({
				audiosObj: o
			});
		}
		var i = this;
		a.onPlay(function() {
			var e = setInterval(function() {
				var o = a.currentTime / a.duration * 100 + "%",
					n = Math.floor(Math.ceil(a.currentTime) / 60),
					r = (Math.ceil(a.currentTime) % 60 / 100).toFixed(2).slice(-2),
					s = Math.ceil(a.currentTime);
				n < 10 && (n = "0" + n);
				var u = n + ":" + r,
					c = i.data.audios;
				c[t].audiowidth = o, c[t].Time = e, c[t].audiotime = u, c[t].seconds = s, i.setData({
					audios: c
				});
			}, 1e3);
		});
		var n = e.currentTarget.dataset.audio,
			r = e.currentTarget.dataset.time,
			s = e.currentTarget.dataset.pausestop,
			u = e.currentTarget.dataset.loopplay;
		0 == u && a.onEnded(function(e) {
			c[t].status = !1, i.setData({
				audios: c
			});
		});
		var c = i.data.audios;
		c[t] || (c[t] = {}), a.paused && 0 == r ? (a.src = n, a.play(), 1 == u && (a.loop = !0),
			c[t].status = !0, i.pauseOther(t)) : a.paused && r > 0 ? (a.play(), 0 == s ? a.seek(r) : a.seek(0),
			c[t].status = !0, i.pauseOther(t)) : (a.pause(), c[t].status = !1), i.setData({
			audios: c
		});
	},
	pauseOther: function(e) {
		var t = this;
		i.each(this.data.audiosObj, function(a, o) {
			if (a != e) {
				o.pause();
				var i = t.data.audios;
				i[a] && (i[a].status = !1, t.setData({
					audios: i
				}));
			}
		});
	},
	onHide: function() {
		this.pauseOther();
	},
	onUnload: function() {
		this.pauseOther();
	},
	navigate: function(e) {
		var t = e.currentTarget.dataset.url,
			a = e.currentTarget.dataset.phone,
			o = e.currentTarget.dataset.appid,
			i = e.currentTarget.dataset.appurl;
		t && wx.navigateTo({
			url: t,
			fail: function() {
				wx.switchTab({
					url: t
				});
			}
		}), a && wx.makePhoneCall({
			phoneNumber: a
		}), o && wx.navigateToMiniProgram({
			appId: o,
			path: i
		});
	},
	close: function() {
		e.globalDataClose.flag = !0, wx.reLaunch({
			url: "/pages/index/index"
		});
	}
});
