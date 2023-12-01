const app = require("../app");
const request = require("supertest");

const token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0b21lcklkIjoiNjI5ZDhhZjNlYmVlYTJhYjY1MTMyZTBjIiwiaWF0IjoxNjU4OTAyNDIzfQ.oGj3uhu5r1nrfwIgtWDn6I6Pf_cX1bhTbuuzwlDvo7M";

//  Customer Login Test
describe("POST /customer/login", function () {
  it("Login Customer Test", function (done) {
    request(app)
      .post("/customer/login")
      .send({ username: "naruto09", password: "uzumaki09" })
      .expect("Content-Type", /json/)
      .expect(201, done);
  });
});

//  Customer Get Test
describe("GET /customer/dashboard", function () {
  it("Profile Customer Test", function (done) {
    request(app)
      .get("/customer/dashboard")
      .set("Authorization", token)
      .expect("Content-Type", /json/)
      .expect(201, done);
  });
});

//  Customer Update Test
describe("PUT /customer/update", function () {
  it("Profile Update Customer Test", function (done) {
    request(app)
      .put("/customer/update")
      .set("Authorization", token)
      .send({
        full_name: "Rijwol",
        address: "Banepa, Chardobato",
        contact_no: "9861815782",
        gender: "Male",
        email: "shakyarijwol19@gamil.com"
      })
      .expect("Content-Type", /json/)
      .expect(201, done);
  });
});

// Cart Insert Test
describe("POST /cart/insert", function () {
    it("Cart Insert Test", function (done) {
      request(app)
        .post("/cart/insert")
        .set("Authorization", token)
        .send({ guitar_id: "62d9515df6ae0884a47453af", quantity: 5 })
        .expect("Content-Type", /json/)
        .expect(201, done);
    });
});

// Cart Get Test
describe("GET /cart/get", function () {
    it("Profile Customer Test", function (done) {
      request(app)
        .get("/cart/get")
        .set("Authorization", token)
        .expect("Content-Type", /json/)
        .expect(201, done);
    });
});


//  Wishlist Insert Test
describe("POST /wishlist/insert", function () {
  it("Wishlist Insert Test", function (done) {
    request(app)
      .post("/wishlist/insert")
      .set("Authorization", token)
      .send({ guitar_id: "62d9515df6ae0884a47453af"})
      .expect("Content-Type", /json/)
      .expect(201, done);
  });
});

// Wishlist Get Test
describe("GET /wishlist/get", function () {
  it("Wishlist Customer Test", function (done) {
    request(app)
      .get("/wishlist/get")
      .set("Authorization", token)
      .expect("Content-Type", /json/)
      .expect(201, done);
  });
});

// Blog Get Test
describe("GET /blog/get", function () {
  it("Wishlist Customer Test", function (done) {
    request(app)
      .get("/blog/get")
      .set("Authorization", token)
      .expect("Content-Type", /json/)
      .expect(201, done);
  });
});


// Guitar Category Get Test
describe("GET /guitarcategory/get", function () {
  it("GuitarCategory Test", function (done) {
    request(app)
      .get("/guitarcategory/get")
      .set("Authorization", token)
      .expect("Content-Type", /json/)
      .expect(201, done);
  });
});

// Guitar Get Test
describe("GET /guitar/get", function () {
  it("Guitar Get Test", function (done) {
    request(app)
      .get("/guitar/get")
      .set("Authorization", token)
      .expect("Content-Type", /json/)
      .expect(201, done);
  });
});


// Order Get Test
describe("GET /order/get", function () {
  it("Order Get Test", function (done) {
    request(app)
      .get("/order/get")
      .set("Authorization", token)
      .expect("Content-Type", /json/)
      .expect(201, done);
  });
});




