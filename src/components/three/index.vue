<template>
  <div class="scene" ref="scene" onselectstart="return false;">
    <Load v-show="!loadingEnd"></Load>
    <div
      @pointerdown="
        (e) => {
          e.stopPropagation();
        }
      "
      class="btn"
    ></div>
  </div>
</template>

<script>
let scene = null;
import * as THREE from "three";
import { fn } from "./Change";
import { RunScene, Utils } from "run-scene-v2";
import bus from "@/utils/bus";
import Load from "./components/load/index.vue";
export default {
  name: "scene",
  components: {
    Load,
  },
  data() {
    return {
      change: null,
      isShow: false,
      loadingEnd: false,
    };
  },
  mounted() {
    // 全局页面自适应
    window.addEventListener("resize", () => {
      if (!scene) return;
      let map = scene.assetsEx.engineDom.getBoundingClientRect();
      scene.setSize(map.width, map.height);
    });
    // 加载场景
    this.loadScene();

    // 场景自适应
    bus.$on("scene-resize", this.resizeCanvas);

    window.addEventListener("resize", this.resize);

    // 冻结 场景
    // bus.$on("freezeScene-scene", this.freezeScene);
  },
  methods: {
    freezeScene(isfreeze) {
      scene.globalConfig.setState(isfreeze);
    },

    // 加载场景
    loadScene() {
      scene = new RunScene({
        renderConfig: {
          // 是否允许设置模型位置后自动渲染最新效果
          matrixAutoUpdate: true,
          scriptFrame: 60,
          event: {
            ignores: ["resize"],
          },
        },
      }).load({
        path: "./s.lt",
        // path: "http://192.168.3.8:8080/file?path=project/linkpoint/&key=202307201528590772191001202349",
        dom: this.$refs["scene"],
      });

      fn(
        scene,
        {
          Utils,
          bus,
          Three: THREE,
        },
        {}
      );

      scene.on("loaded", async () => {
        this.onDone();
      });
    },

    // 自适应
    resize() {
      scene.setSize(document.body.offsetWidth, document.body.offsetHeight);
    },

    onDone() {
      this.loadingEnd = true;
      console.log("场景加载完毕~");
    },
  },

  watch: {
    $route(to, from) {
      if (from.path !== "login") {
        bus.$emit("anima", "初始");
      }
    },
  },
  activated() {
    if (!scene) return;
    this.freezeScene(true);
    // 初始化 相机
    Utils.getMacro(() => bus.$emit("anima", "登录状态"), 1000);
  },
  // 场景自带销毁
  destroyed() {
    scene && scene.dispose();
  },
};
</script>

<style lang="less" scoped>
.scene {
  width: 100%;
  height: 100%;
  position: absolute;

  .btn {
    z-index: 3;
    position: absolute;
  }

  .oth {
    position: absolute;
    z-index: 2;
  }

  .show {
    opacity: 1 !important;
  }

  .none {
    opacity: 0 !important;
  }
}
</style>
