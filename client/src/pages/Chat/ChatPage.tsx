import React, { useContext } from 'react';
import {
  Container,
  Row,
  Col,
  ListGroup,
  Form,
  Button,
  InputGroup,
} from 'react-bootstrap';
import ChatMessage from '../../features/chat/ui/ChatMessage';
import { useAppSelector } from '../../shared/lib/hooks';
import ChatwsContext from '../../app/providers/chatws/chatwsContext';

export default function ChatPage(): JSX.Element {
  const messages = useAppSelector(store => store.chat.messages)
  const { sendData } = useContext(ChatwsContext);
  const users = useAppSelector((store) => store.chat.users);
  return (
    <Container fluid>
      <Row className="vh-100">
        {/* Список пользователей */}
        <Col
          md={3}
          className="bg-light border-end"
          style={{ maxHeight: '50vh', overflowY: 'auto' }}
        >
          <h5 className="p-3">Пользователи</h5>
          <ListGroup variant="flush">
            {users.map((el) => (
              <ListGroup.Item key={el.id}>{el.name}</ListGroup.Item>
            ))}
          </ListGroup>
        </Col>

        {/* Окно чата */}
        <Col md={9} className="d-flex flex-column">
          <div
            className="flex-grow-1 p-3"
            style={{ maxHeight: '50vh', overflowY: 'auto' }}
          >
            <div className="d-flex flex-column">
              {messages.map((msg) => (
                <ChatMessage key={msg.id} message={msg} />
              ))}
            </div>
          </div>

          {/* Поле ввода и кнопка отправки */}
          <Form
            className="p-3 border-top"
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const text = formData.get('text');
              if (!text || typeof text !== 'string') return console.log('Error');
              sendData(text);
              return e.currentTarget.reset();
            }}
          >
            <InputGroup>
              <Form.Control
                name="text"
                type="text"
                placeholder="Введите сообщение..."
                aria-label="Введите сообщение"
              />
              <Button variant="primary" type="submit">
                Отправить
              </Button>
            </InputGroup>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
