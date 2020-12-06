import { useContext, useEffect, useState } from "react";
import ClubForm from "./components/ClubForm";
import ClubsChart from "./components/ClubsChart";
import ClubsList from "./components/ClubsList";
import { SocketContext } from "./context/SocketContext";

const Home = () => {
  const [clubs, setClubs] = useState([]);
  const { socket, online } = useContext(SocketContext);

  useEffect(() => {
    socket.on("clubs-update", ({ payload }) => {
      setClubs(payload);
    });
    return () => socket.off("clubs-update");
  }, [socket]);

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
        <div className="col">
          <ClubsChart clubs={clubs} />
        </div>
      </div>
      <div className="row">
        <div className="col-8">
          <ClubsList clubs={clubs} />
        </div>
        <div className="col-4">
          <ClubForm />
        </div>
      </div>
    </div>
  );
};

export default Home;
