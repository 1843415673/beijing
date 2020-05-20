//抖音添加统计
$("#8").click(function(){
	if($("#9").css("display") == "none"){
		$("#9").css("display","block");
	}else{
		$("#9").css("display","none");
	}
});
$("#closecardbtn").click(function(){
	if($('.modal-backdrop')){
		console.log("判断是否有多余的遮罩层，有则删除")
		$('#myModal').modal('hide')
	}else{
		console.log("没有多余的遮罩层")
	}
	$('#myModal').modal('show')
})

$("#10").click(function(){
	if($("#11").css("display") == "none"){
		$("#11").css("display","block");
	}else{
		$("#11").css("display","none");
	}
});
// 是否显示身份证好输入框 addresseePhone
$("#linkPhone").on("input",function (e) { 
var linkPhoneValue = $("#linkPhone").val()
	console.log(linkPhoneValue)
	$("#addresseePhone").attr("value",linkPhoneValue)
	if(linkPhoneValue = ""){
		$("#cardShow").addClass("cardShow")
	}else{
		$("#cardShow").removeClass("cardShow")
	}
	
 })

// var serveUrl = "http://chinamoble.zhisuoyi.net:8001"
var serveUrl = "https://chinamoble.zhisuoyi.net:8665"
$.ajax({
	url: serveUrl + "/BeijingOrder/selectBJPhoneNum",
	type: "post",
	data: {
		page: 1
	},
	dataType: "json",
	success: function(result) {
		var list = result.data.num_info.numList; //返回的数据
		var server = document.getElementById("mobody"); //server为select定义的id
		//console.log($("#phoneNum").val());
		for (var p in list) {
			//console.log(list[p].jXHRmSerialAttributeList[0]);
			var a = document.createElement("a"); // 创建添加option属性
			var br = document.createElement("br");
			a.setAttribute("class", "phoneNums"); // 给option的value添加值
			a.setAttribute("name", "phoneNums"); // 给option的value添加值
			a.setAttribute("data", list[p].jXHRmSerialAttributeList[0].numLevel);
			a.innerText = list[p].phoneNum; // 打印option对应的纯文本 
			server.before(a); //给select添加option子标签
			server.before(br);
			//form.render("select"); // 刷性select，显示出数据
		}
	}
});
var page = 2;
var iRet = 1; //是否提交的标识
console.log($("#well")[0]);
$("#page").click(function() {
	$(".phoneNums").remove();
	$("br").remove();
	console.log($("#well")[0]);
	console.log("page------------")
	//$("#well").empty();
	//console.log($("#well")[0]);
	$.ajax({
		url: serveUrl + "/BeijingOrder/selectBJPhoneNum",
		type: "post",
		data: {
			page: page
		},
		dataType: "json",
		success: function(result) {
			var list = result.data.num_info.numList; //返回的数据
			var server = document.getElementById("page"); //server为select定义的id
			//console.log($("#phoneNum").val());
			if (server == null) {
				console.log("page+++++++++++++")
				var a = document.createElement("a"); // 创建添加option属性
				//a.setAttribute("href", "#"); // 给option的value添加值
				a.setAttribute("id", "page"); // 给option的value添加值
				a.innerText = "换一批"; // 打印option对应的纯文本 
				$("#well")[0].append(a); //给select添加option子标签
			}
			server = document.getElementById("mobody");
			console.log(server);
			console.log($("#well")[0]);
			for (var p in list) {
				var a = document.createElement("a"); // 创建添加option属性
				var br = document.createElement("br");
				a.setAttribute("class", "phoneNums"); // 给option的value添加值
				a.setAttribute("name", "phoneNums"); // 给option的value添加值
				a.setAttribute("data", list[p].jXHRmSerialAttributeList[0].numLevel);
				a.innerText = list[p].phoneNum; // 打印option对应的纯文本 
				server.before(a); //给select添加option子标签
				server.before(br);
			}
		}
	});
	page++
	console.log("page：" + page);
});
var numLevel = "";
$(document).on("click", "a[name='phoneNums']", function(event) {
	var value = $(this)[0].innerText;
	numLevel = $(this)[0].getAttribute("data");
	console.log(numLevel);
	console.log(value);
	$('#myModal').modal('hide')//隐藏模态框
	$("#phoneNum").val(value);
	$('.modal-backdrop').remove();//去掉遮罩层
	// $("#closecardbtn").click()	
});
var phoneNum = $("#phoneNum");
var custName = $("#custName");
var idCardNumber = $("#idCardNumber");
var linkPhone = $("#linkPhone");
var addresseeAddr = $("#addresseeAddr");
var addresseePhone = $("#addresseePhone");
var idCardAddress = $("#idCardAddress");
var taocanid = $("#taocanid");
$("#order").submit(function() {
	
	console.log($("#phoneNum").val());
	console.log($("#custName").val());
	console.log($("#idCardNumber").val());
	console.log($("#linkPhone").val());
	console.log($("#addresseeAddr").val().replace("/", "").replace("/", ""));
	console.log($("#addresseePhone").val());
	console.log($("#idCardAddress").val());
	console.log($("#taocanid").val());
	if ($("#phoneNum").val() == '' || $("#custName").val() == '' || $("#idCardNumber").val() == '' ||
		$("#linkPhone").val() == '' || $("#addresseeAddr").val() == '' || $("#addresseePhone").val() == '' ||
		$("#idCardAddress").val() == '') {
		layer.msg("请填写完信息后再提交");
		return false;
	}
	if (iRet == 0) {
		layer.msg("请上传身份验证图片进行验证");
		return false;
	}
	var datas = {
		phonenum: phoneNum.val(),
		custname: custName.val(),
		idcardnumber: idCardNumber.val(),
		linkphone: linkPhone.val(),
		addresseeaddr: addresseeAddr.val().replace("/", "").replace("/", ""),
		addresseephone: addresseePhone.val(),
		idcardaddress: idCardAddress.val(),
		taocanid: taocanid.val(),
		numlevel: numLevel,
		vdef1:"zhsuya100"
	};
	var load = layer.load();
	$.ajax({
		url: serveUrl + "/BeijingOrder/insert",
		// url: "http://192.168.1.137:8001/BeijingOrder/insert",
		type: "post",
		contentType: 'application/json',
		cache: false, // 不缓存
		data: JSON.stringify(datas),
		dataType: "json",
		success: function(result) {
			console.log(datas)
			console.log(result);
			if (result.deal_result == "00") {
				//添加抖音统计
			
				layer.alert('提交成功请注意查收快递', {
					icon: 1
				}, function(index) {
					location.replace('order.html');
					layer.close(index);
				});
			}else if(result.deal_result == "E900003"){
				layer.alert('用户实名校验验签失败！', {
					icon: 2
				}, function(index) {
					layer.close(index);
				});
			} else if(result.deal_result == "E900004"){
				layer.alert('因您的年龄未满16周岁或高于120周岁，请由监护人前往营业厅办理入网业务！', {
					icon: 2
				}, function(index) {
					layer.close(index);
				});
			}else if(result.deal_result == "E900005"){
				layer.alert('灰名单校验发生异常，请重试！', {
					icon: 2
				}, function(index) {
					layer.close(index);
				});
			}else if(result.deal_result == "E900006"){
				layer.alert('灰名单校验失败！为了保护客户的利益，此身份证号码已纳入客户信息重点保障白名单，请到我公司营业厅办理实名登记或入网手续。', {
					icon: 2
				}, function(index) {
					layer.close(index);
				});
			}else if(result.deal_result == "E900007"){
				layer.alert('灰名单校验失败！', {
					icon: 2
				}, function(index) {
					layer.close(index);
				});
			}else if(result.deal_result == "E900008"){
				layer.alert('国政通校验发生异常，请重试！', {
					icon: 2
				}, function(index) {
					layer.close(index);
				});
			}else if(result.deal_result == "E900009"){
				layer.alert('国政通校验失败！', {
					icon: 2
				}, function(index) {
					layer.close(index);
				});
			}else if(result.deal_result == "E900010"){
				layer.alert(' 用户合法性校验发生异常，请重试！', {
					icon: 2
				}, function(index) {
					layer.close(index);
				});
			}else if(result.deal_result == "E900011"){
				layer.alert('验证用户合法性不通过', {
					icon: 2
				}, function(index) {
					layer.close(index);
				});
			}else if(result.deal_result == "E900012"){
				layer.alert('证卡识别流程,调用EAI正面证卡文字识别异常', {
					icon: 2
				}, function(index) {
					layer.close(index);
				});
			}else if(result.deal_result == "E900013"){
				layer.alert('证卡识别流程,调用电商加密机正面证卡文字识别网络异常', {
					icon: 2
				}, function(index) {
					layer.close(index);
				});
			}else if(result.deal_result == "E900014"){
				layer.alert('证卡识别流程 正面证卡文字识别调用加密机返回为空', {
					icon: 2
				}, function(index) {
					layer.close(index);
				});
			}else if(result.deal_result == "E900015"){
				layer.alert('正面证卡文字识别调用EAI和调用在线方式开关都没开！ ', {
					icon: 2
				}, function(index) {
					layer.close(index);
				});
			}else if(result.deal_result == "E900016"){
				layer.alert('在线系统正常，正面证卡文字识别接口图片校验不通过！', {
					icon: 2
				}, function(index) {
					layer.close(index);
				});
			}else if(result.deal_result == "E900017"){
				layer.alert('在线系统异常，正面证卡文字识别接口操作失败！', {
					icon: 2
				}, function(index) {
					layer.close(index);
				});
			}else if(result.deal_result == "E900018"){
				layer.alert('在线系统异常，正面证卡文字识别接口其他异常！', {
					icon: 2
				}, function(index) {
					layer.close(index);
				});
			}else if(result.deal_result == "E900019"){
				layer.alert('正面证卡文字识别接口流程程序执行异常', {
					icon: 2
				}, function(index) {
					layer.close(index);
				});
			}else if(result.deal_result == "E900020"){
				layer.alert('证卡识别流程,调用EAI反面证卡文字识别异常', {
					icon: 2
				}, function(index) {
					layer.close(index);
				});
			}else if(result.deal_result == "E900021"){
				layer.alert('证卡识别流程,调用电商加密机反面证卡文字识别网络异常', {
					icon: 2
				}, function(index) {
					layer.close(index);
				});
			}else if(result.deal_result == "E900022"){
				layer.alert('证卡识别流程 反面证卡文字识别调用加密机返回为空', {
					icon: 2
				}, function(index) {
					layer.close(index);
				});
			}else if(result.deal_result == "E900023"){
				layer.alert('反面证卡文字识别调用EAI和调用在线方式开关都没开！', {
					icon: 2
				}, function(index) {
					layer.close(index);
				});
			}else if(result.deal_result == "E900024"){
				layer.alert('在线系统正常，反面证卡文字识别接口图片校验不通过！', {
					icon: 2
				}, function(index) {
					layer.close(index);
				});
			}else if(result.deal_result == "E900025"){
				layer.alert('在线系统异常，反面证卡文字识别接口操作失败！', {
					icon: 2
				}, function(index) {
					layer.close(index);
				});
			}else {
				layer.alert('订单提交失败', {
					icon: 2
				}, function(index) {
					layer.close(index);
				});
					layer.close(load);
			}
			
		}
	
	});
});


