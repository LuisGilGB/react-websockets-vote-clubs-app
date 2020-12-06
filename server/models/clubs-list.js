const Club = require("./club");

class ClubsList {
  constructor() {
    this.clubs = [
      new Club("Mérida AD"),
      new Club("Real Madrid"),
      new Club("Extremadura UD"),
      new Club("Betis"),
    ];
  }

  addClub(name) {
    this.clubs.push(new Club(name));
  }

  getClubs() {
    return this.clubs;
  }

  findClub(id) {
    return this.clubs.find((club) => club.id === id);
  }

  incrementVoteTo(id) {
    this.findClub(id).incrementVote();
  }

  updateClubName(id, newName) {
    this.findClub(id).setName(newName);
  }

  deleteClub(id) {
    this.clubs = this.clubs.filter((club) => club.id !== id);
  }
}

module.exports = ClubsList;
