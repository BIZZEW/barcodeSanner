window.lang = (function(win, l) {
		l.langStr = [{
				/*login*/
				"redLionSaleMS" : "Sale Management System of REDLION CEMENT CO",
				"redLionProcureMS" : "Procure Management System of REDLION CEMENT CO",
				"usernameLabel" : "Username",
				"passwordLabel" : "Password",
				"remeberPDLabel" : "Remeber Password",
				"serverBtnText" : "Server lP",
				"loginBtnText" : "Login",
				"ipInputGuideText" : "Input the IP of your server:",
				"confirmBtntext" : "Confirm",
				"cancelBtntext" : "Cancel",
				/*menu*/
				"sale" : {
						"showName" : "Sale MS. of Redlion",
						"moduleList" : [{
								"module_title" : "Generate Order",
								"module_id" : "generateOrder",
						}, {
								"module_title" : "Logistics Query",
								"module_id" : "logQuery",
						}, {
								"module_title" : "Edit Batch",
								"module_id" : "editOrder",
						}, {
								"module_title" : "Seal Confirmation",
								"module_id" : "confirmOrder",
						}, {
								"module_title" : "Close Order",
								"module_id" : "deleteOrder",
						}]
				},
				"procure" : {
						"showName" : "Procure MS. of Redlion",
						"moduleList" : [{
								"module_title" : "Mgmt. of Proc.",
								"module_id" : "procMgmt",
						}, {
								"module_title" : "Meas. of Allocation",
								"module_id" : "allotMeas",
						}, {
								"module_title" : "Other Meas.",
								"module_id" : "otherMeas",
						}, {
								"module_title" : "Mine Confirmation",
								"module_id" : "mineConfirm",
						}]
				},
				"exitApp" : "Logout",
				"settings" : "Configurations",
				/*settings*/
				"changePassword" : "Change Password",
				"setProductLine" : "Set Productline",
				"setLang" : "Switch Language",
				"coNo" : "Serial number of Company",
				"scanDevice" : "Device of scanning",
				/*setLang*/
				"simpleChinese" : "简体中文",
				"english" : "ENGLISH",
				"operating" : "Wait a second..",
				/*generateOrder*/
				"plateNum" : "Plate No.",
				"cardNum" : "Card No.",
				"queryText" : "Query",
				"orderTagECommerce" : "E-Commerce",
				"orderTagSale" : "Sale",
				"goodName" : "Product Name",
				"amount" : "Amount",
				"packNum" : "Pack No.",
				"clientName" : "Customer Name",
				/*orderDetail*/
				"orderDetail" : "Detail of Order",
				"orderId" : "Order ID",
				"countDate" : "Date of statistic",
				"orderDate" : "Date of order",
				"driveway" : "Driveway",
				"shiftGroup" : "Shift No.",
				"batchNum" : "Batch No.",
				"clerk" : "Worker",
				"mallApp" : "Mall App.",
				"sum" : "Sum",
				"memo" : "Memo",
				"generate" : "Generate",
				/*generatedOrder*/
				"generatedOrder" : "Generated Order",
				"orderGenerated" : "Order Generated",
				/*batchList*/
				"batchList" : "Select Batch",
				"id" : "ID",
				"batchId" : "Batch ID",
				"batchAmount" : "Batch Amount",
				"batchRemain" : "Batch Remain",

				/*procMgmt*/
				"receiveQuery" : "Query Delivered",
				"procureReceive" : "Delivered of Proc.",
				/*procureReceive*/
				"submit" : "Submit",
				"cardNumGuide" : "Swipe your card",
				"bandText" : "Relate",
				"grossWeight" : "G. Weight",
				"splrNetWeight" : "N. Weight of Supplier",
				"procOrder" : "Proc. Order",
				"select" : "Select",
				"obtain" : "Obtain",
				"material" : "Material",
				"supplier" : "Supplier",
				"logCo" : "Logistics Co.",
				"mineLocation" : "Mine Location",
				"productLine" : "Product Line",
				"packPass" : "Pack Pass",
				"yes" : "Yes",
				"no" : "No",
				"subsidy" : "Subsidy",
				"clasp" : "Clasp",
				"buyerNum" : "Buyer No.",
				"sealNumber" : "Seal No.",
				"sealColor" : "Seal Color",
				/*receiveQuery*/
				"presentAuto" : "Autos",
				"evenTime" : "Event Time",
				"to" : "to",
				"checkMaterial" : "Check Material",
				"reset" : "Reset",
				"allotAuto" : "Allot Auto",
				"checkTime" : "Check Time",
				"date" : "Date",
				"netWeight" : "N. Weight",
				"tareWeight" : "T. Weight",
				"carAmount" : "Auto Amount",
				"searchWord" : "Search Terms",
				"pluralGrossWeight" : "Plural G. Weight",
		}, {
				/*login*/
				"redLionScan" : "红狮扫单管理系统",
				"redLionSaleMS" : "红狮销售管理系统",
				"redLionProcureMS" : "红狮采购管理系统",
				"usernameLabel" : "用\xa0户\xa0名",
				"passwordLabel" : "密\xa0\xa0\xa0\xa0\xa0\xa0码",
				"remeberPDLabel" : "记住密码",
				"serverBtnText" : "服\xa0务\xa0器",
				"loginBtnText" : "登\xa0\xa0\xa0录",
				"ipInputGuideText" : "请输入服务器地址:",
				"confirmBtntext" : "确\xa0\xa0\xa0定",
				"cancelBtntext" : "取\xa0\xa0\xa0消",
				/*menu*/
				"scanner" : {
						"showName" : "红狮销售管理系统",
						"moduleList" : [{
								"module_title" : "采购扫单",
								"module_id" : "procureScanner",
						}]
				},
				"sale" : {
						"showName" : "红狮销售管理系统",
						"moduleList" : [{
								"module_title" : "生成订单",
								"module_id" : "generateOrder",
						}, {
								"module_title" : "发货查询",
								"module_id" : "logQuery",
						}, {
								"module_title" : "修改批次",
								"module_id" : "editOrder",
						},
						/*{
						 "module_title" : "铅封确认",
						 "module_id" : "confirmOrder",
						 }, */
						{
								"module_title" : "关闭订单",
								"module_id" : "deleteOrder",
						}]
				},
				"procure" : {
						"showName" : "红狮采购管理系统",
						"moduleList" : [{
								"module_title" : "采购管理",
								"module_id" : "procMgmt",
						}, {
								"module_title" : "调拨计量",
								"module_id" : "allotMeas",
						}, {
								"module_title" : "其他计量",
								"module_id" : "otherMeas",
						}, {
								"module_title" : "矿山确认",
								"module_id" : "mineConfirm",
						}]
				},
				"exitApp" : "退出系统",
				"settings" : "系统设置",
				/*settings*/
				"changePassword" : "修改密码",
				"setProductLine" : "线别设置",
				"setLang" : "语言设置",
				"coNo" : "公司编号",
				"scanDevice" : "读卡硬件",
				/*setLang*/
				"simpleChinese" : "简体中文",
				"english" : "ENGLISH",
				"operating" : "请稍后..",
				/*generateOrder*/
				"orderList" : "订单列表",
				"plateNum" : "车\xa0\xa0\xa0\xa0\xa0\xa0号",
				"cardNum" : "卡\xa0\xa0\xa0\xa0\xa0\xa0号",
				"queryText" : "查\xa0\xa0\xa0\xa0\xa0\xa0询",
				"orderTagECommerce" : "电\xa0\xa0\xa0\xa0\xa0\xa0商",
				"orderTagSale" : "销\xa0\xa0\xa0\xa0\xa0\xa0售",
				"goodName" : "商品名称",
				"amount" : "数\xa0\xa0\xa0\xa0\xa0\xa0量",
				"packNum" : "包装编号",
				"clientName" : "客户名称",
				/*orderDetail*/
				"orderDetail" : "订单详情",
				"orderId" : "订单编号",
				"countDate" : "统计日期",
				"orderDate" : "下单日期",
				"driveway" : "车\xa0\xa0\xa0\xa0\xa0\xa0道",
				"shiftGroup" : "班\xa0\xa0\xa0\xa0\xa0\xa0组",
				"batchNum" : "批\xa0\xa0\xa0\xa0\xa0\xa0号",
				"clerk" : "业\xa0务\xa0员",
				"mallApp" : "商城申请单",
				"sum" : "金\xa0\xa0\xa0\xa0\xa0\xa0额",
				"memo" : "备\xa0\xa0\xa0\xa0\xa0\xa0注",
				"generate" : "生\xa0\xa0\xa0\xa0\xa0\xa0成",
				/*generatedOrder*/
				"generatedOrder" : "已生成订单详情",
				"orderGenerated" : "订单已生成",
				/*batchList*/
				"batchList" : "批次选择",
				"id" : "序\xa0\xa0\xa0\xa0\xa0\xa0号",
				"batchId" : "批次编码",
				"batchAmount" : "批次数量",
				"batchRemain" : "批次余量",
				/*editOrder*/
				"edit" : "修\xa0\xa0\xa0\xa0\xa0\xa0改",
				"orderEdited" : "订单已修改",
				/**deleteOrder*/
				"delete" : "删\xa0\xa0\xa0\xa0\xa0\xa0除",

				/*logQuery*/
				"sendQuery" : "发货查询",
				"bulkCount" : "散装统计",
				"countTime" : "统计时间",

				/*procMgmt*/
				"receiveQuery" : "收货查询",
				"procureReceive" : "采购收货",
				/*procureReceive*/
				"submit" : "提\xa0\xa0\xa0\xa0\xa0\xa0交",
				"cardNumGuide" : "刷卡获取车号",
				"bandText" : "关\xa0\xa0\xa0\xa0\xa0\xa0联",
				"grossWeight" : "毛重(吨)",
				"splrNetWeight" : "供方净重",
				"procOrder" : "采购订单",
				"select" : "选\xa0\xa0\xa0\xa0\xa0\xa0择",
				"obtain" : "获\xa0\xa0\xa0\xa0\xa0\xa0取",
				"material" : "物\xa0\xa0\xa0\xa0\xa0\xa0料",
				"supplier" : "供\xa0应\xa0商",
				"logCo" : "运输公司",
				"mineLocation" : "采购矿点",
				"productLine" : "生\xa0产\xa0线",
				"packPass" : "装运合格",
				"yes" : "是",
				"no" : "否",
				"subsidy" : "补\xa0\xa0\xa0\xa0\xa0\xa0贴",
				"clasp" : "扣杂(吨)",
				"buyerNum" : "购方票号",
				"sealNumber" : "铅封号码",
				"sealColor" : "铅封颜色",
				/*receiveQuery*/
				"presentAuto" : "在场车辆",
				"evenTime" : "事件时间",
				"to" : "至",
				"checkMaterial" : "查看物料",
				"reset" : "重\xa0\xa0\xa0\xa0\xa0\xa0置",
				"allotAuto" : "派\xa0车\xa0单",
				"checkTime" : "验收时间",
				"date" : "日\xa0\xa0\xa0\xa0\xa0\xa0期",
				"netWeight" : "净重(吨)",
				"tareWeight" : "皮重(吨)",
				"carAmount" : "车\xa0\xa0\xa0\xa0\xa0\xa0数",
				"searchWord" : "搜\xa0索\xa0词",
				"pluralGrossWeight" : "复\xa0毛\xa0重",
		}];

		l.getStr = function(langCode, strTag) {
				return l.langStr[langCode][strTag];
		};

		l.getStrBilayer = function(langCode, strTag, secondStrTag) {
				return l.langStr[langCode][strTag][secondStrTag];
		};

		l.getStrTritlayer = function(langCode, strTag, secondStrTag, thirdStrTag) {
				return l.langStr[langCode][strTag][secondStrTag][thirdStrTag];
		};

		return l;
})(window, window.lang || {})