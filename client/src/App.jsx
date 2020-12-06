import { SocketProvider } from "./context/SocketContext";
import Home from "./Home";

const App = () => (
  <SocketProvider>
    <Home />
  </SocketProvider>
);

export default App;
