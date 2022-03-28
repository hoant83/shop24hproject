
import { useEffect, useState } from "react"
import { Card, CardGroup, CardImg, Container } from 'react-bootstrap';
import { CardBody, CardText, CardTitle, Col, Row } from 'reactstrap';
import { useNavigate, useParams } from "react-router-dom";
//import product from "../../data.json"

function RelatedProducts({ id, widthHandler }) {
    const [subProduct, setSubProduct] = useState(null)
    // hàm gọi api
    const getData = async (paramUrl, paramOptions = {}) => {
        const response = await fetch(paramUrl, paramOptions);
        const responseData = await response.json();
        return responseData;
    }
    const navigate = useNavigate();
    const onAProductClick = (paramId, paramName) => {
        console.log("Chi tiết sản phẩm đã được click!")
        navigate("/detail-product/" + paramId + "/" + paramName);
    }
    useEffect(() => {
        window.scrollTo(0, 0)
        const subRelatedProducts = []
        getData("https://shop24h-backend.herokuapp.com/products")
            .then((data) => {
                for (let i = 0; i < data.products.length; i++) {
                    if (data.products[i]._id == id) {
                        console.log(data.products[i])
                        for (let j = 0; j < data.products.length; j++) {
                            if (data.products[i].type == data.products[j].type) {
                                subRelatedProducts.push(data.products[j])
                            }
                        }
                    }
                }
                console.log(subRelatedProducts)
                setSubProduct(subRelatedProducts)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [id])

    return (
        <>
        {
            widthHandler > 800 ?
            <Container style={{ marginBottom: 40 }}>
                <h2 className='mb-3 mt-5'>Related Products </h2>
                <CardGroup>
                    {subProduct ? subProduct.map((product, index, products) => (
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
                    )) : null}
                </CardGroup>
            </Container>
            :
            <Container style={{ marginBottom: 40 }}>
                <h2 className='mb-3 mt-5 text-center'>Related Products </h2>
                <CardGroup>
                    <Col xs="12">
                    <Row>
                    {subProduct ? subProduct.map((product, index, products) => (
                        <Col xs="6" key={product._id} onClick={() => { onAProductClick(product._id, product.name) }}>
                            <Card className='mb-2' title='Click vào để xem chi tiết'>
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
                    )) : null}
                    </Row>
                    </Col>
                </CardGroup>
            </Container>
        }
            
        </>
    )
}

export default RelatedProducts