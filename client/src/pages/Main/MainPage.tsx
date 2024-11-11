import React, { useCallback, useMemo } from 'react';
import { Button, Col, Row, Spinner } from 'react-bootstrap';
import ProductCard from '../../entities/product/ui/ProductCard';
import { useAppDispatch, useAppSelector } from '../../shared/lib/hooks';
import { reverseSort, setSortKey } from '../../entities/product/model/productSlice';
import { deleteProductThunk } from '../../entities/product/model/productThunks';

export default function MainPage(): JSX.Element {
  // const { products } = useProducts();
  // const products: ProductT[] = [];
  const products = useAppSelector((store) => store.products.items);
  // const { data: products, error, isLoading } = useGetProductsQuery();
  const loading = useAppSelector((store) => store.products.loading);
  const { order, key } = useAppSelector((store) => store.products.sort);
  const sortedProducts = products?.toSorted((p1, p2) =>
    order === 'asc' ? p1[key] - p2[key] : p2[key] - p1[key],
  );
  const dispatch = useAppDispatch();
  const cardOptions = useMemo(() => ({ order, key }), [order, key]); // {}
  const handleDelete = useCallback(
    (id: number): void => void dispatch(deleteProductThunk(id)),
    [dispatch],
  );
  return (
    <Row>
      <Col xs={4}>
        <Button onClick={() => dispatch(reverseSort())}>Поменять порядок</Button>
      </Col>
      <Col xs={4}>
        <Button onClick={() => dispatch(setSortKey('price'))}>По цене</Button>
      </Col>
      <Col xs={4}>
        <Button onClick={() => dispatch(setSortKey('id'))}>По id</Button>
      </Col>
      {loading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        sortedProducts?.map((product) => (
          <Col key={product.id} xs={4}>
            <ProductCard
              product={product}
              cardOptions={cardOptions}
              handleDelete={handleDelete}
            />
          </Col>
        ))
      )}
    </Row>
  );
}
