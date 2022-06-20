import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import API from "../axios";
import Alert from "react-bootstrap/Alert";
import { useState } from "react";
import userstate from "../store/UserState";

export default function RegisterPage() {
  const [alert, setAlert] = useState("");
  async function submitHandler(e) {
    e.preventDefault();
    try {
      let res = await API.submitForm({
        url: "user/register",
        formdata: new FormData(e.target),
      });
      userstate.login(res.data);
    } catch (err) {
      if (err.response.status === 409) {
        setAlert(err.response.data.error);
      }
    }
  }
  return (
    <>
      <Alert show={alert !== ""} variant="danger">
        {alert}
      </Alert>
      <Form className="w-25 mx-auto" onSubmit={submitHandler}>
        <Form.Group className="mb-2">
          <Form.Label>Логин</Form.Label>
          <Form.Control
            name="username"
            type="text"
            placeholder="Введите логин"
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Пароль</Form.Label>
          <Form.Control
            name="password"
            type="password"
            placeholder="Введите пароль"
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Повторите пароль</Form.Label>
          <Form.Control type="password" placeholder="Введите пароль еще раз" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Роль</Form.Label>
          <Form.Select name="role">
            <option>Выберите роль</option>
            <option value={1}>Заказчик</option>
            <option value={2}>Исполнитель</option>
          </Form.Select>
        </Form.Group>
        <Button variant="primary" type="submit">
          Зарегистрироваться
        </Button>
      </Form>
    </>
  );
}
