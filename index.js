import inquirer from "inquirer";
import startAllTasks from "./tasks/startAllTasks.js";
import generateAllAccounts from "./generate/generateAllAccounts.js";
import showSettingsMenu from "./settings/showSettingsMenu.js";

console.log("Welcome back Tiego#2953");

inquirer.prompt([
  {
    type: "list",
    name: "menu",
    message: "What do you want to do?",
    choices: [
      {
        name: "Start tasks",
        value: "tasks"
      },
      new inquirer.Separator(), {
        name: "Generate accounts",
        value: "generate"
      },
      new inquirer.Separator(), {
        name: "Settings",
        value: "settings"
      }
    ]
  }
]).then(answers => {
  switch (answers.menu) {
    case "tasks":
      startAllTasks();
      break;
    case "generate":
      generateAllAccounts();
      break;
    case "settings":
      showSettingsMenu();
      break;
  }
});
