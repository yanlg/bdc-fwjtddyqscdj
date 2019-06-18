import '@/css/reset.css';
import '@/css/comman.scss';
import Vue from '@/js/vue.min.js'
// import util from '@/js/util.js'
import $ from '@/js/jquery-3.0.0.min.js'
import '@/js/reset.js'
import '@/js/util.js'
new Vue({
    el:"#app",
    data:{
        checkAgreeMent:false,
        isAgree:true,
        userInfo:{
            /*user_name:"万国军",
            cert_no:"420625197506021512"
       */ },
        loading:false
    },
    watch:{
        /*isAgree:{
            handle:function(){
                if(this.isAgree == true){

                }
            }
        }*/
    },
    computed:{

    },
    filters:{

    },
    created:function () {
        // eruda.init()
    },
    mounted:function () {
        // var userName = localStorage.getItem("userName")
        // var certNo = localStorage.getItem("certNo")
        /*alert("姓名："+localStorage.getItem("userName"))
        alert("身份证："+localStorage.getItem("certNo"))*/
        var self = this
        var localData = {
            user_name:localStorage.getItem("userName"),
            cert_no:localStorage.getItem("certNo")
        }
        if(localData.user_name != '' && localData.cert_no != '' && localData.user_name != undefined && localData.cert_no != undefined && localData.user_name != null && localData.cert_no != null){
            self.userInfo = localData;
        }else {
            this.getUserInfo()
        }
        // console.log(1111)
    },
    methods:{
        changeSelectType(){
            this.isAgree = !this.isAgree;
            // console.log(str)
        },
        showAgreeMent(){
            this.checkAgreeMent = true;
        },
        exit(){
            this.checkAgreeMent = false
            this.isAgree = false
        },
        agree(){
            this.checkAgreeMent = false
            this.isAgree = true
        },
        toHistoryPage(){
            window.location.href = "./history.html"
        },
        toAlipayFace(){
            var self = this;
            self.checkUserAuthority()
            // self.alipayFace()
        },
        goStatusPage(num){
            window.location.href = "./status.html?status="+num
        },
        /**
         * 获取用户信息
         * */
        getUserInfo(){
            var self = this;
            self.loading = true
            var reqUrl = "https://xysb.anthb.cn:1502/bdcydysq-server/api/aliAuth/getAliUserInfo?auth_code="+self.getUrlParams("auth_code")
            // var reqUrl = "http://10.10.20.146:8084/api/aliAuth/getAliUserInfo?auth_code=cc7760c2e7a3460e907fa638a792YX32"
            $.ajax({
                type:"GET",
                url:reqUrl,
                data:{},
                contentType : "application/json",
                headers: {
                    // Authorization: "Bearer "+localStorage.getItem('zyyy_id_token')
                },
                dataType : "json",
                success:function (res) {
                    // alert(res)
                    if(res.code == 1){
                        console.log(res.data);
                        // var ress = {"msg":"操作成功","code":1,"data":{"user_status":"T","cert_no":"42060619870428401X","gender":"m","city":"襄阳市","is_certified":"T","user_name":"王佳","mobile":null,"avatar":"https://tfs.alipayobjects.com/images/partner/T1uOddXddmXXXXXXXX","is_student_certified":"F","user_type":"2","province":"湖北省","user_id":"2088102353996323","phone":null,"nick_name":"王佳"}}
                        console.log(res.data.user_name);
                        console.log(res.data.cert_no);
                        localStorage.setItem("userName",res.data.user_name);
                        localStorage.setItem("certNo",res.data.cert_no);
                        self.userInfo = res.data;
                        self.loading = false
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
        /**
         * 支付宝刷脸认证
         *https://xysb.anthb.cn:1502/bdcyy-server/api/aliAuth/zhima
         * */
        alipayFace(){
            var self = this;
            $.ajax({
                type:"GET",
                url:"https://xysb.anthb.cn:1502/bdcydysq-server/api/aliAuth/zhima",
                data:{
                    userName:self.userInfo.user_name,
                    idCardNo:self.userInfo.cert_no
                },
                contentType : "application/json",
                headers: {
                    // Authorization: "Bearer "+localStorage.getItem('zyyy_id_token')
                },
                dataType : "json",
                success:function (res) {
                    // alert(res)
                    window.location.href = res.redirectInvokeUrl
                },
                error:function (jqXHR,textStatus,err) {
                    console.log(err)
                }
            })
        },
        /**
         * 不动产预登记
         * 申请前置检查(是否满足申请条件)：
         * https://xysb.anthb.cn:1502/bdcyy-server/api/bdcydj/check
         * */
        checkUserAuthority(){
            var self = this;
            self.loading = true
            var reqUrl = "https://xysb.anthb.cn:1502/bdcydysq-server/api/bdcydy/check";
            $.ajax({
                type:"GET",
                url:reqUrl,
                data:{
                    qlrmc:self.userInfo.user_name,
                    qlrzjbh:self.userInfo.cert_no
                },
                contentType : "application/json",
                headers: {
                    // Authorization: "Bearer "+localStorage.getItem('zyyy_id_token')
                },
                dataType : "json",
                success:function (res) {
                    self.loading = false;
                    if(res.code == 0){
                        // alert("开启扫脸")
                        self.alipayFace()
                    }else{
                        alert("暂未查询到当前权利人预登记信息")
                    }
                },
                error:function (jqXHR,textStatus,err) {
                    console.log(err)
                }
            })
        }
    }
})