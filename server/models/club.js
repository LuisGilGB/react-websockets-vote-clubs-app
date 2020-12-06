const { v4: uuidV4 } = require("uuid");

class Club {
  constructor(name) {
    this.id = uuidV4();
    this.name = name;
    this.votes = 0;
  }

  setName(name) {
    this.name = name;
  }

  incrementVote() {
    this.votes++;
  }
}

module.exports = Club;
