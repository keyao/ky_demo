import {
    type Router,
    createRouter,
    createWebHashHistory,
    type RouteRecordRaw,
  } from "vue-router";

  const routes:RouteRecordRaw[] = [{
    path: "/",
    redirect: "/home",
  },{
    path: "/home",
    name: "Home",
    component: () => import("../views/home/home.vue"),
  },{
    path: "/about",
    name: "About",
    component: () => import("../views/about/about.vue"),
  }]

const router:Router = createRouter({
    history:createWebHashHistory (),
    routes:routes
})
export default router