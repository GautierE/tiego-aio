export default class {
  constructor(opts) {
    if (!opts) 
      throw "Error during task creation, make sure to not leave empty lines in accounts.csv file";
    
    this.lastname = opts.lastname;
    this.firstname = opts.firstname;
    this.email = opts.email;
    this.password = opts.password;
    this.address = opts.address;
    this.subAddress = opts.subAddress;
    this.postcode = opts.postcode;
    this.city = opts.city;
    this.phone = opts.phone;
  }
}
