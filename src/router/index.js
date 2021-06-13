//导入路由
import VueRouter from "vue-router";
import Vue from "vue";
import About from "../views/About";
import Chatbot from "../views/Chatbot";
import Index from "../views/Index";

Vue.use(VueRouter);

//2.创建路由对象
const router = new VueRouter({
    routes: [
        {
            path: '/',
            redirect: '/index',
        },
        {
            path: "/about",
            component: About,
        },
        {
            path: "/chatbot/:type",
            component: Chatbot,
        },
        {
            path: "/index",
            component: Index,
        }
    ],
    mode: 'history'
});
//导出router 实例
export default router;
