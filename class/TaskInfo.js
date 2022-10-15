export default class {
  constructor(opts) {
    if (!opts) 
      throw "Error during task creation, make sure to not leave empty lines in tasks.csv file";
    
    this.productLink = opts[0];
    this.email = opts[1];
    this.password = opts[2];
  }
}
