import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function RegisterPage() {
  return (
    <Form className="w-25 mx-auto">
      <Form.Group controlId="username" className="mb-2">
        <Form.Label>Логин</Form.Label>
        <Form.Control type="text" placeholder="Введите логин" />
      </Form.Group>
      <Form.Group controlId="password" className="mb-2">
        <Form.Label>Пароль</Form.Label>
        <Form.Control type="password" placeholder="Введите пароль" />
      </Form.Group>
      <Form.Group controlId="passwordconf" className="mb-2">
        <Form.Label>Повторите пароль</Form.Label>
        <Form.Control type="password" placeholder="Введите пароль еще раз" />
      </Form.Group>
      <Form.Group controlId="role" className="mb-3">
        <Form.Label>Роль</Form.Label>
        <Form.Select>
            <option>Выберите роль</option>
            <option value={1}>Заказчик</option>
            <option value={2}>Исполнитель</option>
        </Form.Select>
      </Form.Group>
      <Button variant="primary" type="submit">
        Зарегистрироваться
      </Button>
    </Form>
  );
}
