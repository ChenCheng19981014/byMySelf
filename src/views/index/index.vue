<style scoped lang="less">
.index {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>

<script setup lang="ts">
import { ref } from "vue";
import bus from "./../../utils/Bus";
import scene1 from "../../components/three/scene1/index.vue";
import scene2 from "../../components/three/scene2/index.vue";
import byMySelf from "../../components/other/index.vue";
let showScene = ref(byMySelf);
// 切场景
const changeScene = (name) => {
  showScene.value = name;
};
// bus-切场景
bus.$on("change-scene", changeScene);
</script>
<template>
  <div class="index">
    <KeepAlive v-if="true">
      <component :is="showScene"></component>
    </KeepAlive>
  </div>
</template>
