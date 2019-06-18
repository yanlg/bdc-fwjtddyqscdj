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
        zzh:""
    },
    watch:{

    },
    computed:{

    },
    filters:{

    },
    created:function () {
        // console.log(util)
    },
    mounted:function () {
        this.zzh = this.getUrlParams('zzh')
    },
    methods:{
        getUrlParams(name){
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return decodeURI(r[2]);
            return null;
        },
        getDownloadUrl(){
            var self = this;
            $.ajax({
                type:"GET",
                url:"https://xysb.anthb.cn:1502/bdcydysq-server/api/bdcydj/queryDzzzInfo",
                data:{
                    zzh:self.getUrlParams("zzh")
                },
                contentType : "application/json",
                headers: {
                    // Authorization: "Bearer "+localStorage.getItem('zyyy_id_token')
                },
                dataType : "json",
                success:function (res) {
                    // alert(res)
                },
                error:function (jqXHR,textStatus,err) {
                    console.log(err)
                }
            })
        }
    }
})