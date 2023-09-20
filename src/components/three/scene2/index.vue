<template>
  <div class="scene2" ref="scene2" onselectstart="return false;">
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
import Load from "../components/load/index.vue";
export default {
  name: "scene2",
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
    // 加载场景
    this.loadScene();

    // 自适应
    window.addEventListener("resize", this.resize);
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
        path: "./s2.lt",
        dom: this.$refs["scene2"],
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
    $route(to, from) {},
  },
  activated() {},
  // 场景自带销毁
  destroyed() {
    scene && scene.dispose();
  },
};
</script>

<style lang="less" scoped>
.scene2 {
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
