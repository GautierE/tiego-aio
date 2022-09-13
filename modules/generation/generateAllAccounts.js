import generateAccount from "./generateAccount.js";
import GenerationTask from "../../class/GenerationTask.js";
import fs from "fs";
import {parse} from "csv-parse";
import {rejects} from "assert";

export default async function () {
  let tasks = await readAccountsFromCsv();
  for (let i = 0; i < tasks.length; i++) {
    console.log("Started generation task number " + i);
    generateAccount();
  }
}

async function readAccountsFromCsv() {
  return new Promise(function (resolve, reject) {
    let res = [];

    fs.createReadStream("./riotSkateShop/accounts.csv").pipe(parse({delimiter: ",", from_line: 2})).on("data", function (row) {
      res.push(new GenerationTask(row));
    }).on("end", () => {
      console.log("CSV file successfully processed");
      resolve(res);
    }).on("error", reject);
  });
}
