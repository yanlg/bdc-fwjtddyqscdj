import '@/css/reset.css';
import '@/css/comman.scss';
import Vue from '@/js/vue.min.js'
// import util from '@/js/util.js'
import $ from '@/js/jquery-3.0.0.min.js'
import _ from "lodash";
import '@/js/reset.js'
import '@/js/util.js'

/**html js code*/
new Vue({
    el: "#app",
    data: {
        timeReview:5
    },
    watch: {
        /*timeReview:{
            handler:function(){
                var self = this;
                setInterval(function () {
                    self.timeReview = self.timeReview --;
                    if(self.timeReview <= 0){
                        clearInterval()
                        console.log('我要跳转了')
                    }
                },1000)
            }
        }*/
    },
    computed: {
        calcTime:function(){
            return this.timeReview
        }
    },
    filters: {},
    created: function () {

    },
    mounted: function () {
        var self = this
        var timer = setInterval(function () {
            self.timeReview -- ;
            if(self.timeReview <= 0){
                clearInterval(timer)
                console.log('我要跳转了')
                window.location.replace('./application.html');
            }
        },1000)
    },
    methods: {

    }
})