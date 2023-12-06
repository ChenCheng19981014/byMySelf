<template>
  <div class="byMySelf">
    <div class="title">Welcome To myWebGLWorld (little-demo*)</div>
    <div class="btn-type">
      <button
        class="btn"
        v-for="(i, index) in sceneList"
        @click="changeScene(i)"
        :key="index + 'btn'"
      >
        {{ i }}
      </button>
    </div>
  </div>
</template>

<script>
import bus from "./../../utils/Bus";
export default {
  name: "byMySelf",
  components: {},
  data() {
    return {
      sceneList: ["场景1", "场景2", "场景3"],
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
  display: flex;
  align-items: center;
  flex-direction: column;
  position: fixed;

  .title {
    margin-top: 100px;
    font-size: 25px;
    color: #ffffff;
    font-family: "pm";
  }

  .btn-type {
    width: 100%;
    margin-top: 100px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .btn {
      position: relative;
      width: 200px;
      height: 50px;
      text-align: center;
      text-decoration: none;
      text-transform: uppercase;
      font-size: 16px;
      font-weight: bold;
      color: #fff;
      background: linear-gradient(to right, #ff416c, #ff4b2b, #ff416c);
      background-size: 400%;
      border-radius: 50px;
      z-index: 1;
      border: none;
      outline: none;
      cursor: pointer;
      box-shadow: 0 5px 15px rgba(255, 65, 108, 0.4);
      transition: all 0.3s ease-in-out;
    }

    .btn::before {
      content: "";
      position: absolute;
      top: -5px;
      left: -5px;
      bottom: -5px;
      right: -5px;
      background: linear-gradient(to right, #ff416c, #be6a5d, #897479);
      background-size: 400%;
      border-radius: 50px;
      z-index: -1;
      filter: blur(20px);
      opacity: 0.7;
      transition: all 0.3s ease-in-out;
      animation: flow 2s linear infinite;
    }

    .btn:hover {
      background-position: right center;
      box-shadow: 0 5px 15px rgba(255, 65, 108, 0.6);
      transform: translateY(-5px);
    }

    .btn:hover::before {
      opacity: 1;
      filter: blur(30px);
    }

    @keyframes flow {
      0% {
        background-position: 0% 50%;
      }

      50% {
        background-position: 100% 50%;
      }

      100% {
        background-position: 0% 50%;
      }
    }
  }
}
</style>
