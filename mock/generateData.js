const chalk = require("chalk");
const { readFile, existsSync, writeFile } = require("fs");
const fakeUsersData = require('./fakers/fakeUserData');

const generateData = (path_to_file, options) => {
  const { users_number = 10 } = options;

  if (existsSync(path_to_file)) {
    readFile(path_to_file, { encoding: "utf8" }, (err, data) => {
      if (!err) {
        let fileData = JSON.parse(data);
        // call fakerUsersData for each top-level resource as a property
        fileData.users = fakeUsersData(users_number);

        // write the data back to file
        writeFile(path_to_file, JSON.stringify(fileData), (err) => {
          return err ? console.log(chalk.red(err)) : console.log(chalk.green("File updated and written to"));
        });
      }else{
        console.log(chalk.red(`File Reading Error: ${err}`));
        return;
      }
    });
  } else {
    let data = {
      // add property and call fakerUsersData from each top-level resource
      users: fakeUsersData(users_number)
    }

    writeFile(path_to_file, JSON.stringify(data), (err) => {
      return err ? console.log(chalk.red(err)) : console.log(chalk.green("File Created and written to"));
    });
  }
};

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
let randomNumber_1 = getRandomInt(4, 15);

generateData("./mock/db.json", { users_number: randomNumber_1 });
