<style scoped lang="less">
.index {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>

<script setup lang="ts">
import { ref } from "vue";
import scene1 from "../../components/three/scene1/index.vue";
import scene2 from "../../components/three/scene2/index.vue";
import byMySelf from "../../components/other/index.vue";
let showScene = ref("byMySelf");
</script>
<template>
  <div class="index">
    <KeepAlive v-if="true">
      <component :is="byMySelf"></component>
    </KeepAlive>
  </div>
</template>
