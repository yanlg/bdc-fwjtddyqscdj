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

    },
    watch:{

    },
    computed:{

    },
    filters:{

    },
    created:function () {

    },
    mounted:function () {
        // this.getAliAuthUrl();
        this.clearLocalStorage();
    },
    methods:{
        /**
         * 获取支付宝授权
         * @url {https://xysb.anthb.cn:1502/bdcydysq-server/api/aliAuth/getAliAuthUrl}
         * */
        getAliAuthUrl(){
            $.ajax({
                type:"GET",
                url:"https://xysb.anthb.cn:1502/bdcydysq-server/api/aliAuth/getAliAuthUrl",
                data:{},
                contentType : "application/json",
                headers: {
                    // Authorization: "Bearer "+localStorage.getItem('zyyy_id_token')
                },
                dataType : "json",
                success:function (res) {
                    if(res.code == 1){
                        var resUrl = res.data;
                        // alert(res.data)
                        window.location.href = resUrl;
                    }
                },
                error:function (jqXHR,textStatus,err) {
                   console.log(err)
                }
            })
            // window.location.href = "https://xysb.anthb.cn:1502/bdcydysq-server/api/aliAuth/getAliAuthUrl"
        },
        /**
         * 扫脸失败删除所有的页面localstorage数据
         *
         * */
        clearLocalStorage(cb){
            var self = this;
            /*localStorage.removeItem("userName");
            localStorage.removeItem("certNo");
            localStorage.removeItem("qlrInfo");
            localStorage.removeItem("qlrList");*/
            localStorage.clear()
            // localStorage.removeItem("keyIndex");
            self.getAliAuthUrl();
        }
    }
})