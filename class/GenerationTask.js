export default class {
  constructor(opts) {
    if (!opts) 
      throw "Error during task creation, make sure to not leave empty lines in accounts.csv file";
    
    this.lastname = opts[0];
    this.firstname = opts[1];
    this.email = opts[2];
    this.password = opts[3];
    this.address = opts[4];
    this.subAddress = opts[5];
    this.postcode = opts[6];
    this.city = opts[7];
    this.phone = opts[8];
  }
}
