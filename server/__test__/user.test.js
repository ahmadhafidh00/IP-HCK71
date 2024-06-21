const request = require("supertest");
const app = require("../app");

const { sequelize } = require("../models");
const { hashPassword } = require("../helpers/bcrypt");
const { queryInterface } = sequelize;

const user1 = {
  name: "Angga",
  email: "user1@mail.com",
  password: "user1",
};
const failLogin1 = {
  password: "111111",
};
const failLogin2 = {
  email: "salah@mail.com",
};
const failLogin3 = {
  email: "user3@mail.com",
  password: "user3",
};
const failLogin4 = {
  email: "user1",
  password: "12345",
};

describe("POST /login", () => {
  describe("Success", () => {
    test("Berhasil login dan mengirim token", async () => {
      const { status, body } = await request(app).post("/login").send(user1);

      expect(status).toBe(200);
      expect(body).toHaveProperty("access_token", expect.any(String));
    });
  });
  describe("Fail", () => {
    test("Email tidak diberikan", async () => {
      const { status, body } = await request(app)
        .post("/login")
        .send(failLogin1);

      expect(status).toBe(400);
      expect(body).toHaveProperty("message", "Email is required");
    });

    test("Password tidak diberikan", async () => {
      const { status, body } = await request(app)
        .post("/login")
        .send(failLogin2);

      expect(status).toBe(400);
      expect(body).toHaveProperty("message", "Password is required");
    });
    test("Email diberikan invalid", async () => {
      const { status, body } = await request(app)
        .post("/login")
        .send(failLogin3);

      expect(status).toBe(401);
      expect(body).toHaveProperty("message", "Invalid email/password");
    });
    test("Password diberikan invalid", async () => {
      const { status, body } = await request(app)
        .post("/login")
        .send(failLogin4);

      expect(status).toBe(401);
      expect(body).toHaveProperty("message", "Invalid email/password");
    });
  });
});

beforeAll(async () => {
  await queryInterface.bulkInsert(
    "Users",
    [
      {
        ...user1,
        password: hashPassword(user1.password),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {}
  );
});

afterAll(async () => {
  await queryInterface.bulkDelete("Users", null, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
});
