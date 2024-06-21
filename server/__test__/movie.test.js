const request = require("supertest");
const app = require("../app");
const { User, Movie } = require("../models");

const { sequelize } = require("../models");
const { queryInterface } = sequelize;
const { hashPassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");

let access_token_user1;

const newMovie = {
  id: 1,
  UserId: 2,
  MovieId: "tmdb-150540",
  updatedAt: "2024-06-21T03:13:22.535Z",
  createdAt: "2024-06-21T03:13:22.535Z",
};

const updated = {
  isNowShowing: true,
};

describe("POST /mymovies/:movieId", () => {
  describe("Success", () => {
    test("Berhasil membuat entitas utama", async () => {
      const { status, body } = await request(app)
        .post("/mymovies/:movieId")
        .set("Authorization", `Bearer ${access_token_user1}`)
        .send(newMovie);

      expect(status).toBe(201);
      expect(body).toBeInstanceOf(Object);
      expect(body).toHaveProperty("id", expect.any(Number));
      expect(body).toHaveProperty("UserId", expect.any(Number));
      expect(body).toHaveProperty("MovieId", newMovie.MovieId);
    });
  });
  describe("Fail", () => {
    test("Gagal Karena belum Login", async () => {
      const { status, body } = await request(app)
        .post("/mymovies/:movieId")
        .send(newMovie);

      expect(status).toBe(401);
      expect(body).toHaveProperty("message", "Invalid token");
    });
    test("Gagal Karena token invalid", async () => {
      const { status, body } = await request(app)
        .post("/mymovies/:movieId")
        .set("Authorization", `Bearer 1230123123asdoa`)
        .send(newMovie);

      expect(status).toBe(401);
      expect(body).toHaveProperty("message", "Invalid token");
    });
  });
});

describe("PUT /mymovies/:id", () => {
  describe("Success", () => {
    test("Berhasil mengupdate data Entitas Utama berdasarkan params id", async () => {
      const { status, body } = await request(app)
        .put("/mymovies/1")
        .set("Authorization", `Bearer ${access_token_user1}`)
        .send(updated);

      expect(status).toBe(200);
    });
  });
  describe("Fail", () => {
    test("Gagal menjalankan fitur Karena belum Login", async () => {
      const { status, body } = await request(app)
        .put("/mymovies/1")
        .send(updated);

      expect(status).toBe(401);
      expect(body).toHaveProperty("message", "Invalid token");
    });
    test("Gagal menjalankan karena token invalid", async () => {
      const { status, body } = await request(app)
        .put("/mymovies/1")
        .set("Authorization", `Bearer awdaowkd10dkwakodwa`)
        .send(updated);

      expect(status).toBe(401);
      expect(body).toHaveProperty("message", "Invalid token");
    });
    test("Gagal menjalankan karena id tidak terdapat di database", async () => {
      const { status, body } = await request(app)
        .put("/mymovies/1239")
        .set("Authorization", `Bearer ${access_token_user1}`)
        .send(updated);

      expect(status).toBe(404);
      expect(body).toHaveProperty("message", "Movie not found");
    });
  });
});
describe("DELETE /mymovies/:id", () => {
  describe("Success", () => {
    test("Berhasil menghapus data Entitas Utama berdasarkan Id", async () => {
      const { status, body } = await request(app)
        .delete("/mymovies/1")
        .set("Authorization", `Bearer ${access_token_user1}`);

      expect(status).toBe(200);
    });
  });
  describe("FAIL", () => {
    test("Gagal menjalankan fitur karena belum login", async () => {
      const { status, body } = await request(app).delete("/mymovies/1");

      expect(status).toBe(401);
      expect(body).toHaveProperty("message", "Invalid token");
    });
    test("Gagal menjalankan fitur karena invalid token", async () => {
      const { status, body } = await request(app)
        .delete("/mymovies/1")
        .set("Authorization", `Bearer 1203kdadaowdk`);

      expect(status).toBe(401);
      expect(body).toHaveProperty("message", "Invalid token");
    });
    test("Gagal karena id tidak terdapat di database", async () => {
      const { status, body } = await request(app)
        .delete("/mymovies/12312312")
        .set("Authorization", `Bearer ${access_token_user1}`);

      expect(status).toBe(404);
      expect(body).toHaveProperty("message", "Movie not found");
    });
    test("Gagal menghapus id karena bukan miliknya", async () => {
      const { status, body } = await request(app)
        .delete("/mymovies/1")
        .set("Authorization", `Bearer`);
    });
  });
});

beforeAll(async () => {
  const users = require("../seeders/users.json").map((el) => {
    el.createdAt = new Date();
    el.updatedAt = new Date();

    el.password = hashPassword(el.password);

    return el;
  });

  await queryInterface.bulkInsert("Users", users);

  const user = await User.findOne({
    where: {
      email: users[0].email,
    },
  });
  access_token_user1 = signToken({ id: user.id });
});

afterAll(async () => {
  await queryInterface.bulkDelete("Users", null, {
    truncate: true,
    restartIdentity: true,
    cascade: true,
  });
});
