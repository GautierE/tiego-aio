import got from "got";
import tough from "tough-cookie";
import Functionality from "../../class/Functionality.js";

export default class extends Functionality {
  constructor(task) {
    super();
    this.taskDetails = task;
    this.cookiejar = new tough.CookieJar();
    this.client = got.extend({cookieJar: this.cookiejar});
    this.request = {};

    this.login();
  }

  async login() {
    try {
      console.log("Logging in..");
      await this.client.post("https://riotskateshop.fr/connexion", {
        cookieJar: this.cookiejar,
        searchParams: {
          back: "my-account",
          email: this.taskDetails.email,
          password: this.taskDetails.password,
          submitLogin: 1
        }
      });
      console.log("Logged in successfully");
      this.getProduct();
    } catch (e) {
      console.log(e);
      console.log("Login error");
    }
  }

  async getProduct() {
    try {
      const csrfRegexp = /<input type="hidden" name="token" value="(.*)">/;
      const productIdRegexp = /<input type="hidden" name="id_product" value="(.*)" id="product_page_product_id">/;
      const customizationRegexp = /<input type="hidden" name="id_customization" value="(.*)" id="product_customization_id">/;

      const getProduct = await this.client.get(this.taskDetails.productLink, {cookieJar: this.cookiejar});
      const splittedPage = getProduct.body.split(/\r?\n/);

      splittedPage.map((line, index) => {
        if (line.includes('<input type="hidden" name="token" value="')) {
          this.request.csrfToken = csrfRegexp.exec(line)[1];
          this.request.productId = productIdRegexp.exec(splittedPage[index + 1])[1];
          this.request.customizationId = customizationRegexp.exec(splittedPage[index + 2])[1];
        }
      });
      if (this.request.csrfToken && this.request.productId && this.request.customizationId) {
        console.log("Product found !");
        this.addToCart();
      } else {
        console.log("Product not found");
      }
    } catch (e) {
      console.log(e);
      console.log("Error getting product");
    }
  }

  async addToCart() {
    try {
      console.log("Adding to cart..");
      await this.client.post("https://riotskateshop.fr/panier", {
        cookieJar: this.cookiejar,
        searchParams: {
          token: this.request.csrfToken,
          id_product: this.request.productId,
          id_customization: this.request.customizationId,
          "group[11]": 110, //TODO handle sizing
          qty: 1,
          add: 1,
          action: "update"
        }
      });
      console.log("Product added to cart");
      this.checkout();
    } catch (e) {
      console.log("Error adding to cart");
    }
  }

  async checkout() {
    let ppToken = null;
    try {
      console.log("Checking out..");
      await this.client.get("https://riotskateshop.fr/module/paypal/ecInit", {
        cookieJar: this.cookiejar,
        searchParams: {
          credit_card: 0,
          getToken: 1
        },
        parseJson: res => (ppToken = JSON.parse(res).token)
      }).json();

      console.log("Successful checkout !");

      if (ppToken) {
        const params = {
          username: "TiegoesBRRRRRRRR",
          avatar_url: "",
          content: `Succesful checkout !!\nPaypal link: https://www.paypal.com/checkoutnow?token=${ppToken}`
        };
        //Add webhook
        await this.client.post("", {
          cookieJar: this.cookiejar,
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify(params)
        });
      }
    } catch (e) {
      console.log("Error during checkout");
    }
  }
}
