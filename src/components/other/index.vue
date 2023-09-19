<template>
  <div class="byMySelf">
    <button
      v-for="(i, index) in sceneList"
      @click="changeScene(i)"
      :key="index + 'btn'"
    >
      {{ i }}
    </button>
  </div>
</template>

<script>
import bus from "./../../utils/Bus";
export default {
  name: "byMySelf",
  components: {},
  data() {
    return {
      sceneList: ["scene1", "scene2"],
    };
  },
  mounted() {},
  methods: {
    // 切场景
    changeScene(name) {
      bus.$emit("change-scene", name);
    },
  },
  watch: {},
  activated() {},
  // 场景自带销毁
  destroyed() {},
};
</script>

<style lang="less" scoped>
.byMySelf {
  width: 100%;
  height: 100%;
}
</style>
