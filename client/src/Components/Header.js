import { Col, Container, Image, Row } from "react-bootstrap"

import pizza from '../assets/logo-pizza.svg'
import strips from '../assets/strips.svg'

const Header = () => {
    return (
        <Container fluid className="bg-yellow">
            <Row className="header-text d-flex align-items-center">
                <Col className='col-12 col-lg-6'>
                    <h1>Are You Hungry? <br /> Express Home Delivery</h1>
                    <Row>
                        <Col className="col-12 col-lg-4">
                            <img src={strips} className='me-4' />
                        </Col>
                        <Col>
                            <p className="ff-Avenir">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
                        </Col>
                    </Row>
                </Col>
                <Col>
                    <Image src={pizza} className='my-5 px-5' />
                </Col>
            </Row>
        </Container>
    )
}

export default Header