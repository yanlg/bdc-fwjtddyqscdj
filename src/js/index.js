import '@/css/reset.css';
import '@/css/select.css';
import '@/css/comman.scss';
import Vue from '@/js/vue.min.js'
// import util from '@/js/util.js'
import $ from '@/js/jquery-3.0.0.min.js'
import _ from "lodash";
import '@/js/reset.js'
import '@/js/util.js'
import IosSelect from '@/js/select.js'
import  '@/js/iscroll.js'

/**html js code*/
new Vue({
    el: "#app",

    data: {
        // 王忠贤、廖华敏	420600197610183012、420606197405228523
        //黄兴权	420619196909098192
        // 熊赟芃	420606199306021016
        userName:localStorage.getItem("userName") ,
        idCard:localStorage.getItem("certNo"),
        szqxdm:localStorage.getItem("szqxdm"),
		tabFlag:0,
        loading:false,//是否显示加载状态
        showUserInfo:false,
        isAgree:true,
        addCount:0,//判断用户点击添加共有人的次数
        //权利人信息
        qlrInfo: {				// 权利人信息
            qlrmc:localStorage.getItem("userName") || "",			// 权利人名称
            xb: "",				// 性别
            zjhm:localStorage.getItem("certNo") || "",	// 证件号码
            dh: "",		// 电话
            gyfs: "",			// 共有方式，0:单独所有 1:共同共有 2:按份共有 3:其它共有
            gyfs1: "",			// 转译后的汉字
            dz: "",
            sex:'',// 通讯地址
            qlrInfo:"",
            ybdcqzh:""
            // isReadOnly:false
        },
        //共有权利人信息
        qlrList:[				// 共有权利人列表(参数说明同上)

            // {
            //     qlrmc: "",
            //     xb: "",
            //     zjhm: "",
            //     dh: "",
            //     gyfs: "",
            //     gyfs1: "",			// 转译后的汉字
            //     dz: "",
            //     sex:'',
            //     isFace:0,//0代表未扫脸1代表已扫脸通过（此字段为前端增加便于处理交互）
            //     isReadOnly:false//是否只读，已扫脸成功则设置成只读（此字段为前端增加便于处理交互）
            // },
        ],
        //义务人
        qlrxx:{

        },
        //不动产信息
        bdcxx:{},
        //合同信息
        htxx:{},
        isSubmit:0,//是否输入完成标识
        isFastClick:false,
        valueReadonly: '请选择出生日期',
        dydata:{
            bdbzqse:"",
            zwlxqxs:"",
            zwlxqxz:"",
            dywmj:"",
            dyfs:1
        }

    },
    watch: {

    },
    computed: {},
    filters: {
        //转换证件类型
        /**身份证	1港澳台身份证	2护照	3户口簿	4军官证（士兵证）	5组织机构代码	6营业执照
        	7警官证	8其它	99通行证	9事业单位法人证书	10社会团体法人登记证书	11统一社会信用代码	12*/
        transCardType:function(val){
            var type;
            val = String(val);
            switch(val){
                case '1':
                    type = '身份证';
                    break;
                case '2':
                    type = '港澳台身份证';
                    break;
                case '3':
                    type = '护照';
                    break;
                case '4':
                    type = '户口簿';
                    break;
                case '5':
                    type = '军官证（士兵证）';
                    break;
                case '6':
                    type = '组织机构代码';
                    break;
                case '7':
                    type = '营业执照';
                    break;
                case '8':
                    type = '警官证';
                    break;
                case '9':
                    type = '通行证';
                    break;
                case '10':
                    type = '事业单位法人证书';
                    break;
                case '11':
                    type = '社会团体法人登记证书';
                    break;
                case '12':
                    type = '统一社会信用代码';
                    break;
                case '99':
                    type = '其它';
                    break;
            }
            return type;

        }
    },
    created: function () {
        // eruda.init()
        //隐藏右上角菜单栏
        // AlipayJSBridge.call('hideOptionMenu');
    },
    mounted: function (){
        // this.checkFaceResult();
        // console.log(localStorage.getItem("xxx"))
        var self = this
        var faceIndex = self.getUrlParams("faceIndex")
        // alert(faceIndex)
            if(faceIndex == -1){
                // self.getObliGator()
                console.log('faceIndex:'+faceIndex)
                // self.getHtInfo()
            }else{
                self.secondOpenPage()
                // self.getObliGator()
                // self.getHtInfo()
            }
    },
    methods: {
        changeTab(item){
			var self= this
			/*if(item == self.tabFlag){
				return;
			}else {
                self.tabFlag = item
			}*/
			if(item == self.dataFlag) return;
			else self.tabFlag = item;
        },
        /**首次添加共有人*/
        showAddContain(){
            var self = this;
            localStorage.setItem("count",JSON.stringify(self.addCount))
            self.qlrList.push({
                qlrmc: "",
                xb: "",
                sex:'',
                zjhm: "",
                dh: "",
                gyfs: "1",			// 共有方式，0:单独所有 1:共同共有 2:按份共有 3:其它共有
                gyfs1: "共同共有",
                dz: "",
                ybdcqzh:self.qlrInfo.ybdcqzh,
                isFace:0,
                isReadOnly:false
            })
        },
        /**
         * 添加共有权利人
         * */
        addPublicUser(){
            var self = this
            var list = self.qlrList
            var count = self.addCount
            console.log(count)
                if(list[count].qlrmc == "" || list[count].zjhm == "" || list[count].dh == "" || list[count].dz == "" || list[count].gyfs1 == "" || list[count].sex == "" || list[count].ybdcqzh == ""){
                    alert("请完成当前共有义务人信息填写");
                    return false;
                }
                else if(list[count].isFace == 0){
                    alert("请完成当前共有义务人扫脸认证")
                    return false;
                }
                // if(list[i].qlrmc != "" || list[i].zjhm != "" || list[i].dh != "" || list[i].dz != "" || list[i].gyfs != ""){
                else{
                    self.addCount+=1;
                    localStorage.setItem("count",JSON.stringify(count))
                    self.qlrList.push({
                        qlrmc: "",
                        xb: "",
                        sex:'',
                        zjhm: "",
                        dh: "",
                        gyfs: "",
                        gyfs1: "",
                        dz: "",
                        ybdcqzh:self.qlrInfo.ybdcqzh,
                        isFace:0,
                        isReadOnly:false
                    })
                }
        },
        showDetail(){
            this.showUserInfo = true
        },
        changeSelectType(){
            this.isAgree = !this.isAgree;
            // console.log(str)
        },
        /**
         * 支付宝刷脸认证成功后调用：
         * https://xysb.anthb.cn:1502/bdcydysq-server/api/aliAuth/zhimaResult
         * */
        checkFaceResult(){
            var self = this;
            var params = self.getUrlParams("getUrlParams")
            var sign = self.getUrlParams("sign")
            $.ajax({
                type:"GET",
                url:"https://xysb.anthb.cn:1502/fwjtddyqscdj-server/api/aliAuth/zhima",
                data:{
                    params:params,
                    sign:sign
                },
                contentType : "application/json",
                headers: {
                    // Authorization: "Bearer "+localStorage.getItem('zyyy_id_token')
                },
                dataType : "json",
                success:function (res) {
                    if(res.code == 1){
                        alert(res.msg)
                        console.log("扫脸认证成功")
                    }
                    else if(res.code == -1){
                        alert(res.msg)
                        window.location.href = './agreement.html'
                        console.warn("扫脸认证失败,请重试")
                    }
                },
                error:function (jqXHR,textStatus,err) {
                    console.log(err)
                }
            })
        },
        /**
         * 获取url参数字段
         * */
        getUrlParams(name){
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return decodeURI(r[2]);
            return null;
        },
        /***
         * 查询义务人和不动产信息
         * https://xysb.anthb.cn:1502/fwjtddyqscdj-server/api/fwjtddyqscdj/queryInfo
         * */
        getObliGator(step){
            var self = this
            // var userName = localStorage.getItem("userName")
            // var certNo = localStorage.getItem("certNo")
            self.loading = true
            // self.szqxdm = '420683'
            $.ajax({
                type:"GET",
                url:"https://xysb.anthb.cn:1502/fwjtddyqscdj-server/api/fwjtddyqscdj/queryInfo",
                // url:"http://localhost:8082/api/fwjtddyqscdj/queryInfo",
                data:{

                    ybdcqzh:self.qlrInfo.ybdcqzh,
                    szqxdm:self.szqxdm

                },
                contentType : "application/json",
                headers: {
                    // Authorization: "Bearer "+localStorage.getItem('zyyy_id_token')
                },
                dataType : "json",
                success:function (res) {
                    if(res.code == 1){
                        // alert(res.msg)
                        self.zl = res.data.zl
                        self.bdcxx = res.data.bdcdata
                        self.bdcxx.szqxdm = self.szqxdm
                        self.qlrxx = res.data.qlrdata[0]
                        self.loading = false
                        self.isSubmit = step
                        self.tabFlag = step
                        setTimeout(function () {
                            self.isFastClick = false;
                        },2000)
                    }
                    else if(res.code == -1){
                        self.loading = false
                        alert(res.msg)
                        setTimeout(function () {
                            self.isFastClick = false;
                        },2000)
                        return false;
                    }
                },
                error:function (jqXHR,textStatus,err) {
                    console.log(err)
                }
            })

        },
        /**
         * 查询合同信息
         * https://xysb.anthb.cn:1502/bdcydysq-server/api/bdcydj/queryHtInfo
         * */
        getHtInfo(hth){
            var self = this
            // var hth = "XF201002825"
            // var hth = self.ywrxx.JYBAHTH
            self.loading = true
            $.ajax({
                type:"GET",
                url:"https://xysb.anthb.cn:1502/fwjtddyqscdj-server/api/fwjtddyqscdj/queryHtInfo",
                data:{
                    hth:hth,
                    // hth:"42060219901120002X"

                },
                contentType : "application/json",
                headers: {
                    // Authorization: "Bearer "+localStorage.getItem('zyyy_id_token')
                },
                dataType : "json",
                success:function (res) {
                    self.loading = false;
                    if(res.code == 1){
                        // alert(res.msg)
                        self.htxx = res.data[0];
                    }else{
                        console.log("暂无合同信息")
                    }
                },
                error:function (jqXHR,textStatus,err) {
                    console.log(err)
                }
            })
        },
        /**
         * 权利人信息提交申请：
         https://xysb.anthb.cn:1502/bdcydysq-server/api/bdcydj/apply/submit
         请求方式：post
         请求参数：
         {
           "applyInfo": {			// 申请人信息
             "sqrXm": "王佳",			// 申请人姓名
             "sqrSfzhm": "42060619870428401X"	// 申请人身份证号
           },
           "qlrInfo": {				// 权利人信息
             "qlrmc": "万国军",			// 权利人名称
             "xb": "1",				// 性别
             "zjhm": "420625197506021512",	// 证件号码
             "dh": "15618994567",		// 电话
             "gyfs": "0",			// 共有方式，0:单独所有 1:共同共有 2:按份共有 3:其它共有
             "dz": "万国华的地址"		// 通讯地址
           },
           "qlrList": [				// 共有权利人列表(参数说明同上)
             {
               "qlrmc": "李从萍",
               "xb": "1",
               "zjhm": "420625197002252026",
               "dh": "15618994568",
               "gyfs": "0",
               "dz": "李从华的地址"
             }
           ]
         }
         * */
        postQlrxx(){
            var self = this

            // self.dydata.bdbzqse = 20;
            // self.dydata.zwlxqxs = "2019-06-09"
            // self.dydata.zwlxqxz = "2019-07-03"
            // self.dydata.dywmj = "102.03"
            if(self.dydata.bdbzqse==''){
                alert('被担保债券数额不能为空');
                return ;
            }

            if(self.dydata.zwlxqxs=='' || self.dydata.zwlxqxz == ''){
                alert('债务履行起止时间不能为空');
                return ;
            }

            if(self.dydata.dywmj == ''){
                alert('抵押物面积不能为空');
                return
            }

            for (var i=0;i<self.qlrList.length;i++) {
                self.qlrList[i].ybdcqzh = self.qlrInfo.ybdcqzh
            }

            self.loading = true
            debugger
            self.qlrInfo.slid = self.qlrxx.SLID
            self.dydata.dyfs = self.bdcxx.dyfs
            // var hth =
            $.ajax({
                type:"POST",
                url:"https://xysb.anthb.cn:1502/fwjtddyqscdj-server/api/fwjtddyqscdj/apply/submit",
                // url:"http://localhost:8082/api/fwjtddyqscdj/apply/submit",
                data:JSON.stringify({
                    applyInfo: {			// 申请人信息
                        sqrXm:self.userName,			// 申请人姓名
                        sqrSfzhm:self.idCard	// 申请人身份证号
                        // sqrXm:"徐兰",			// 申请人姓名
                        // sqrSfzhm:"420621199011051502"	// 申请人身份证号
                    },
                    qlrInfo:self.qlrInfo,
                    qlrList:self.qlrList,
                    dyInfo:self.dydata,
                    bdcInfo:self.bdcxx

                }),
                contentType : "application/json",
                headers: {
                    // Authorization: "Bearer "+localStorage.getItem('zyyy_id_token')
                },
                dataType : "json",
                success:function (res) {
                    if(res.code == 1){
                        localStorage.clear()
                        // window.location.href = "./status.html?zzh="+res.data
                        window.location.href = "./status.html"
                    }else{
                        alert(res.msg)
                    }
                    self.loading = false
                },
                error:function (jqXHR,textStatus,err) {
                    self.loading = false
                    alert("错误信息："+err);
                    console.log(err)
                }
            })
        },
        /**
         * 支付宝刷脸认证
         *https://xysb.anthb.cn:1502/bdcydysq-server/api/aliAuth/zhima
         * */
        alipayFace(index){
            var self = this;
            // var qlrInfo = self.qlrInfo
            // var qlrList = self.qlrList
            // var keyIndex = index;//当前共享人添加序号
            var list = self.qlrList
            var count = self.addCount
            var qlrId = self .qlrInfo.zjhm


            // list[count].gyfs1 = 1;
            // list[count].sex  = "男"
            // list[count].qlrmc="黄明清"
            // list[count].zjhm ="420683196509080947"
            // list[count].dh = "13810234984"
            // list[count].dz ="湖北省襄阳市"

            console.log(count)
            if(list[count].qlrmc == ''){
                alert("请输入共有义务人姓名")
                return;
            }
            if(list[count].zjhm == ''){
                alert("请输入共有义务人身份证号码")
                return;
            }
            if(!self.idcard(list[count].zjhm).isTrue){
                alert("共有义务人身份证号码不合法")
                return;
            }

            if(list[count].sex == ''){
                alert("请选择共有义务人性别")
                return;
            }
            if(list[count].dh == ''){
                alert("请输入共有义务人联系方式")
                return;
            }
            // if(!(/^1[34578]\d{9}$/.test(list[count].dh))){
            //     alert("义务人联系方式");
            //     return false;
            // }

            if(list[count].dz == ''){
                alert("请输入共有义务人地址")
                return;
            }
            if(list[count].gyfs1 == ''){
                alert("请选择共有义务人共有方式")
                return;
            }
            /*if(list[count].qlrmc == "" || list[count].zjhm == "" || list[count].dh == "" || list[count].dz == "" || list[count].gyfs == ""){
                alert("请完成当前共有权利人信息填写");
                return false;
            }*/

            if(list.length == 1){
                var id = list[0].zjhm;
                if(id == qlrId){
                    alert("权力人和共有义务人不能重复！")
                    return false;
                }
            }
            if(list.length>1){
                for(var i = 0;i<list.length;i++){
                    list[i].ybdcqzh = self.qlrInfo.ybdcqzh
                    // alert(1)
                    var id = list[i].zjhm;
                    for(var j = 0;j <=i-1;j++){
                        var id1 = list[j].zjhm
                        if(id == id1 || id == qlrId || id1 == qlrId){
                            alert("义务人和共有义务人不能重复！")
                            return false;
                        }
                    }
                }
            }
            /**缓存数据到本地*/
            // self.qlrInfo.isReadOnly = true
            self.qlrList[count].isReadOnly = true
            self.qlrList[count].isFace = 1
            // console.log(self.qlrList)
            setTimeout(function () {
                localStorage.setItem("qlrInfo",JSON.stringify(self.qlrInfo))
                localStorage.setItem("qlrList",JSON.stringify(self.qlrList))
            },10)
            // console.log(JSON.parse(localStorage.getItem("qlrInfo").isReadOnly))
            // localStorage.setItem("keyIndex",keyIndex)
            $.ajax({
                type:"GET",
                url:"https://xysb.anthb.cn:1502/fwjtddyqscdj-server/api/aliAuth/zhima",
                data:{
                    userName:list[count].qlrmc,
                    idCardNo:list[count].zjhm,
                    faceIndex:index,
                },
                contentType : "application/json",
                headers: {
                    // Authorization: "Bearer "+localStorage.getItem('zyyy_id_token')
                },
                dataType : "json",
                success:function (res) {
                    self.loading = true;
                    window.location.href = res.redirectInvokeUrl
                },
                error:function (jqXHR,textStatus,err) {
                    console.log(err)
                }
            })
        },
        /**扫脸完成二次进入页面逻辑处理*/
        secondOpenPage(){
            var self = this;
            // alert("共有人扫脸完成进入")
            var index = self.getUrlParams("faceIndex");
            if(index != -1 && index != "" && index != null){
                var qlrInfo = JSON.parse(localStorage.getItem("qlrInfo"));
                var qlrList = JSON.parse(localStorage.getItem("qlrList"))
                // console.log(JSON.parse(localStorage.getItem("qlrInfo")))
                // console.log("qlrInfo:"+qlrInfo)
                // console.log("qlrList："+qlrList.length)
                if(index != null && qlrInfo != null && qlrList != null && qlrInfo != undefined && qlrList != undefined){
                    // alert("获取扫脸缓存数据")
                    self.qlrInfo = JSON.parse(localStorage.getItem("qlrInfo"));
                    self.qlrList = JSON.parse(localStorage.getItem("qlrList"));
                    self.addCount = JSON.parse(localStorage.getItem("count"));
                    // alert("addCount:"+self.addCount)
                }
            }
        },
        /**
         * 根据身份证号判断性别
         * */
        getUserGender(idcard){
            if (parseInt(idcard.substr(16, 1)) % 2 == 1) {
                //男
                return 1;
            } else {
                //女
                return 2;
            }
        },
        /**
         * 确认提交
         * */
        submit(){
            var self = this
            self.postQlrxx()
        },
        idcard (val) {
            //去掉所有的空格
            const cardNo = val.replace(/\s/g, "");

            const info = {
                isTrue: false,
                year: null,
                month: null,
                day: null,
                isMale: false,
                isFemale: false
            };
            if (!cardNo && 18 != cardNo.length) {
                info.isTrue = false;
                return info;
            }

            if (18 == cardNo.length) {
                let year = cardNo.substring(6, 10);
                let month = cardNo.substring(10, 12);
                let day = cardNo.substring(12, 14);
                let p = cardNo.substring(14, 17);
                let birthday = new Date(year, parseFloat(month) - 1, parseFloat(day));
                // 这里用getFullYear()获取年份，避免千年虫问题
                if (birthday.getFullYear() != parseFloat(year) ||
                    birthday.getMonth() != parseFloat(month) - 1 ||
                    birthday.getDate() != parseFloat(day)) {
                    info.isTrue = false;
                    return info;
                }
                let Wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1]; // 加权因子
                let Y = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2]; // 身份证验证位值.10代表X
                // 验证校验位
                let sum = 0; // 声明加权求和变量
                let _cardNo = cardNo.split("");

                if (_cardNo[17].toLowerCase() == 'x') {
                    _cardNo[17] = 10; // 将最后位为x的验证码替换为10方便后续操作
                }
                for (let i = 0; i < 17; i++) {
                    sum += Wi[i] * _cardNo[i]; // 加权求和
                }
                let i = sum % 11; // 得到验证码所位置

                if (_cardNo[17] != Y[i]) {
                    info.isTrue = false;
                    return info;
                }
                info.isTrue = true;
                info.year = birthday.getFullYear();
                info.month = birthday.getMonth() + 1;
                info.day = birthday.getDate();
                if (p % 2 == 0) {
                    info.isFemale = true;
                    info.isMale = false;
                } else {
                    info.isFemale = false;
                    info.isMale = true;
                }
                return info;
            }
            //判断info.isTrue即可
            return info;
        },
        /**
         * 选择性别 by Alipay
         * */
        chooseSex(type,index){
            var self = this;
            if(type === '0'){
                AlipayJSBridge.call('beehiveOptionsPicker', {
                        title: "选择性别",
                        optionsOne: ["男", "女","不详"]
                    }, function(result) {
                        var sex = result;
                        self.qlrInfo.sex = result.selectedOneOption;
                        switch(sex){
                            case "男":
                                self.qlrInfo.xb = "1";
                                break;

                            case "女":
                                self.qlrInfo.xb = "2";
                                break;
                            case "不详":
                                self.qlrInfo.xb = "3";
                                break;
                            default:
                                self.qlrInfo.xb = "1";
                                break;
                        }
                    }
                );
            }
            if(type === '1'){
                AlipayJSBridge.call('beehiveOptionsPicker', {
                        title: "选择性别",
                        optionsOne: ["男", "女","不详"]
                    }, function(result) {
                        var sex = result;
                        self.qlrList[index].sex = result.selectedOneOption;
                        switch(sex){
                            case "男":
                                self.qlrList[index].xb = "1";
                                break;

                            case "女":
                                self.qlrList[index].xb = "2";
                                break;
                            case "不详":
                                self.qlrList[index].xb = "3";
                                break;
                            default:
                                self.qlrList[index].xb = "1";
                                break;
                        }
                    }
                );
            }

        },
        /**
         * 请选择共有方式
         * */
        chooseGyfs(type,index){
            var self = this;
            if(type === '0'){
                AlipayJSBridge.call('beehiveOptionsPicker', {
                        title: "选择共有方式",
                        optionsOne: ["单独所有", "共同共有","按份共有","其它共有"]
                    }, function(result) {
                        var sex = result;
                        self.qlrInfo.gyfs1 = result.selectedOneOption;
                        switch(sex){
                            case "单独所有":
                                self.qlrInfo.gyfs = "0";
                                break;
                            case "共同共有":
                                self.qlrInfo.gyfs = "1";
                                break;
                            case "按份共有":
                                self.qlrInfo.gyfs = "2";
                                break;
                            case "其它共有":
                                self.qlrInfo.gyfs = "3";
                                break;
                            default:
                                self.qlrInfo.gyfs = "0";
                                break;
                        }
                    }
                );
            }
            if(type === '1'){
                AlipayJSBridge.call('beehiveOptionsPicker', {
                        title: "选择共有方式",
                        optionsOne: ["单独所有", "共同共有","按份共有","其它共有"]
                    }, function(result) {
                        var sex = result;
                        self.qlrList[index].gyfs1 = result.selectedOneOption;
                        switch(sex){
                            case "单独所有":
                                self.qlrList[index].gyfs = "0";
                                break;
                            case "共同共有":
                                self.qlrList[index].gyfs = "1";
                                break;
                            case "按份共有":
                                self.qlrList[index].gyfs = "2";
                                break;
                            case "其它共有":
                                self.qlrList[index].gyfs = "3";
                                break;
                            default:
                                self.qlrList[index].gyfs = "";
                                break;
                        }
                    }
                );
            }
        },

        /**
         * 根据输入进度动态展示顶部tab
         * @step index索引
         * */
        dynamicTab(step){
            var self = this;
            // self.qlrInfo.qlrmc ="颜梅芳"
            // self.qlrInfo.zjhm ="42062119730630386X"
            // self.qlrInfo.ybdcqzh = "鄂（2019）襄阳市不动产权第0012639号"
            // self.qlrInfo.dh = "1381024"
            // self.qlrInfo.dz = '湖北省襄阳市襄州区'
            // self.qlrInfo.gyfs=1
            // self.qlrInfo.gyfs1= "共同共有"
            // self.qlrInfo.sex = 1



            if(self.qlrInfo.qlrmc == ''){
                alert("请输入义务人姓名")
                return;
            }
            if(self.qlrInfo.zjhm == ''){
                alert("请输入义务人身份证号码")
                return;
            }

            if(!self.idcard(self.qlrInfo.zjhm).isTrue){
                alert("义务人身份证号码不合法")
                return;
            }
            if(self.qlrInfo.sex == ''){
                alert("请选择义务人性别")
                return;
            }
            if(self.qlrInfo.dh == ''){
                alert("请输入义务人联系方式")
                return;
            }
            if(self.qlrInfo.dz == ''){
                alert("请输入义务人地址")
                return;
            }
            if(self.qlrInfo.gyfs1 == '' || self.qlrInfo.gyfs == ''){
                alert("请选择义务人共有方式")
                return;
            }
            if(self.qlrInfo.ybdcqzh == ''){
                alert("请输入不动产证号")
                return ;
            }
            /*if(self.qlrList.length == 0 ){
                alert(111)
                return true;
            }*/
            if(self.qlrList.length != 0 ){
                if(self.qlrList[self.addCount].isFace == 0 ){
                    alert("请完成当前共有义务人扫脸验证")
                    return;
                }
            }
            /*if(self.qlrList[self.addCount].isFace == 0 ){
                alert("请完成当前共有权利人验证")
                return;
            }*/
            self.isFastClick = true;
            self.getObliGator(step)
        },
        commanSelectTime(type) {
            var self = this;
            var now = new Date();
            var nowYear = now.getFullYear();
            var nowMonth = now.getMonth() + 1;
            var nowDate = now.getDate();
            var yearData = function(callback) {
                // setti
                // meout只是模拟异步请求，真实情况可以去掉
                // setTimeout(function() {
                callback(self.formatYear(nowYear))
                // }, 2000)
            }
            var monthData = function (year, callback) {
                // settimeout只是模拟异步请求，真实情况可以去掉
                // setTimeout(function() {
                callback(self.formatMonth());
                // }, 2000);
            };
            var dateData = function (year, month, callback) {
                // settimeout只是模拟异步请求，真实情况可以去掉
                // setTimeout(function() {
                if (/^(1|3|5|7|8|10|12)$/.test(month)) {
                    callback(self.formatDate(31));
                }
                else if (/^(4|6|9|11)$/.test(month)) {
                    callback(self.formatDate(30));
                }
                else if (/^2$/.test(month)) {
                    if (year % 4 === 0 && year % 100 !==0 || year % 400 === 0) {
                        callback(self.formatDate(29));
                    }
                    else {
                        callback(self.formatDate(28));
                    }
                }
                else {
                    throw new Error('month is illegal');
                }
            }
            var iosSelect = new IosSelect(3,
                [yearData, monthData, dateData],
                {
                    title: '时间选择',
                    itemHeight: 35,
                    oneLevelId: "",
                    twoLevelId: "",
                    threeLevelId: "",
                    showLoading: true,
                    callback: function (selectOneObj, selectTwoObj, selectThreeObj) {
                        var timeVal = selectOneObj.value + '-' + selectTwoObj.value + '-' + selectThreeObj.value
                        if(type == '0'){
                            self.dydata.zwlxqxs= timeVal

                        }
                        else if(type == '1'){
                            self.dydata.zwlxqxz = timeVal
                        }
                    }
                })
        },
        formatYear (nowYear) {
            var arr = [];
            for (var i = nowYear - 5; i <= nowYear + 50; i++) {
                arr.push({
                    id: i + '',
                    value: i + ''
                });
            }
            return arr;
        },
        formatMonth () {
            var arr = [];
            for (var i = 1; i <= 12; i++) {
                arr.push({
                    id: i + '',
                    value: i<10?'0'+i:i
                });
            }
            return arr;
        },
        formatDate(count){
            var arr = [];
            for (var i = 1; i <= count; i++) {
                arr.push({
                    id: i + '',
                    value:i<10?'0'+i:i
                });
            }
            return arr;
        },
	}
})