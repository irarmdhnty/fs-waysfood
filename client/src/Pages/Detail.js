import { useContext } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import convertRupiah from "rupiah-format";
import { useQuery } from "react-query";
import { API } from "../config/api";

import { CartContext } from "../Contexts/CartContext";
import { Food } from "../DataDummy/Food";
import { useParams } from "react-router-dom";

const Detail = () => {
  const { dataCart, setDataCart } = useContext(CartContext);
  const params = useParams();

  let { data: products } = useQuery("productCache", async () => {
    const response = await API.get(
      `/products/${params.id ? params.id : user.id}`
    );
    return response.data.data;
  });

  let { data: user } = useQuery("usersCache", async () => {
    const response = await API.get(`/user/${params.id}`);
    return response.data.data;
  });

  return (
    <Container>
      <h2 className="mt-5 mb-3">Geprek Bensu, Menus</h2>
      <Row>
        {products?.map((item, index) => (
          <Col key={index} className="my-3 col-12 col-md-3">
            <Card style={{ width: "16rem" }} className="shadow">
              <Card.Img variant="top" src={item.image} />
              <Card.Body>
                <Card.Text className="font-bold">{item.title}</Card.Text>
                <Card.Text className="text-price">
                  {convertRupiah.convert(item.price)}
                </Card.Text>
                <Button
                  className="bg-yellow btn-order"
                  onClick={() => {
                    setDataCart([...dataCart, {}]);
                  }}
                >
                  Order
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Detail;
