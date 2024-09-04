const Layout = () => import("@/layout/index.vue");

export default {
  path: "/",
  name: "Home1",
  component: Layout,
  redirect: "/vue3Webpack",
  meta: {
    icon: "ep:home-filled",
    title: "Vue项目",
    rank: 0
  },
  children: [
    {
      path: "/vue3Webpack",
      name: "vue3Webpack",
      component: () => import("@/views/vue3Webpack/index.vue"),
      meta: {
        title: "Vue项目",
      }
    }
  ]
} satisfies RouteConfigsTable;
