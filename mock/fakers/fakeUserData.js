const { faker } = require("@faker-js/faker");

module.exports = (number) => {
  const users = [];
  while (number >= 0) {
    let user = {
      _id: faker.database.mongodbObjectId(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      state: faker.address.state(),
      marital_status: faker.helpers.arrayElement(["Married", "Single"]),
      birthday: faker.date.past(),
      chapter: faker.helpers.arrayElement(["Abuja", "Enugu", "Abia", "Rivers", "Kaduna", "Lagos", "Diaspora"]),
      regularized_at: faker.date.past(),
      isRegularized: faker.datatype.boolean(),
      choir_part: faker.helpers.arrayElement(["soprano", "alto", "tenor", "bass"]),
      home_church: {
        parish_name: faker.random.words(),
        demonination: faker.helpers.arrayElement(["Catholic", "Others"]),
        state: faker.address.state(),
        country: faker.address.country(),
      },
      isAdmin: faker.datatype.boolean(),
      isCurrent: faker.datatype.boolean(),
      campus: faker.helpers.arrayElement(["Elele", "Akpugo", "Okija"]),
      graduated_at: faker.date.past(),
    };

    // optional picture may not always have a link
    let avatar = faker.helpers.maybe(() => faker.image.avatar(), { probability: 0.4 });
    user.profile_image = avatar ? avatar : null;
    // optional phone
    let phone = faker.helpers.maybe(() => faker.phone.number("234#0########"), { probability: 0.2 });
    user.phone_number = phone ? phone : null;

    // check for isRegularized in order to set isAdmin
    if (!user.isRegularized) user.isAdmin = false;
    else user.isAdmin = faker.datatype.boolean();

    users.push(user);
    // decrease the counter
    number--;
  }
  return users;
};
