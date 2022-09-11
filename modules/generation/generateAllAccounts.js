import generateAccount from "./generateAccount.js";

export default function () {
  //TODO get tasks from csv
  let tasksNumber = 50;
  let task = {};

  for (let i = 0; i < tasksNumber; i++) {
    console.log("Started generation task number " + i);
    generateAccount(task);
  }
}
