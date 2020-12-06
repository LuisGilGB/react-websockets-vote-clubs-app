const ClubsList = require("./clubs-list");

class Sockets {
  constructor(io) {
    this.io = io;
    this.clubsList = new ClubsList();

    this.socketEvents();
  }

  addListenerWithUpdate(socket, event, callback) {
    socket.on(event, (data) => {
      callback(data);

      this.io.emit("clubs-update", {
        payload: this.clubsList.getClubs(),
      });
    });
  }

  socketEvents() {
    // On connection
    this.io.on("connection", (socket) => {
      socket.emit("welcome-from-server", {
        msg: "Welcome from the server",
      });

      socket.emit("clubs-update", {
        payload: this.clubsList.getClubs(),
      });

      this.addListenerWithUpdate(socket, "club-name-change", ({ payload }) => {
        this.clubsList.updateClubName(payload.clubId, payload.newName);
      });

      this.addListenerWithUpdate(socket, "club-add-vote", ({ payload }) => {
        this.clubsList.findClub(payload.clubId).incrementVote();
      });

      this.addListenerWithUpdate(socket, "delete-club", ({ payload }) => {
        this.clubsList.deleteClub(payload.clubId);
      });

      this.addListenerWithUpdate(socket, "create-club", ({ payload }) => {
        this.clubsList.addClub(payload.name);
      });
    });
  }
}

module.exports = Sockets;
