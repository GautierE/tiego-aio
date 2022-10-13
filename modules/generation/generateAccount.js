import got from "got";
import tough from "tough-cookie";

export default async function (task) {
  const cookiejar = new tough.CookieJar();
  const client = got.extend({cookieJar: cookiejar});

  await client.get("https://riotskateshop.fr/");
  console.log(cookiejar.getCookies("https://riotskateshop.fr/"));
}
