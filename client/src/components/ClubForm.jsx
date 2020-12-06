import { useContext, useState } from "react";
import { SocketContext } from "../context/SocketContext";

const ClubForm = () => {
  const [name, setName] = useState("");
  const { socket } = useContext(SocketContext);

  const createClub = (name) => {
    socket.emit("create-club", {
      payload: {
        name,
      },
    });
  };

  return (
    <>
      <h3>Add club</h3>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          createClub(name);
        }}
      >
        <input
          className="form-control"
          placeholder="New club name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </form>
    </>
  );
};

export default ClubForm;
