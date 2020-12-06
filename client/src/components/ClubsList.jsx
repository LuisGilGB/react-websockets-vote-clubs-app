import React, { useContext } from "react";
import { SocketContext } from "../context/SocketContext";

const ClubsList = (props) => {
  const { clubs } = props;
  const { socket } = useContext(SocketContext);

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

  const renderRow = (club) => (
    <tr key={club.id}>
      <td>
        <button
          className="btn btn-primary"
          onClick={() => {
            addVote(club.id);
          }}
        >
          +1
        </button>
      </td>
      <td>
        <input
          className="form-control"
          type="text"
          value={club.name}
          onChange={(event) => {
            emitNameChange(event, club.id);
          }}
        />
      </td>
      <td>
        <h3>{club.votes}</h3>
      </td>
      <td>
        <button
          className="btn btn-danger"
          onClick={() => {
            deleteClub(club.id);
          }}
        >
          Delete
        </button>
      </td>
    </tr>
  );

  return (
    <table className="table">
      <thead>
        <tr>
          <th></th>
          <th>Name</th>
          <th>Votes</th>
          <th></th>
        </tr>
      </thead>
      <tbody>{clubs.map(renderRow)}</tbody>
    </table>
  );
};

export default ClubsList;
