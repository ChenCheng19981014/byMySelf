import bus from "@/utils/bus";
import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/example",
    },
    {
      path: "/example",
      name: "example",
      component: () => import("./../views/index/index.vue"),
      meta: {
        keepAlive: true, //设置页面是否需要使用缓存
      },
    },
  ],
});

router.beforeEach((to, from) => {
  if (to.path !== "login") {
    // bus.$emit("anima", "初始状态");
  }
});

export default router;
