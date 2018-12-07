/*by zhuhy*/
summerready = function() {
		initPage();
}
//判断是否存在json的key
function objIsEmpty(obj) {
		if (obj != undefined && obj != null && obj != "") {
				return false;
		} else {
				return true;
		}
};
//判断是否为空
function isEmpty(obj) {
		if ( typeof obj == "undefined" || obj == null || obj == "" || obj.trim() == "") {
				return true;
		} else {
				return false;
		}
};

var vue = null;

function initPage() {
		vue = new Vue({
				el : '#index',
				data : {
						/*public??*/
						baseUrl : "http://172.16.14.212:8088/uapws/service/nc.itf.app.webservice.IPurchaseAppWebService/",
						inputStatus : 0,
						toggleStatus : 0,
						bandShow : false,
						turn : 0,
						dept : summer.pageParam.dept,
						module_id : summer.pageParam.module_id,
						module_title : summer.pageParam.module_title,
						record_id : parseInt(summer.pageParam.record_id),

						/*procureReceive*/
						plateNum : "",
						cardNum : "",
						grossWeight : "",
						splrNetWeight : "",
						procOrder : "",
						allotAuto : "",
						material : "",
						supplier : "",
						logCo : "",
						mineLocation : "",
						popupVisible : false,
						productLine : "",
						productLines : [{
								values : [{
										"text" : "一线"
								}, {
										"text" : "二线"
								}, {
										"text" : "三线"
								}]
						}],
						packPass : 1,
						subsidy : 1,
						clasp : "",
						buyerNum : "",
						sealNumber : "",
						sealColor : "",

						/*receiveQuery*/
						beginDate : "",
						stopDate : "",
						//起始日期
						beginDate : new Date().format("yyyy-MM-dd"),
						beignDatePickerValue : new Date(),
						//结束日期
						stopDate : new Date().format("yyyy-MM-dd"),
						stopDatePickerValue : new Date(),
						checkMaterial : "",
						materialId : "",
						supplier : "",
						supplierId : "",
						logList : [],
						/*overall data*/
						carAmount : "",
						ovClasp : "",
						ovNetWeight : "",
						ovGrossWeight : "",
						ovTareWeight : ""
				},
				methods : {
						letscan : function() {
								cordova.plugins.barcodeScanner.scan(function(result) {
										alert("We got a barcode" + "Result: " + result.text + " " + "Format: " + result.format + "" + "Cancelled: " + result.cancelled);
										//是否取消扫描
								}, function(error) {
										alert("Scanning failed: " + error);
								});
						},
						exitApp : function(param) {
								UM.confirm({
										title : "确认退出系统",
										text : "之后进入系统需要重新验证登录",
										btnText : ["取消", "确定"],
										overlay : true,
										duration : 2000,
										cancle : function() {
										},
										ok : vue.okCallback
								});
						},

						/*receiveQuery*/
						goItemSelector : function(flag) {
								roads.openWin(vue.dept, "itemSelector", vue.module_id + "/itemSelector/itemSelector.html", {
										"flag" : flag,
										"trigger" : vue.module_id
								});
						},
						backfrItemSelector : function(params) {
								switch(eval(params)["flag"]) {
								case (0):
										vue.checkMaterial = eval(params)["name"];
										vue.materialId = eval(params)["id"];
										break;
								case(1):
										vue.supplier = eval(params)["name"];
										vue.supplierId = eval(params)["id"];
										break;
								}
						},
						reset : function() {
								this.material = "";
								this.materialId = "";
								this.supplier = "";
								this.supplierId = "";
								this.logList = [];
								this.carAmount = "";
								this.ovClasp = "";
								this.ovNetWeight = "";
								this.ovGrossWeight = "";
								this.ovTareWeight = "";
						},
						query : function() {
								var param = {
										"startDate" : vue.beginDate,
										"endDate" : vue.stopDate,
										"material" : vue.materialId,
										"supplier" : vue.supplierId,
								};
								var soapXML = "<soapenv:Envelope xmlns:soapenv='http://schemas.xmlsoap.org/soap/envelope/' xmlns:ipur='http://webservice.app.itf.nc/IPurchaseAppWebService'><soapenv:Header/><soapenv:Body><ipur:receiveInfo><param>" + JSON.stringify(param) + "</param></ipur:receiveInfo></soapenv:Body></soapenv:Envelope>";
								roads.oldSkoolAjax(vue.baseUrl + "receiveInfo", soapXML, function(data) {
										var result = JSON.parse($(data).find("return").html());
										switch(result.status) {
										case -1:
												UM.toast({
														"title" : "错误提示",
														"text" : "抱歉，查询不到符合的结果!",
														"duration" : 1000
												});
												break;
										case 0:
												UM.toast({
														"title" : "错误提示",
														"text" : "抱歉，查询出现异常!",
														"duration" : 1000
												});
												break;
										case 1:
												var innerResultList = JSON.parse(result.data.detail);
												var innerOverall = result.data.total;
												vue.logList = innerResultList;
												vue.carAmount = innerOverall.carnums;
												vue.ovClasp = innerOverall.nabatebright;
												vue.ovNetWeight = innerOverall.nnet;
												vue.ovGrossWeight = innerOverall.ngross;
												vue.ovTareWeight = innerOverall.ntare;
												break;
										default:
												break;
										}
								});
						},
						checkPresentAuto : function() {
								roads.openWin(vue.dept, "presentAuto", vue.module_id + "/presentAuto/presentAuto.html", {});
						},

						/*procureReceive*/
						getLatestOrder : function() {
								var soapXML = "<soapenv:Envelope xmlns:soapenv='http://schemas.xmlsoap.org/soap/envelope/' xmlns:ipur='http://webservice.app.itf.nc/IPurchaseAppWebService'><soapenv:Header/><soapenv:Body><ipur:getPurchaseOrder/></soapenv:Body></soapenv:Envelope>";
								roads.oldSkoolAjax(vue.baseUrl + "getPurchaseOrder", soapXML, function(data) {
										var result = JSON.parse($(data).find("return").html());
										switch(result.status) {
										case -1:
												UM.toast({
														"title" : "错误提示",
														"text" : "抱歉，查询不到订单。",
														"duration" : 1000
												});
												break;
										case 0:
												UM.toast({
														"title" : "错误提示",
														"text" : "抱歉，查询出现异常。",
														"duration" : 1000
												});
												break;
										case 1:
												var parseData = JSON.parse(result.data);
												vue.procOrder = parseData.billcode;
												vue.material = parseData.material;
												vue.supplier = parseData.supplier;
												vue.logCo = parseData.transportcompany;
												vue.mineLocation = parseData.mine;
												break;
										default:
												break;
										}
								});
						},
						getPlateNum : function() {
								var soapXML = "<soapenv:Envelope xmlns:soapenv='http://schemas.xmlsoap.org/soap/envelope/' xmlns:ipur='http://webservice.app.itf.nc/IPurchaseAppWebService'><soapenv:Header/><soapenv:Body><ipur:getCarNo><cardId>" + this.cardNum + "</cardId></ipur:getCarNo></soapenv:Body></soapenv:Envelope>";
								roads.oldSkoolAjax(vue.baseUrl + "getCarNo", soapXML, function(data) {
										var result = JSON.parse($(data).find("return").html());
										switch(result.status) {
										case -1:
												UM.toast({
														"title" : "错误提示",
														"text" : "抱歉，查询不到车号!",
														"duration" : 1000
												});
												break;
										case 0:
												UM.toast({
														"title" : "错误提示",
														"text" : "抱歉，查询出现异常!",
														"duration" : 1000
												});
												break;
										case 1:
												vue.plateNum = result.data;
												vue.getGrossWeight();
												break;
										default:
												break;
										}
								});
						},
						getGrossWeight : function() {
								var carNo = this.plateNum;
								var soapXML = "<soapenv:Envelope xmlns:soapenv='http://schemas.xmlsoap.org/soap/envelope/' xmlns:ipur='http://webservice.app.itf.nc/IPurchaseAppWebService'><soapenv:Header/><soapenv:Body><ipur:getGrossWeight><carNo>" + carNo + "</carNo></ipur:getGrossWeight></soapenv:Body></soapenv:Envelope>";
								roads.oldSkoolAjax(vue.baseUrl + "getGrossWeight", soapXML, function(data) {
										var result = JSON.parse($(data).find("return").html());
										switch(result.status) {
										case -1:
												UM.toast({
														"title" : "错误提示",
														"text" : "抱歉，查询不到毛重!",
														"duration" : 1000
												});
												break;
										case 0:
												UM.toast({
														"title" : "错误提示",
														"text" : "抱歉，查询出现异常!",
														"duration" : 1000
												});
												break;
										case 1:
												vue.grossWeight = result.data;
												break;
										default:
												break;
										}
								});
						},
						goSelector : function(tag) {
								if (vue.plateNum != "") {
										roads.openWin(vue.dept, "orderSelector", vue.module_id + "/orderSelector/orderSelector.html", {
												"plate_num" : vue.plateNum,
												"module_id" : vue.module_id,
												"dept" : vue.dept,
												"tag" : tag
										});
								} else {
										UM.toast({
												"title" : "提示",
												"text" : "抱歉，车号不可为空!",
												"duration" : 1000
										});
										initNFC();
								}
						},
						backfrSelector : function(params) {
								vue.material = eval(params)["material"];
								vue.supplier = eval(params)["supplier"];
								vue.logCo = eval(params)["logCo"];
								vue.mineLocation = eval(params)["mineLocation"];
								switch(eval(params)["tag"]) {
								case (0):
										vue.procOrder = eval(params)["id"];
										if (!isEmpty(vue.procOrder))
												vue.allotAuto = "";
										break;
								case(1):
										vue.allotAuto = eval(params)["id"];
										if (!isEmpty(vue.allotAuto))
												vue.procOrder = "";
										break;
								}
						},
						confirmEdit : function() {
								var param = {
										"orderNumber" : vue.plateNum,
										"produceLine" : vue.productLine,
										"isShipmentQualified" : vue.packPass,
										"isSubsidies" : vue.subsidy,
										"buckleMiscellaneous" : vue.clasp,
										"sealNumber" : vue.sealNumber,
										"sealColor" : vue.sealColor,
										"supplierBanks" : vue.buyerNum
								};
								var soapXML = "<soapenv:Envelope xmlns:soapenv='http://schemas.xmlsoap.org/soap/envelope/' xmlns:ipur='http://webservice.app.itf.nc/IPurchaseAppWebService'><soapenv:Header/><soapenv:Body><ipur:updateBillLad><param>" + JSON.stringify(param) + "</param></ipur:updateBillLad></soapenv:Body></soapenv:Envelope>";
								roads.oldSkoolAjax(vue.baseUrl + "updateBillLad", soapXML, function(data) {
										var result = JSON.parse($(data).find("return").html());
										switch(result.status) {
										case -1:
												UM.toast({
														"title" : "错误提示",
														"text" : "抱歉，提交失败!",
														"duration" : 1000
												});
												break;
										case 0:
												UM.toast({
														"title" : "错误提示",
														"text" : "抱歉，提交出现异常!",
														"duration" : 1000
												});
												break;
										case 1:
												roads.closeWin();
												roads.execScript("menu", "vue.backfrModule", {
														"module_title" : vue.module_title
												});
												break;
										default:
												break;
										}
								});
						},

						/*public??*/
						onValueChange : function(picker, value) {
						},
						confirmChange : function() {
								this.productLine = this.$refs.picker.getValues()[0]['text'];
								this.popupVisible = false;
						},
						// 打开日期picker 视图
						open : function(picker) {
								this.$refs[picker].open();
						},
						handleDateConfirm : function(tag, value) {
								//console.log(tag);
								tag == "begin" ? this.beginDate = value.format("yyyy-MM-dd") : this.stopDate = value.format("yyyy-MM-dd");
						},
						ultraToggle : function(flag) {
								this.toggleStatus = flag;
								if (!flag && vue.cardNum == "")
										initNFC();
						},
						// 返回
						goback : function() {
								roads.closeWin();
						},
						langFunk : function(strTag) {
								var langCode = isEmpty(summer.getStorage('lang')) ? 1 : summer.getStorage('lang');
								return lang.getStr(langCode, strTag);
						}
				},
				mounted : function() {
						// 加载数据...
						this.$nextTick(function() {
								//监听返回按钮
								document.addEventListener("backbutton", this.goback, false);

								initNFC();
						})
				}
		})

		var winHeight = $(window).height();
		//获取当前页面高度
		$(window).resize(function() {
				var thisHeight = $(this).height();
				if (winHeight - thisHeight > 50) {
						//当软键盘弹出，在这里面操作
						vue.inputStatus = 1;
				} else {
						//当软键盘收起，在此处操作
						vue.inputStatus = 0;
				}
		});
}

function initNFC() {
		//获取NFC权限
		var params = ["android.permission.NFC"];
		summer.getPermission(params, function(args) {
				//开启NFC
				summer.callService("SummerNFC.openNFC", //原生服务（类名+方法名）
				{
						"callback" : "callbackNFC()",
						"title" : "请读卡"
				}, false//异步（true 同步）
				)
		}, function(args) {
				roads.speech("本设备不支持或未开启NFC功能");
		});
}

function callbackNFC(nfcEvent) {
		roads.speech("读卡成功");
		roads.vibrator(500);
		vue.cardNum = nfcEvent.cardinfo;
		vue.getPlateNum();
}