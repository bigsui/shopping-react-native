
var API_ADDRESS = 'http://test.api.bqmart.cn';
// var API_ADDRESS='https://api.bqmart.cn';
var DEBUG = true;
//  public static final String SERVERURL = "https://api.bqmart.cn";
//	public static final String SERVERURL = "http://test.api.bqmart.cn";

var API = {
	getSmsCode:function (type) {
		return API_ADDRESS+'/sms/sendcode'
	},
	HOST: 			API_ADDRESS, 
	LOGIN:    		API_ADDRESS + '/login/verifiycode',
	CATEGORYLIST: 	API_ADDRESS + '/stores/assortment',
	GOODSLIST: 		API_ADDRESS + '/goods/goodslist',
	CARTLIST: 		API_ADDRESS + '/cart/cartlists',
	ADDRESSLIST: 	API_ADDRESS + '/user/address',
	ORDERLIST:  	API_ADDRESS + '/user/order',
	COUPONLIST:  	API_ADDRESS + '/coupon/lists',
	GOODSDETAIL: 	API_ADDRESS + '/goods/goodsdetail',
	};

module.exports = API;