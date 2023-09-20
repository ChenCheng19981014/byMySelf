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


    // 场景刷新
    const reflash = () => {
      // runScene.sceneEx.aotuOpenUpdate();
    }

    // 场景初始化
    class InitScene {
      name = "initScene";
      mounted() {
        // 脚本
        runScene.script.playAll();

        controls.screenSpacePanning = false;
        // 蓝图功能
        bus.$on('blueprintFn', this.blueprintFn.bind(this))
      }

      init() {
      }

      triggerNode(name) {
        for (const node of [
          ...runScene.graph.getNodesByTypes("UI/按钮"),
        ]) {
          if (node.widgetsMap["name"].value === name) {
            console.log('node:', node);
            return node;
          }
        }
      }
      blueprintFn(name) {
        // this.triggerNode(name)
        runScene.graph.runCustom(name)
        reflash()
      }

    }



    // 基本事件
    class Events {
      name = "events";

      clickModel = null;

      isRunning = true;

      constructor() {
        runScene.cb.model.setSelect.add(
          "trigger-click",
          this.triggerClick.bind(this)
        );

        this.refreshDom()

        bus.$on('sceneRunning2', (isRunnig) => {
          this.isRunning = isRunnig
        })
      }

      triggerClick = (model) => {

        if (!model) return;

        // 打印bus
        bus.$emit("logClickModel", model);

        // 点击事件
        this.clickSprite(model)
      };

      // 点击事件
      clickSprite(model) {


      }

      // 刷新dom
      refreshDom() {

        runScene.cb.controls.change.add("setDialogPosition", () => {

          if (!this.clickModel) return

          // if (!this.isRunning) return

          const map = { outDom: document.querySelector('#app'), model: this.clickModel, camera }

          const { left: x, top: y } = this.get2DVec(map);

          const ps = { x, y };

          // console.log('x:', x, y);

          bus.$emit("set-position-dialogThree", '', ps);
        });
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

        const map = { outDom: document.querySelector('#app'), model, camera }

        const { left: x, top: y } = this.get2DVec(map);

        const ps = { x, y };

        return ps
      }

      dispose() {
        controls.removeEventListener("start", this.controlStart);
      }
    }

    return [Events, InitScene];
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
