import { useState } from "react";

const ClubForm = ({ onSubmit }) => {
  const [name, setName] = useState("");
  return (
    <>
      <h3>Add club</h3>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit(name);
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
