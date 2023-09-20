// const console = {
//   log: () => { }
// }

const fn = (runScene, inputData = {}, constant = {}) => {
  const fn = (map) => {
    const {
      runScene,
      Utils,
      store,
      core,
      getModel,
      constant,
      bus,
      Three,
      camera,
      scene,
      controls,
      renderer,
    } = map;

    const { } = constant;

    // 场景初始化
    class InitScene {
      name = "initScene";
      mounted() {
        // 脚本
        runScene.script.playAll();
        // 获取模型
        Utils.getMacro(() => this.getModel(), 1000);
        // 地球转动
        this.earthRotation();

        controls.screenSpacePanning = false;
      }

      getModel() {
        this.earth = getModel("earth");
        this.m78 = getModel("Extract7Group36186_0");
      }

      earthRotation() {
        runScene.cb.render.add("render", () => {
          if (!this.earth || !this.m78) return;
          this.earth.rotation.y = this.earth.rotation.y + 0.001;
          this.m78.rotation.y = this.earth.rotation.y + 0.001;
        });
      }
    }

    class CameraAnimation {
      name = "cameraAnimation";
      mounted() {
        // 相机动画
        bus.$on("anima", this.cameraFn);
      }
      // 相机动画
      cameraFn(name) {
        runScene.cameraEx.setTemp(name, { time: 1 });
      }
    }

    class Shader {
      name = "shader";
      uniform = null;
      speed = null;
      init = null;
      vs = null;
      fs = null;
      r = null;
      init = null;
      mounted() {
        // 播放shader
        runScene.cb.render.add("shader", () => {
          if (!this.uniform || !this.uniform.u_r) return;
          this.uniform.u_r.value += this.speed || 0.05;
          if (this.uniform.u_r.value >= this.r) {
            this.uniform.u_r.value = this.init;
          }
        });
      }
      //着色器
      scatterCircle(r, init, ring, color, speed) {
        this.r = r;
        this.init = init;
        this.speed = speed;
        this.init = init;
        this.uniform = {
          u_color: { value: color },
          u_r: { value: init },
          u_ring: {
            value: ring,
          },
        };

        this.vs = `
          varying vec3 vPosition;
          void main(){
          vPosition=position;
          gl_Position  = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }`;
        this.fs = `
              varying vec3 vPosition;
              uniform vec3 u_color;
              uniform float u_r;
              uniform float u_ring;

              void main(){
              float pct=distance(vec2(vPosition.x,vPosition.y),vec2(0.0));
              if(pct>u_r || pct<(u_r-u_ring)){
                gl_FragColor = vec4(1.0,0.0,0.0,0);
              }else{
                float dis=(pct-(u_r-u_ring))/(u_r-u_ring);
                gl_FragColor = vec4(u_color,dis);
              }
              }`;
        const geometry = new Three.CircleGeometry(r, 120);
        var material = new Three.ShaderMaterial({
          vertexShader: this.vs,
          fragmentShader: this.fs,
          side: Three.DoubleSide,
          uniforms: this.uniform,
          transparent: true,
          depthWrite: false,
        });
        const circle = new Three.Mesh(geometry, material);
        circle.layers.set(this.currentlayers);
        return circle;
      }
    }

    // 基本事件
    class Events {
      name = "events";
      clickModel = null;
      isRunning = true;
      e = null;
      lastCircle = null;
      constructor() {
        // setSelect
        runScene.cb.model.click.add(
          "trigger-click",
          this.triggerClick.bind(this)
        );

        bus.$on("sceneRunning2", (isRunnig) => {
          this.isRunning = isRunnig;
        });

        document.addEventListener("click", function (e) {
          this.e = e;
        });
      }

      triggerClick = (model) => {
        if (!model) return;

        // 打印bus
        // bus.$emit("logClickModel", model);

        document.addEventListener("click", (event) => {
          // 点击事件
          this.clickSprite(model, event);
        });

        document.removeEventListener("click", function (event) { });
      };

      // 点击事件
      clickSprite(model, e) {
        // 清除上个shader
        this.lastCircle ? scene.remove(this.lastCircle) : ''
        const dom = document.querySelector(".scene2");
        // 2d转3d维度
        const get3DVecInfo = {
          x: e.clientX,
          y: e.clientY,
          domContainer: dom,
          camera,
          targetZ: 5,
        };

        this.lastCircle = core.shader.scatterCircle(
          1,
          0.1,
          0.3,
          new Three.Vector3(0, 1, 1),
          0.05
        );

        const pos = this.get3DVec(get3DVecInfo);

        this.lastCircle.position.set(pos.x, 0, pos.z);

        this.lastCircle.rotation.x = Math.PI / 2;

        // console.log(e.clientX, e.clientY, pos, model, "this.lastCircle:", this.lastCircle);

        scene.add(this.lastCircle);
      }
      /**
       *
       * @param {Number} x 屏幕坐标 x
       * @param {Number} y 屏幕坐标 y
       * @param {Document} domContainer 存放元素的容积
       * @param {THREE.PerspectiveCamera} camera 相机
       * @param {Number} targetZ  z轴 默认为0
       */

      // 2位坐标转 3d坐标
      get3DVec({ x, y, domContainer, camera, targetZ }) {

        const mouse = new Three.Vector2();
        mouse.x = (x / window.innerWidth) * 2 - 1;
        mouse.y = - (y / window.innerHeight) * 2 + 1;
        // 创建一个射线
        const raycaster = new Three.Raycaster();
        raycaster.setFromCamera(mouse, camera);

        // 计算射线与场景中的物体相交情况
        const intersects = raycaster.intersectObjects(scene.children);

        let position = null
        // 如果有物体与射线相交，则获取第一个相交物体的位置
        if (intersects.length > 0) {
          const intersection = intersects[0];
          position = intersection.point;
        }

        return position;
      }

      // 3d坐标转2位坐标
      get2DVec(map) {
        const { camera, model, outDom } = map;
        const { clientWidth, clientHeight } = outDom;
        const halfWidth = clientWidth / 2;
        const halfHeight = clientHeight / 2;
        const camPos = new Three.Vector3();
        const camDir = new Three.Vector3();
        camera.getWorldPosition(camPos);
        camera.getWorldDirection(camDir);
        const objPos = new Three.Vector3();
        model.updateMatrixWorld();
        objPos.setFromMatrixPosition(model.matrixWorld);
        const ndcPos = objPos.clone();
        ndcPos.project(camera);
        const objDir = new Three.Vector3();
        objDir.subVectors(objPos, camPos);
        objDir.normalize();
        const dotValue = camDir.dot(objDir);
        const sign = dotValue > 0 ? 1 : -1;
        const left = (1 + sign * ndcPos.x) * halfWidth;
        const top = (1 - sign * ndcPos.y) * halfHeight;
        return {
          left,
          top,
        };
      }

      getXy(model) {
        const map = { outDom: document.querySelector("#app"), model, camera };

        const { left: x, top: y } = this.get2DVec(map);

        const ps = { x, y };

        return ps;
      }

      dispose() {
        controls.removeEventListener("start", this.controlStart);
      }
    }

    return [Events, InitScene, CameraAnimation, Shader];
  };

  const modules = fn({
    runScene,
    getModel: runScene.modelEx.getModel.bind(runScene.modelEx),
    core: runScene.custom,
    ...runScene.assetsEx.get(),
    ...inputData,
    constant,
    window: null,
  });

  if (!modules) return;

  modules
    .map((TheClass) => {
      const ins = new TheClass();
      if (!ins.name) throw TypeError("代码出错");
      runScene.custom[ins.name] = ins;
      return ins;
    })
    .map((ins) => ins?.mounted?.());
};
export { fn };
