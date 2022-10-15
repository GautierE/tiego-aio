import got from "got";
import tough from "tough-cookie";
import Functionality from "../../class/Functionality.js";

export default class extends Functionality {
  constructor(task) {
    super();
    console.log(task);
    this.taskDetails = task;
    this.cookiejar = new tough.CookieJar();
    this.client = got.extend({cookieJar: this.cookiejar});

    // this.getSession();
  }
}
