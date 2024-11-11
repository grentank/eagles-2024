import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { loginThunk } from '../model/authThunks';
import { useAppDispatch } from '../../../shared/lib/hooks';

export default function LoginForm(): JSX.Element {
  const dispatch = useAppDispatch();
  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        void dispatch(loginThunk(new FormData(e.currentTarget)));
      }}
    >
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" name="email" placeholder="Email" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Пароль</Form.Label>
        <Form.Control type="password" name="password" placeholder="Пароль" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}