$("#input-id").click(function() {
	if ($("#phoneNum").val() == '' || $("#custName").val() == '' || $("#idCardNumber").val() == '') {
		layer.msg("请先填写完信息再上传");
		return false;
	}
	//initFileInput("input-id");

});

initFileInput("input-id");

function initFileInput(ctrlName) {
	var control = $('#' + ctrlName);
	control.fileinput({
			language: 'zh', //设置语言
			uploadUrl: serveUrl + "/BeijingOrder/selectBJNameNum", //上传的地址
			allowedFileExtensions: ['jpg', 'png', 'jpeg'], //接收的文件后缀
			uploadExtraData: function() {
				return {
					"sourceType": 'renlian',
					"billId": phoneNum,
					"paperName": custName,
					"paperId": idCardNumber
				}
			},
			uploadAsync: false, //默认异步上传
			showUpload: true, //是否显示上传按钮
			showRemove: true, //显示移除按钮
			showPreview: true, //是否显示预览
			resizeImage: true,
			maxImageWidth: 20,
			maxImageHeight: 20,
			resizeIfSizeMoreThan:200,
			resizePreference: 'width',
			showCaption: false, //是否显示标题
			browseClass: "btn btn-primary", //按钮样式
			layoutTemplates: {
				actionDelete: '', //去除上传预览的缩略图中的删除图标
				actionUpload: '' //, //去除上传预览缩略图中的上传图片；
				//actionZoom: '' //去除上传预览缩略图中的查看详情预览的缩略图标。
			},
			dropZoneEnabled: false, //是否显示拖拽区域
			dropZoneTitle: "上传图片640 * 350分辨率效果更好",
			previewSettings: {
				image: {
					width: "100px",
					height: "100px"
				},
			},

			//minImageWidth: 50, //图片的最小宽度
			//minImageHeight: 50,//图片的最小高度
			//maxImageWidth: 1000,//图片的最大宽度
			//maxImageHeight: 1000,//图片的最大高度
			maxFileSize: 0, //单位为kb，如果为0表示不限制文件大小
			minFileCount: 3,
			maxFileCount: 3, //表示允许同时上传的最大文件个数
			enctype: 'multipart/form-data',
			validateInitialCount: true,
			previewFileIcon: "<i class='glyphicon glyphicon-king'></i>",
			msgFilesTooMany: "选择上传的文件数量({n}) 超过允许的最大数值{m}！",

		})
		/* .on('filepreupload', function(event, data, previewId, index) { //上传中
			var form = data.form,
				files = data.files,
				extra = data.extra,
				response = data.response,
				reader = data.reader;
			console.log('文件正在上传');
		}) */
		/* .on("fileuploaded", function(event, data, previewId, index) { //一个文件上传成功
			console.log(data);
			console.log('文件上传成功！' + data.id);
		}) */

		.on("filebatchselected", function(event, files) {
			console.log(event.target.files[0].name);
			var img = new Image(event.target.files[0].name);
			//img.set
			pressImg(event);
			console.log(event.target.files[0].size);
			phoneNum = $("#phoneNum").val();
			custName = $("#custName").val();
			idCardNumber = $("#idCardNumber").val();
		})
		.on("filebatchuploadsuccess", function(event, data) {
			console.log(data.response);
			if (data.response.data.deal_result == "00") {
				iRet = 1;
				layer.alert(data.response.data.deal_msg, {
					icon: 1
				}, function(index) {
					layer.close(index);
				});
			} else {
				layer.alert(data.response.data.deal_msg, {
					icon: 2
				}, function(index) {
					location.replace('order.html');
					layer.close(index);
				});
			}
		});
}

