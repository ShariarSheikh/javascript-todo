//NOTE: Object OOP

// **-----------------------------------------------------------------object literal
// **-----------------------------------------------------------------object literal
// const watch = {
//   watchName: "Rolex",
//   startTime: 0,
//   endTime: 0,
//   running: false,
//   duration: 0,
//   get start() {
//     if (this.running) return new Error("Watch is already started");
//     this.startTime = new Date();
//     this.running = true;
//     return `${this.watchName} start--> ${this.startTime.getSeconds()}`;
//   },
//   get stop() {
//     if (!this.running) return new Error("Watch is not started");
//     this.running = false;
//     this.endTime = new Date();
//     const second = (this.startTime.getTime() - this.endTime.getTime()) / 1000;
//     this.duration += second;
//     return `${this.watchName} end--> ${this.endTime.getSeconds()}`;
//   },
// };
// **-----------------------------------------------------------------factory function
// **-----------------------------------------------------------------factory function
// function watch(watchName) {
//   return {
//     watchName: watchName,
//     startTime: 0,
//     endTime: 0,
//     running: false,
//     duration: 0,
//     get start() {
//       if (this.running) return new Error("Watch is already started");
//       this.startTime = new Date();
//       this.running = true;
//       return `${watchName} start--> ${this.startTime.getSeconds()}`;
//     },
//     get stop() {
//       if (!this.running) return new Error("Watch is not started");
//       this.running = false;
//       this.endTime = new Date();
//       const second = (this.startTime.getTime() - this.endTime.getTime()) / 1000;
//       this.duration += second;
//       return `${watchName} end--> ${this.endTime.getSeconds()}`;
//     },
//   };
// }
// const result1 = watch("Timex");

// **-----------------------------------------------------------------constructor function
// **-----------------------------------------------------------------constructor function
function Watch(watchName) {
  this.running = false;
  this.startTime = 0;
  this.endTime = 0;
  this.duration = 0;
  this.watchName = watchName;

  this.start = function () {
    if (this.running) return new Error("Watch is already started");
    this.startTime = new Date();
    this.running = true;
    return `${watchName} start--> ${this.startTime.getSeconds()}`;
  };
  this.stop = function () {
    if (!this.running) return new Error("Watch is not started");
    this.running = false;
    this.endTime = new Date();
    const second = (this.startTime.getTime() - this.endTime.getTime()) / 1000;
    this.duration += second;
    return `${watchName} end--> ${this.endTime.getSeconds()}`;
  };
}

const result2 = new Watch("Timex");

// **-----------------------------------------------------------------constructor function
// **-----------------------------------------------------------------constructor function
