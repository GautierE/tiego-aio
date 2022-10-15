export default class {
  constructor() {}

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
