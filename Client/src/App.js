import Login from "./Components/Login";
import "bootstrap/dist/css/bootstrap.min.css"
import { Container } from "react-bootstrap";
import Home from "./Components/Home";

const code = new URLSearchParams(window.location.search).get("code")

function App() {
  return (
    <Container>
      {
        code ?
          <Home code={code} />
          :
          <Login />
      }

    </Container>
  );
}

export default App;
