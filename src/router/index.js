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
      component: () => import("@/views/index/index.vue"),
      meta: {
        keepAlive: true, //设置页面是否需要使用缓存
      },
      children: [
        {
          path: "/scene1",
          name: "scene1",
          component: () => import("@/components/three/scene1/index.vue"),
        },
        {
          path: "/scene2",
          name: "scene2",
          component: () => import("@/components/three/scene2/index.vue"),
        },
        {
          path: "/scene3",
          name: "scene3",
          component: () => import("@/components/three/scene3/index.vue"),
        },
      ],
    },
  ],
});

router.beforeEach((to, from) => {
  if (to.path !== "login") {
    // bus.$emit("anima", "初始状态");
  }
});

export default router;