/**
 * canvas压缩图片
 * @param {参数obj} param 
 * @param {文件二进制流} param.file 必传
 * @param {目标压缩大小} param.targetSize 不传初始赋值-1
 * @param {输出图片宽度} param.width 不传初始赋值-1，等比缩放不用传高度
 * @param {输出图片名称} param.fileName 不传初始赋值image
 * @param {压缩图片程度} param.quality 不传初始赋值0.92。值范围0~1
 * @param {回调函数} param.succ 必传
 */
function pressImg(param) {
	//如果没有回调函数就不执行
	if (param && param.succ) {
		//如果file没定义返回null
		if (param.file == undefined) return param.succ(null);
		//给参数附初始值
		param.targetSize = param.hasOwnProperty("targetSize") ? param.targetSize : -1;
		param.width = param.hasOwnProperty("width") ? param.width : -1;
		param.fileName = param.hasOwnProperty("fileName") ? param.fileName : "image";
		param.quality = param.hasOwnProperty("quality") ? param.quality : 0.92;
		var _this = this;
		// 得到文件类型
		var fileType = param.file.type;
		// console.log(fileType) //image/jpeg
		if (fileType.indexOf("image") == -1) {
			console.log('请选择图片文件^_^');
			return param.succ(null);
		}
		//如果当前size比目标size小，直接输出
		var size = param.file.size;
		if (param.targetSize > size) {
			return param.succ(param.file);
		}
		// 读取file文件,得到的结果为base64位
		changeFileToBaseURL(param.file, function(base64) {
			if (base64) {
				var image = new Image();
				image.src = base64;
				image.onload = function() {
					// 获得长宽比例
					var scale = this.width / this.height;
					// console.log(scale);
					//创建一个canvas
					var canvas = document.createElement('canvas');
					//获取上下文
					var context = canvas.getContext('2d');
					//获取压缩后的图片宽度,如果width为-1，默认原图宽度
					canvas.width = param.width == -1 ? this.width : param.width;
					//获取压缩后的图片高度,如果width为-1，默认原图高度
					canvas.height = param.width == -1 ? this.height : parseInt(param.width / scale);
					//把图片绘制到canvas上面
					context.drawImage(image, 0, 0, canvas.width, canvas.height);
					//压缩图片，获取到新的base64Url
					var newImageData = canvas.toDataURL(fileType, param.quality);
					//将base64转化成文件流
					var resultFile = dataURLtoFile(newImageData, param.fileName);
					//判断如果targetSize有限制且压缩后的图片大小比目标大小大，就弹出错误
					if (param.targetSize != -1 && param.targetSize < resultFile.size) {
						console.log("图片上传尺寸太大，请重新上传^_^");
						param.succ(null);
					} else {
						//返回文件流
						param.succ(resultFile);
					}
				}
			}
		});
	}
}
