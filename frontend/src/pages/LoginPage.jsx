import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import API from "../axios";
import Alert from "react-bootstrap/Alert";
import { useState } from "react";
import userstate from "../store/UserState";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();
    let data = new FormData(e.target);
    try {
      let res = await API.submitForm({
        url: "user/login",
        formdata: data,
      });
      userstate.login(res.data);
      navigate("/tasklist");
    } catch (err) {
      if (err.response.status === 401) {
        setAlert("Неверный логин и/или пароль");
      }
    }
  }
  const [alert, setAlert] = useState("");
  return (
    <>
      <Alert show={alert !== ""} variant="danger">
        {alert}
      </Alert>
      <Form className="w-25 mx-auto" onSubmit={handleSubmit}>
        <Form.Group className="mb-2">
          <Form.Label>Логин</Form.Label>
          <Form.Control
            id="username"
            name="username"
            type="text"
            placeholder="Введите логин"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Пароль</Form.Label>
          <Form.Control
            id="password"
            name="password"
            type="password"
            placeholder="Введите пароль"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Войти
        </Button>
      </Form>
    </>
  );
}
