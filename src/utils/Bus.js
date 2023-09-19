class MyBus {

    constructor() {
        this.busList = {}
    }

    $on(fnName, fn) {
        if (this.busList[fnName]) throw console.error('事件名称重复!');
        this.busList[fnName] = fn;
    }

    $emit(fnName) {
        const args = [...arguments].slice(1)
        this.busList[fnName](...args)
    }

    $off(fnName) {
        if (!this.busList[fnName]) return
        delete this.busList[fnName];
    }
}

let bus = new MyBus()

export default bus
