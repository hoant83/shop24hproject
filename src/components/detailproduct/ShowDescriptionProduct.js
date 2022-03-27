import { Button, Container } from "@mui/material"
import { useEffect, useState } from "react"
import { Col, Row } from "reactstrap"
import product from "../../data.json"
function ShowDescriptionProduct({ id, widthHandler }) {
    const [subProduct, setSubProduct] = useState(null)
    const [readMore, setReadMore] = useState(false);
    const linkName = readMore ? 'see less ' : 'see more '
    // hàm gọi api
    const getData = async (paramUrl, paramOptions = {}) => {
        const response = await fetch(paramUrl, paramOptions);
        const responseData = await response.json();
        return responseData;
    }
    useEffect(() => {
        getData("http://localhost:8000/products/" + id)
            .then((data) => {
                console.log(data.product)
                setSubProduct(data.product)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [id])
    return (
        <>
        {
            widthHandler > 500 ?
            <Container >
                <Col sm="12">
                    <Row>
                        <Col sm="12" className="mb-4">
                            <h4>Mô tả chi tiết</h4>
                        </Col>
                        <Col sm="12" className="mb-3">
                            <p>{subProduct ? subProduct.description : null}</p>
                            <p>Cam kết hàng Việt Nam không chất độc hại</p>
                            <p>Liên hệ với chúng tôi để nhận giá tốt nhất</p>
                            <h2 >Chỉ hôm nay: </h2>
                            <p>Giá gốc <del>{subProduct ? <strong className="text-danger" style={{ fontSize: 25 }}>{subProduct.buyPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}vnd</strong> : null}</del>
                                , nay chỉ còn {subProduct ? <strong className="text-danger" style={{ fontSize: 25 }}>{subProduct.promotionPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}vnd</strong> : null}
                            </p>
                        </Col>
                        <Col sm="12" className="text-center mb-2">
                            <Button style={{ borderRadius: 20, backgroundColor: "#cddc39", width: 200, height: 50 }} onClick={() => { setReadMore(!readMore) }}>{linkName}</Button>
                        </Col>
                        {readMore &&
                            <Col sm="12" className="text-center">
                                {subProduct ? subProduct.imageUrl.map((subImage, index, subProduct) => (
                                    <div key={index}><img style={{ width: "70%", height: 500, marginBottom: 10 }} src={subImage} /></div>
                                ))
                                    : null
                                }
                            </Col>
                        }

                    </Row>
                </Col>

            </Container>
            :
            <Container >
                <Col sm="12">
                    <Row>
                        <Col sm="12" className="mb-4">
                            <h4>Mô tả chi tiết</h4>
                        </Col>
                        <Col sm="12" className="mb-3">
                            <p>{subProduct ? subProduct.description : null}</p>
                            <p>Cam kết hàng Việt Nam không chất độc hại</p>
                            <p>Liên hệ với chúng tôi để nhận giá tốt nhất</p>
                            <h6 >Chỉ hôm nay: </h6>
                            <p>Giá gốc <del>{subProduct ? <strong className="text-danger" style={{ fontSize: 15 }}>{subProduct.buyPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}vnd</strong> : null}</del>
                                , nay chỉ còn {subProduct ? <strong className="text-danger" style={{ fontSize: 15 }}>{subProduct.promotionPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}vnd</strong> : null}
                            </p>
                        </Col>
                        <Col sm="12" className="text-center mb-2">
                            <Button style={{ borderRadius: 20, backgroundColor: "#cddc39", width: 200, height: 50 }} onClick={() => { setReadMore(!readMore) }}>{linkName}</Button>
                        </Col>
                        {readMore &&
                            <Col sm="12" className="text-center">
                                {subProduct ? subProduct.imageUrl.map((subImage, index, subProduct) => (
                                    <div key={index}><img style={{ width: "100%", height: 250, marginBottom: 10 }} src={subImage} /></div>
                                ))
                                    : null
                                }
                            </Col>
                        }

                    </Row>
                </Col>

            </Container>
        }
            
        </>
    )
}

export default ShowDescriptionProduct