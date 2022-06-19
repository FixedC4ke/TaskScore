import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

export default function LoginPage(){
    return(
        <Row className="justify-content-center">
            <Col>
            <Form>
            <Form.Group controlId="username">
                <Form.Label>Логин</Form.Label>
                <Form.Control type="text" placeholder="Введите логин"/>
            </Form.Group>
        </Form>

            </Col>
        </Row>
    )
}