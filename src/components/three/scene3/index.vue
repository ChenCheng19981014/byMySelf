<template>
  <div class="scene3" ref="scene3" onselectstart="return false;">
    <Load v-show="!loadingEnd"></Load>
    <div
      @pointerdown="
        (e) => {
          e.stopPropagation();
        }
      "
      class="btn"
    >
      <!-- <button
        @pointerdown="machineAnimation(i)"
        v-for="(i, _) in machineAnimationName"
      >
        {{ i }}
      </button> -->
    </div>
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
  name: "scene3",
  components: {
    Load,
  },
  data() {
    return {
      machineAnimationName: [
        "拿取小圆",
        "拿取大圆",
        "拿取方块",
        "放回小圆",
        "放回大圆",
        "复位",
        "初始化",
        "乱序2",
        "乱序3",
      ],
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
    // 机器动画
    machineAnimation(name) {
      bus.$emit("blueprintFn", name);

      console.log("name:", name);
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
        path: "./s3.lt",
        // path: "http://192.168.3.8:8080/file?path=project/linkpoint/&key=202309201504047125091001202347",
        dom: this.$refs["scene3"],
      });

      fn(scene, {
        Utils,
        bus,
        Three: THREE,
      });

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

      // 入场动画
      let timer = setTimeout(() => {
        scene.cameraEx.setTemp("初始", { time: 2 });
        clearTimeout(timer);
      }, 1000);

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
.scene3 {
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
