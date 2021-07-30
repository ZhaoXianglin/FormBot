//导入路由
import VueRouter from "vue-router";
import Vue from "vue";
import About from "../views/About";
import Interview from "../views/Interview";
import Chatbot from "../views/Chatbot";
import Index from "../views/Index";
import Info from "../views/Info";
import Finish from "../views/Finish";

Vue.use(VueRouter);

//2.创建路由对象
const router = new VueRouter({
    routes: [
        {
            path: '/',
            redirect: '/index',
        },
        {
            path: "/interview",
            component: Interview,
        },
        {
            path: "/info",
            component: Info,
        },
        {
            path: "/chatbot/:type",
            component: Chatbot,
        },
        {
            path: "/index",
            component: Index,
        },
        {
            path: "/about",
            component: About,
        },
        {
            path: "/finish",
            component: Finish,
        },
    ],
    mode: 'history',
    scrollBehavior (to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { x: 0, y: 0 }
        }
    }
});
//导出router 实例
export default router;
