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

    },
    methods:{
        goStatusPage(num){
            window.location.href = "./status.html?status="+num
        },
        /**
         * 申请历史记录
         * https://xysb.anthb.cn:1502/bdcydysq-server/api/bdcydj/apply/history
         *
         * */
        getHistory(){
            $.ajax({
                type:"GET",
                url:"https://xysb.anthb.cn:1502/bdcydysq-server/api/bdcydj/queryInfo",
                data:{
                    // qlrmc:userName,
                    // qlrzjbh:certNo
                    qlrmc:"吴静依",
                    qlrzjbh:"42060219901120002X"

                },
                contentType : "application/json",
                headers: {
                    // Authorization: "Bearer "+localStorage.getItem('zyyy_id_token')
                },
                dataType : "json",
                success:function (res) {
                    if(res.code == 1){
                        // alert(res.msg)
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
        }
    }
})