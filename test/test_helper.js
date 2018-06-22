const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

// Before only runs once during test
before(done => {
  mongoose.connect("mongodb://localhost/users_test");
  mongoose.connection
    .once("open", () => {
      done();
    })
    .on("error", error => {
      console.warn("Warning", error);
    });
});

// beforeEach runs before each test suite
beforeEach(done => {
  mongoose.connection.collections.users.drop(() => {
    done();
  });
});