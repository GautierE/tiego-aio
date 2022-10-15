import got from "got";
import tough from "tough-cookie";
import Functionality from "../../class/Functionality.js";

export default class extends Functionality {
  constructor(task) {
    super();

    this.identity = task;
    this.cookiejar = new tough.CookieJar();
    this.client = got.extend({cookieJar: this.cookiejar});
    this.request = {};

    this.getSession();
  }

  async getSession() {
    try {
      console.log("Getting session..");
      await this.client.get("https://riotskateshop.fr/");
      this.createAccount();
    } catch (e) {
      console.log("Error getting session");
    }
  }

  async createAccount() {
    try {
      console.log("Creating account..");
      await this.client.get("https://riotskateshop.fr/connexion", {
        cookieJar: this.cookiejar,
        searchParams: {
          create_account: 1,
          id_gender: 1,
          firstname: this.identity.firstname,
          lastname: this.identity.lastname,
          email: this.identity.email,
          password: this.identity.password,
          psgdpr: 1,
          submitCreate: 1
        }
      });
      console.log("Account created successfully");
      this.getCsrfToken();
    } catch (e) {
      console.log("Error creating account");
    }
  }

  async getCsrfToken() {
    try {
      const getFormAddy = await this.client.get("https://riotskateshop.fr/adresse", {cookieJar: this.cookiejar});
      const csrfRegexp = /<input type="hidden" name="token" value="(.*)">/;
      const splittedPage = getFormAddy.body.split(/\r?\n/);
      splittedPage.map(line => {
        if (line.includes('<input type="hidden" name="token" value="')) {
          this.request.csrfToken = csrfRegexp.exec(line)[1];
        }
      });

      if (this.request.csrfToken) {
        console.log("CSRF token found !");
        this.setAddress();
      } else {
        console.log("CSRF token not found");
      }
    } catch (e) {
      console.log("Error getting CSRF token");
    }
  }

  async setAddress() {
    try {
      console.log("Setting new address..");
      await this.client.get("https://riotskateshop.fr/adresse", {
        cookieJar: this.cookiejar,
        searchParams: {
          id_address: 0,
          token: this.request.csrfToken,
          firstname: this.identity.firstname,
          lastname: this.identity.lastname,
          address1: this.identity.address,
          address2: this.identity.subAddress,
          postcode: this.identity.postcode,
          city: this.identity.city,
          id_country: 8, //TODO FR only (FR = 8)
          phone: this.identity.phone,
          submitAddress: 1
        }
      });
      console.log("Setted new address successfully");
    } catch (e) {
      console.log("Error setting new address");
    }
  }
}
