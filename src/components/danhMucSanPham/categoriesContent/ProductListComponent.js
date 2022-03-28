import React from 'react';
import { Button } from '@mui/material';
import { Card, CardGroup, CardImg, Container } from 'react-bootstrap';
import { CardBody, CardText, CardTitle, Col, Row } from 'reactstrap';
import { useNavigate, useParams } from "react-router-dom";
function ProductsListComponent({ productNew, widthHandler }) {
    const navigate = useNavigate();
    const onAProductClick = (paramId, paramName) => {
        console.log("Chi tiết sản phẩm đã được click!")
        navigate("/detail-product/" + paramId + "/" + paramName);
    }
    console.log(widthHandler)
    return (
        <>
        {
            widthHandler > 800 ? 
            <Container>
            <CardGroup>
                {productNew.map((product, index, productNew) => (
                    <Col sm={3} md={4} p={4} lg={4} key={product._id} onClick={() => { onAProductClick(product._id, product.name) }}>
                        <Card className='mb-2 ms-2' type="button" title='Click vào để xem chi tiết'>
                            <CardImg
                                alt={product.name}
                                src={product.imageUrl[0]}
                                top="true"
                                width="100%"
                                height="220"
                            />
                            <CardBody>
                                <CardTitle tag="h5">
                                    {product.name}
                                </CardTitle>
                                <CardText>
                                    <del>{(product.buyPrice).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} VND</del> <strong className="text-success">{(product.promotionPrice).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} VND</strong>
                                </CardText>
                            </CardBody>
                        </Card>
                    </Col>
                ))}
            </CardGroup>
        </Container>
        :
        <Container>
            <CardGroup>
                <Col xs="12">
                    <Row>
                {productNew.map((product, index, productNew) => (
                    <Col xs="12" key={product._id} onClick={() => { onAProductClick(product._id, product.name) }}>
                        <Card className='mb-2'>
                            <CardImg
                                alt={product.name}
                                src={product.imageUrl[0]}
                                top="true"
                                width="100%"
                                height="150"
                            />
                            <CardBody>
                                <CardTitle tag="h5">
                                    {product.name}
                                </CardTitle>
                                <CardText>
                                    <del>{(product.buyPrice).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}đ</del> <br></br> 
                                    <strong className="text-success">{(product.promotionPrice).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}đ</strong>
                                </CardText>
                            </CardBody>
                        </Card>
                    </Col>
                ))}
                </Row>
                </Col>
            </CardGroup>
        </Container>
        }

        
        </>
    )
}

export default ProductsListComponent

