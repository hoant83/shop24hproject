import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel'
import anh2 from "../../assets/images/anh2.png"
import anh3 from "../../assets/images/anh3.png"
import anh4 from "../../assets/images/anh4.jpg"

function CarouselComponent ({widthHandler}){
        return (
            <>{
                widthHandler > 500 ?
            
                <Carousel>
                        <Carousel.Item className='text-dark'>  
                            <Container fluid>
                                <Container >
                                    <Row>
                                    <Col sm="12" style={{padding: "4rem 10rem"}}>
                                        <Row>
                                        <Col sm="6" className='ms-5'>
                                            <strong>Fruit Ip Nice</strong>
                                            <h2 >Welcome to Devcamp Fruit</h2>
                                            <br></br>
                                            <p >Devcamp Fruit is an online shop sell marketplace with over 5000 kind of fruits and 1 million kind of juices. Come with us to enjoy many thing we have.</p>
                                            <Button className="btn btn-warning text-dark">Browse Courses</Button>
                                        </Col>
                                        <Col sm="4">
                                            <img src={anh2} style={{height: "300px"}} alt="banner"/>
                                        </Col>
                                        </Row>
                                    </Col>
                                    </Row>
                                </Container>
                            </Container>  
                        </Carousel.Item  > 
                        <Carousel.Item >  
                            <Container fluid>
                                <Container >
                                    <Row>
                                    <Col sm="12" style={{padding: "4rem 10rem"}}>
                                        <Row>
                                        <Col sm="6" className='ms-5'>
                                            <strong>Fruit Ip Nice</strong>
                                            <h3 >Welcome to Ionic Course365 Learning Center</h3>
                                            <p >Ionic Course365 is an online learning and teaching marketplace with over 5000 courses and 1 million students. Instructor and expertly crafted courses, designed for the modern students and entrepreneur.</p>
                                            <Button className="btn btn-warning text-dark">See more</Button>
                                        </Col>
                                        <Col sm="4">
                                            <img src={anh3} style={{height: "300px"}} alt="banner"/>
                                        </Col>
                                        </Row>
                                    </Col>
                                    </Row>
                                </Container>
                            </Container>  
                        </Carousel.Item  >
                        <Carousel.Item >  
                            <Container fluid>
                                <Container >
                                    <Row>
                                    <Col sm="12" style={{padding: "4rem 10rem"}}>
                                        <Row>
                                        <Col sm="6" className='ms-5'>
                                            <strong>Fruit Ip Nice</strong>
                                            <h3 >Welcome to Ionic Course365 Learning Center</h3>
                                            <p >Ionic Course365 is an online learning and teaching marketplace with over 5000 courses and 1 million students. Instructor and expertly crafted courses, designed for the modern students and entrepreneur.</p>
                                            <Button className="btn btn-warning text-dark">Browse Courses</Button>
                                        </Col>
                                        <Col sm="4">
                                            <img src={anh4} style={{height: "300px"}} alt="banner"/>
                                        </Col>
                                        </Row>
                                    </Col>
                                    </Row>
                                </Container>
                            </Container>  
                        </Carousel.Item  >
                </Carousel>
                :
                <Carousel>
                <Carousel.Item className='text-dark'>  
                    <Container fluid>
                        <Container >
                            <Row>
                            <Col sm="12">
                                <Row>
                                <Col sm="12" >
                                    <strong>Fruit Ip Nice</strong>
                                    <h2 >Welcome to Devcamp Fruit</h2>
                                    <br></br>
                                    <p >Devcamp Fruit is an online shop sell marketplace with over 5000 kind of fruits and 1 million kind of juices. Come with us to enjoy many thing we have.</p>
                                    <Button className="btn btn-warning text-dark">Browse Courses</Button>
                                </Col>
                                </Row>
                            </Col>
                            </Row>
                            <Row className='text-center'>
                            <Col sm="12">
                                <Row>
                                <Col sm="12">
                                    <img src={anh2} style={{height: "150px"}} alt="banner"/>
                                </Col>
                                </Row>
                            </Col>
                            </Row>
                        </Container>
                    </Container>  
                </Carousel.Item  > 
                <Carousel.Item >  
                <Container fluid>
                        <Container >
                            <Row>
                            <Col sm="12">
                                <Row>
                                <Col sm="12" >
                                    <strong>Fruit Ip Nice</strong>
                                    <h2 >Welcome to Devcamp Fruit</h2>
                                    <br></br>
                                    <p >Devcamp Fruit is an online shop sell marketplace with over 5000 kind of fruits and 1 million kind of juices. Come with us to enjoy many thing we have.</p>
                                    <Button className="btn btn-warning text-dark">Browse Courses</Button>
                                </Col>
                                </Row>
                            </Col>
                            </Row>
                            <Row className='text-center'>
                            <Col sm="12">
                                <Row>
                                <Col sm="12">
                                    <img src={anh3} style={{height: "150px"}} alt="banner"/>
                                </Col>
                                </Row>
                            </Col>
                            </Row>
                        </Container>
                    </Container>  
                </Carousel.Item  >
                <Carousel.Item >  
                <Container fluid>
                        <Container >
                            <Row>
                            <Col sm="12">
                                <Row>
                                <Col sm="12" >
                                    <strong>Fruit Ip Nice</strong>
                                    <h2 >Welcome to Devcamp Fruit</h2>
                                    <br></br>
                                    <p >Devcamp Fruit is an online shop sell marketplace with over 5000 kind of fruits and 1 million kind of juices. Come with us to enjoy many thing we have.</p>
                                    <Button className="btn btn-warning text-dark">Browse Courses</Button>
                                </Col>
                                </Row>
                            </Col>
                            </Row>
                            <Row className='text-center'>
                            <Col sm="12">
                                <Row>
                                <Col sm="12">
                                    <img src={anh4} style={{height: "150px"}} alt="banner"/>
                                </Col>
                                </Row>
                            </Col>
                            </Row>
                        </Container>
                    </Container> 
                </Carousel.Item  >
                </Carousel>
                }
            </>
                
        )   

}  

  

export default CarouselComponent