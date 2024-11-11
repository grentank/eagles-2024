import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { Col, Row } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../../shared/lib/hooks';
import { closeProductModal } from '../model/productSlice';
import { editProductThunk, sendProductFormThunk } from '../model/productThunks';

export default function ProductModal(): JSX.Element {
  const chosenProduct = useAppSelector((store) => store.products.chosenProduct);
  const open = useAppSelector((store) => store.products.isOpenProductModal);
  const dispatch = useAppDispatch();
  const handleClose = (): void => {
    dispatch(closeProductModal());
  };
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    if (!chosenProduct) void dispatch(sendProductFormThunk(formData));
    else void dispatch(editProductThunk({ formData, id: chosenProduct.id }));
    e.currentTarget.reset();
    handleClose();
  };
  return (
    <Modal show={open} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {chosenProduct
            ? `Редактирование товара ${chosenProduct.id}`
            : 'Создание товара'}
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="prod-title">
            <Form.Label>Название</Form.Label>
            <Form.Control
              defaultValue={chosenProduct?.title || ''}
              name="title"
              type="text"
              placeholder="Название товара"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="prod-desc">
            <Form.Label>Описание</Form.Label>
            <Form.Control
              name="description"
              defaultValue={chosenProduct?.description || ''}
              as="textarea"
              rows={3}
              placeholder="Название товара"
            />
          </Form.Group>
          <Row>
            <Col xs={2}>
              <Form.Group className="mb-3" controlId="prod-price">
                <Form.Label>Цена</Form.Label>
                <Form.Control
                  defaultValue={chosenProduct?.price || ''}
                  name="price"
                  type="number"
                  placeholder="Цена"
                />
              </Form.Group>
            </Col>
            <Col xs={8}>
              <Form.Group className="mb-3" controlId="prod-imd">
                <Form.Label>Картинка</Form.Label>
                <Form.Control
                  defaultValue={chosenProduct?.image || ''}
                  name="image"
                  type="text"
                  placeholder="http://..."
                />
              </Form.Group>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit">
            {chosenProduct ? 'Сохранить' : 'Создать'}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
