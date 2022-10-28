import { Card, Col, Container, Row } from "react-bootstrap"

import { Patners } from '../DataDummy/Patners'

function ContentPatner() {
    return (
        <Container>
            <h2 className="mt-5">Popular Restaurant</h2>
            <Row>
                {Patners.map((item, index) => (
                    <Col key={index} className="my-3 col-12 col-md-3">
                        <Card width='18 rem' >
                            <Card.Body className="d-flex align-items-center shadow">
                                <Card.Img variant="top" src={item.image} style={{ width: '50px', marginRight:'15px' }} />
                                <Card.Title>{item.name}</Card.Title>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    )
}

export default ContentPatner
