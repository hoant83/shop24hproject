import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel'
import anh2 from "../../assets/images/anh2.png"
import anh3 from "../../assets/images/anh3.png"
import anh4 from "../../assets/images/anh4.jpg"

function CarouselComponent ({widthHandler, goToCategoriesProductPage}){
    const onBtnGoToProductClick = () => {
        goToCategoriesProductPage()
    }
        return (
            <>{
                widthHandler > 800 ?
            
                <Carousel>
                        <Carousel.Item className='text-dark'>  
                            <Container fluid>
                                <Container >
                                    <Row>
                                    <Col sm="12" style={{padding: "4rem 10rem"}}>
                                        <Row>
                                        <Col sm="6" className='ms-2'>
                                            <strong>Trái cây sạch nhất</strong>
                                            <h2 >Chào mừng đến với Fruit Ninja</h2>
                                            <br></br>
                                            <p >Fruit Ninja là cửa hàng online chuyên bán trái cây sạch, sản phẩm hoàn toàn từ hữu cơ, được nhập từ các tỉnh nổi tiếng về trái cây như Đà Lạt, Kontum, Đắc Lắc, Vĩnh Long, Đồng Tháp, Bến Tre...</p>
                                            <Button onClick={onBtnGoToProductClick} className="btn btn-warning text-dark">Đến trang sản phẩm</Button>
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
                                        <Col sm="6" className='ms-2'>
                                            <strong>Trái cây tươi nhất</strong>
                                            <h3 >Chào mừng đến với Fruit Ninja</h3>
                                            <p >Fruit Ninja chỉ bán sản phẩm tươi, tất cả đã được kiểm tra cẩn thận trước khi đến tay khách hàng, cửa hàng hiện có 4 containers lạnh chạy liên tục để đảm bảo độ tươi.</p>
                                            <Button onClick={onBtnGoToProductClick} className="btn btn-warning text-dark">Đến trang sản phẩm</Button>
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
                                        <Col sm="6" className='ms-2'>
                                            <strong>Trái cây đa dạng nhất</strong>
                                            <h3 >Chào mừng đến với Fruit Ninja</h3>
                                            <p >Ninja Fruit hiện có hơn 300 loại trái cây được chọn lọc từ những vùng đất nổi tiếng nhất của Việt Nam. Để biết mùa nào trái cây nào là ngon nhất, hãy liên hệ với chúng tôi để được tư vấn.</p>
                                            <Button onClick={onBtnGoToProductClick} className="btn btn-warning text-dark">Đến trang sản phẩm</Button>
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
                                    <strong>Trái cây sạch nhất</strong>
                                    <h2 >Chào mừng đến với Fruit Ninja</h2>
                                    <br></br>
                                    <p >Fruit Ninja là cửa hàng online chuyên bán trái cây sạch, sản phẩm hoàn toàn từ hữu cơ, được nhập từ các tỉnh nổi tiếng về trái cây như Đà Lạt, Kontum, Đắc Lắc, Vĩnh Long, Đồng Tháp, Bến Tre...</p>
                                    <Button onClick={onBtnGoToProductClick} className="btn btn-warning text-dark">Đến trang sản phẩm</Button>
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
                                    <strong>Trái cây tươi nhất</strong>
                                    <h2 >Chào mừng đến với Fruit Ninja</h2>
                                    <br></br>
                                    <p >Fruit Ninja chỉ bán sản phẩm tươi, tất cả đã được kiểm tra cẩn thận trước khi đến tay khách hàng, cửa hàng hiện có 4 containers lạnh chạy liên tục để đảm bảo độ tươi.</p>
                                    <Button onClick={onBtnGoToProductClick} className="btn btn-warning text-dark">Đến trang sản phẩm</Button>
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
                                    <strong>Trái cây đa dạng nhất</strong>
                                    <h2 >Chào mừng đến với Fruit Ninja</h2>
                                    <br></br>
                                    <p >Ninja Fruit hiện có hơn 300 loại trái cây được chọn lọc từ những vùng đất nổi tiếng nhất của Việt Nam. Để biết mùa nào trái cây nào là ngon nhất, hãy liên hệ với chúng tôi để được tư vấn.</p>
                                    <Button onClick={onBtnGoToProductClick} className="btn btn-warning text-dark">Đến trang sản phẩm</Button>
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