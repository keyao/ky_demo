const Layout = () => import("@/layout/index.vue");

export default {
  path: "/",
  name: "Home2",
  component: Layout,
  redirect: "/reactWebpack",
  meta: {
    icon: "ep:home-filled",
    title: "React项目",
    rank: 0
  },
  children: [
    {
      path: "/reactWebpack",
      name: "reactWebpack",
      component: () => import("@/views/reactWebpack/index.vue"),
      meta: {
        title: "React项目",
      }
    }
  ]
} satisfies RouteConfigsTable;
