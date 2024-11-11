import React from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useAppDispatch } from '../../../shared/lib/hooks';
import { sendProductFormThunk } from '../model/productThunks';

function AddProductForm(): JSX.Element {
  //   const { submitHandler } = useProducts();
  const dispatch = useAppDispatch();
  console.log('Form render');
  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        void dispatch(sendProductFormThunk(new FormData(e.currentTarget)));
      }}
    >
      <Form.Group className="mb-3" controlId="prod-title">
        <Form.Label>Название</Form.Label>
        <Form.Control name="title" type="text" placeholder="Название товара" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="prod-desc">
        <Form.Label>Описание</Form.Label>
        <Form.Control
          name="description"
          as="textarea"
          rows={3}
          placeholder="Название товара"
        />
      </Form.Group>
      <Row>
        <Col xs={2}>
          <Form.Group className="mb-3" controlId="prod-price">
            <Form.Label>Цена</Form.Label>
            <Form.Control name="price" type="number" placeholder="Цена" />
          </Form.Group>
        </Col>
        <Col xs={8}>
          <Form.Group className="mb-3" controlId="prod-imd">
            <Form.Label>Картинка</Form.Label>
            <Form.Control name="image" type="text" placeholder="http://..." />
          </Form.Group>
        </Col>
        <Col xs={2}>
          <Button type="submit">Добавить</Button>
        </Col>
      </Row>
    </Form>
  );
}

export default React.memo(AddProductForm);
