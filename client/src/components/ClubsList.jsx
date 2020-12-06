import React from "react";

const ClubsList = (props) => {
  const { clubs, onClubNameChange, onVoteClick, onDeleteClubClick } = props;

  const renderRow = (club) => (
    <tr key={club.id}>
      <td>
        <button
          className="btn btn-primary"
          onClick={() => {
            onVoteClick(club.id);
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
            onClubNameChange(event, club.id);
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
            onDeleteClubClick(club.id);
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
