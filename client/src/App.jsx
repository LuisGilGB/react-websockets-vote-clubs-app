import { useContext, useEffect, useState } from "react";
import ClubForm from "./components/ClubForm";
import ClubsList from "./components/ClubsList";
import { SocketContext } from "./context/SocketContext";

const App = () => {
  const [clubs, setClubs] = useState([]);
  const { socket, online } = useContext(SocketContext);

  useEffect(() => {
    socket.on("clubs-update", ({ payload }) => {
      setClubs(payload);
    });
  }, [socket]);

  const emitNameChange = (event, clubId) => {
    socket.emit("club-name-change", {
      payload: {
        clubId,
        newName: event.target.value,
      },
    });
  };

  const addVote = (clubId) => {
    socket.emit("club-add-vote", {
      payload: {
        clubId,
      },
    });
  };

  const deleteClub = (clubId) => {
    socket.emit("delete-club", {
      payload: {
        clubId,
      },
    });
  };

  const createClub = (name) => {
    socket.emit("create-club", {
      payload: {
        name,
      },
    });
  };

  return (
    <div className="app container">
      <div className="alert">
        <p>
          Service status:
          {online ? (
            <span className="text-success">Online</span>
          ) : (
            <span className="text-danger">Offline</span>
          )}
        </p>
      </div>
      <h1>Club names</h1>
      <hr />
      <div className="row">
        <div className="col-8">
          <ClubsList
            clubs={clubs}
            onClubNameChange={emitNameChange}
            onVoteClick={addVote}
            onDeleteClubClick={deleteClub}
          />
        </div>
        <div className="col-4">
          <ClubForm onSubmit={createClub} />
        </div>
      </div>
    </div>
  );
};

export default App;
