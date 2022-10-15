import Task from "./Task.js";
import TaskInfo from "../../class/TaskInfo.js";
import fs from "fs";
import {parse} from "csv-parse";

export default async function () {
  let tasks = await readTasksFromCsv();
  for (let i = 0; i < tasks.length; i++) {
    console.log("Started task number " + i);
    new Task(tasks[i]);
  }
}

async function readTasksFromCsv() {
  return new Promise(function (resolve, reject) {
    let res = [];

    fs.createReadStream("./riotSkateShop/tasks.csv").pipe(parse({delimiter: ",", from_line: 2})).on("data", function (row) {
      res.push(new TaskInfo(row));
    }).on("end", () => {
      console.log("CSV file successfully processed");
      resolve(res);
    }).on("error", reject);
  });
}
