<template>
  <div class="load" ref="load">
    <div class="loading">
      <div class="vsg">
        <svg viewBox="0 0 50 50">
          <circle class="ring" cx="25" cy="25" r="20"></circle>
          <circle class="ball" cx="25" cy="5" r="3.5"></circle>
        </svg>
      </div>
      <div class="text">Loading</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Loading",
  data() {
    return {};
  },
  mounted() {},
  watch: {},
  methods: {},
};
</script>

<style scoped>
.load {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 3;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(0, 0, 0);
}

.load {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .vsg {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
svg {
  width: 3.75em;
  animation: 1.5s spin ease infinite;
}

.ring {
  fill: none;
  stroke: hsla(106, 97%, 59%, 0.3);
  stroke-width: 2;
}

.ball {
  fill: #00ff85;
  stroke: none;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.text {
  text-align: center;
  font-size: 16px;
  background: linear-gradient(to right, #00ff85, #5090ff);
  background-clip: text;
  -o-background-clip: text;
  -ms-background-clip: text;
  -moz-background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}
.load-Show {
  display: none !important;
}
</style>
