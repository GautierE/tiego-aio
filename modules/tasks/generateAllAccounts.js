import GenerateAccount from "../generation/GenerateAccout.js";
import GenerationTaskInfo from "../../class/GenerationTaskInfo.js";
import fs from "fs";
import {parse} from "csv-parse";

export default async function () {
  let tasks = await readAccountsFromCsv();
  for (let i = 0; i < tasks.length; i++) {
    console.log("Started generation task number " + i);
    new GenerateAccount(tasks[i]);
  }
}

async function readAccountsFromCsv() {
  return new Promise(function (resolve, reject) {
    let res = [];

    fs.createReadStream("./riotSkateShop/accounts.csv").pipe(parse({delimiter: ",", from_line: 2})).on("data", function (row) {
      res.push(new GenerationTaskInfo(row));
    }).on("end", () => {
      console.log("CSV file successfully processed");
      resolve(res);
    }).on("error", reject);
  });
}
