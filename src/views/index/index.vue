<style scoped lang="less">
.index {
  width: 100%;
  height: 100%;
  position: relative;
  background-color: #777;
  .scene1 {
    width: 100%;
    height: 100%;
    position: absolute;
  }
  .scene2 {
    width: 100%;
    height: 100%;
    position: absolute;
  }
  .scene3 {
    width: 100%;
    height: 100%;
    position: absolute;
  }
}
</style>

<script setup lang="ts">
import { ref, reactive, shallowRef, DefineComponent } from "vue";
import bus from "./../../utils/Bus";
import scene1 from "../../components/three/scene1/index.vue";
import scene2 from "../../components/three/scene2/index.vue";
import scene3 from "../../components/three/scene3/index.vue";
import byMySelf from "../../components/tab/index.vue";
let showScene = ref(byMySelf);
// 切场景
// const changeScene = (name) => {
//   if (name === "场景1") {
//     showScene.value = scene1 as any | DefineComponent;
//   } else if (name === "场景2") {
//     showScene.value = scene2 as any | DefineComponent;
//   } else if (name === "场景3") {
//     showScene.value = scene3 as any | DefineComponent;
//   }
// };
// bus-切场景
// bus.$on("change-scene", changeScene);
</script>
<template>
  <div class="index">
    <byMySelf/>
    <KeepAlive v-if="true">
      <router-view></router-view>
    </KeepAlive>
  </div>
</template>
