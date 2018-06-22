const assert = require("assert");
const User = require("../../models/User");

describe("Creating User Records", () => {
  it("saves a user", done => {
    const joe = new User({
      firstName: "Joe",
      lastName: "Smith",
      userName: "jsmith",
      email: "jsmith@smith.com",
      location: {
        city: "SF",
        state: "CA",
        countryCode: "USA"
      },
      isTechnical: true
    });

    joe.save().then(() => {
      assert(!joe.isNew);
      done();
    });
  });
});
