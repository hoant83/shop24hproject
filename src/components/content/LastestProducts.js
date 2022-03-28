import React from 'react';
import { Card, CardGroup, CardImg, Container } from 'react-bootstrap';
import { CardBody, CardText, CardTitle, Row, Col } from 'reactstrap';
//import products from "../../data.json"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLeaf } from '@fortawesome/free-solid-svg-icons'
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
function LastestProducts({ products, widthHandler }) {
    const navigate = useNavigate();
    const onAProductClick = (paramId, paramName) => {
        console.log("Chi tiết sản phẩm đã được click!")
        navigate("/detail-product/" + paramId + "/" + paramName);
    }
    return (
        <>
        {widthHandler > 500 ? 
            <Container>
                <h2 className='text-center mb-3 mt-3'>Sản phẩm mới nhất <FontAwesomeIcon style={{ color: "green" }} icon={faLeaf} /></h2>
                <CardGroup>
                    {products.map((product, index, products) => (
                        <Col sm={4} md={3} p={2} lg={3} key={product._id} onClick={() => { onAProductClick(product._id, product.name) }}>
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
                                        <del>{(product.buyPrice).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} VND</del> <strong className="text-success">{(product.promotionPrice).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} VND</strong><br></br>
                                    </CardText>

                                </CardBody>
                            </Card>
                        </Col>
                    ))}
                </CardGroup>
            </Container>
            :
            <Container>
                <h2 className='text-center mb-3 mt-3'>Sản phẩm mới nhất <FontAwesomeIcon style={{ color: "green" }} icon={faLeaf} /></h2>
                <CardGroup>
                    <Col xs="12">
                    <Row>
                        {products.map((product, index, products) => (
                            
                                <Col xs="6" key={product._id} onClick={() => { onAProductClick(product._id, product.name) }}>
                                        <Card className='mb-3' title='Click vào để xem chi tiết'>
                                        <CardImg
                                            alt={product.name}
                                            src={product.imageUrl[0]}
                                            top="true"
                                            width="100%"
                                            height="150"
                                        />
                                        <CardBody>
                                            <CardTitle tag="h6">
                                                {product.name}
                                            </CardTitle>
                                            <CardText>
                                                <del>{(product.buyPrice).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}đ</del><br></br>
                                                <strong className="text-success">{(product.promotionPrice).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}đ</strong><br></br>
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



export default LastestProducts