import { Container, Navbar, Button } from "react-bootstrap";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import TasklistPage from "./pages/TasklistPage";
import "./App.css";
import userstate from "./store/UserState";
import { observer } from "mobx-react-lite";

const ConditionalLoginBtns = observer(() => {
  const navigate = useNavigate();
  if (userstate.token === "") {
    return (
      <Navbar.Collapse className="justify-content-end">
        <Link to="/register" className="btn-margin-right">
          <Button variant="success">Зарегистрироваться</Button>
        </Link>
        <Link to="/login">
          <Button variant="secondary">Войти</Button>
        </Link>
      </Navbar.Collapse>
    );
  } else {
    return (
      <Navbar.Collapse className="justify-content-end">
        <Button
          variant="secondary"
          onClick={() => {
            userstate.logout();
            navigate("/");
          }}
        >
          Выйти
        </Button>
      </Navbar.Collapse>
    );
  }
});

function App() {
  return (
    <BrowserRouter>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Link to="/">
            <Navbar.Brand>TaskScore</Navbar.Brand>
          </Link>
          <Navbar.Toggle />
          <ConditionalLoginBtns />
        </Container>
      </Navbar>
      <Container className="mt-5">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/tasklist" element={<TasklistPage />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
