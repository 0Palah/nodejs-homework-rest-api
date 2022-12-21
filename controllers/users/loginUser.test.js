require("dotenv").config();

const app = require("../../app");
const mongoose = require("mongoose");
const User = require("../../models/users");
const request = require("supertest");

const { DB_TEST_HOST, PORT } = process.env;

describe("test users routes", () => {
  let server;

  beforeAll(async () => {
    server = app.listen(PORT);
    await mongoose.connect(DB_TEST_HOST);
  });

  afterAll(() => {
    server.close();
    mongoose.disconnect();
  });

  //1.Ендпоінт відповідає зі статус кодом 200 та токеном в боді
  //2. В БД успішно записався токен користувача
  test("user login successfully", async () => {
    const newUser = {
      email: "Ford@get.net",
      password: "$2a$10$BZzDU7iFB0c9xc0wNlDNsuxeeXI/1OqWTl5j6ymTAylq1P4b0Ogn6",
      subscription: "starter",
      avatarURL: "http//avatarurl.example.net",
    };

    const user = await User.create(newUser);

    const userLoginData = {
      email: "Ford@get.net",
      password: "12345678",
    };

    const response = await request(app)
      .get("/api/users/login")
      .send(userLoginData);

    expect(response.statusCode).toEqual(200);

    const { token } = response.body;

    expect(token).toEqual(expect.any(String));

    const userFromDb = await User.findById(user._id);

    expect(userFromDb.token).toEqual(token);
  });
});
