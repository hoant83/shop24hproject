import { Alert, Container, Snackbar, TextField } from "@mui/material"
import { useEffect, useState } from "react"
import { Image } from "react-bootstrap"
import { Col, Row } from "reactstrap"
import product from "../../data.json"
import { Card, CardImg, Button } from 'react-bootstrap';
import { CardBody, CardGroup, CardText, CardTitle } from 'reactstrap';
import Carousel from 'react-bootstrap/Carousel'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar } from '@fortawesome/free-solid-svg-icons'
import anh2 from "../../assets/images/anh2.png"
import anh3 from "../../assets/images/anh3.png"
import anh4 from "../../assets/images/anh4.jpg"
import { useNavigate, useParams } from "react-router-dom";
function ShowInfoProduct({ id, user, setAmountProductInCart, amountProductInCart, widthHandler }) {

    const [subProduct, setSubProduct] = useState(null)
    const [indexProduct, setIndexProduct] = useState(-1)
    const [activeIndex, setActiveIndex] = useState(0)
    const [srcBigImg, setSrcBigImg] = useState("")
    const [amount, setAmount] = useState(1)
    const navigate = useNavigate();
    const goToLoginPage = () => {
        navigate("/login");
    }
    const vertical = "top"
    const horizontal = "right"
    const [openAlert, setOpenAlert] = useState(false)
    const [noidungAlertValid, setNoidungAlertValid] = useState("")
    const [statusModal, setStatusModal] = useState("error")
    const [disabledAddCartButton, setDisabledAddCartButton] = useState(false)
 
    const handleCloseAlert = () => {
        setOpenAlert(false)
    }
    // hàm gọi api
    const getData = async (paramUrl, paramOptions = {}) => {
        const response = await fetch(paramUrl, paramOptions);
        const responseData = await response.json();
        return responseData;
    }

    const onSubImgClick = (index) => {
        setActiveIndex(index)
        setSrcBigImg(subProduct ? subProduct.imageUrl[index] : null)
    }
    const onTruClick = () => {
        if (amount === 1) {
            setAmount(1)
        }
        else (
            setAmount(amount - 1)
        )
    }
    const onCongClick = () => {
        setAmount(amount + 1)
    }
    const onAddToCartClick = () => {
        if (user) {
            setDisabledAddCartButton(true)
            console.log(user.email)
            findEmailAPI(user.email);
        }
        else {
            goToLoginPage()
        }

    }
    const findEmailAPI = (paramEmail) => {
        getData("https://shop24h-backend.herokuapp.com/customers/" + paramEmail)
            .then((data) => {
                var customerId = data.customer[0]._id
                var cartsList = data.customer[0].carts
                console.log(customerId)
                getAllCartsOfThisCustomer(customerId)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const getAllCartsOfThisCustomer = (paramCustomerId) => {
        getData("https://shop24h-backend.herokuapp.com/customers/" + paramCustomerId + "/carts")
            .then((data) => {
                var cartsList = data.Carts.carts
                var checkResult = false
                for (let i = 0; i < cartsList.length; i++) {
                    if (cartsList[i].productId == id) {
                        checkResult = true
                        console.log("update cart")
                        getApiUpdateCart(cartsList[i])

                    }
                }
                if (checkResult == false) {
                    getApiPostCart(paramCustomerId)
                    console.log("post cart")
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const getApiUpdateCart = (paramCart) => {
        var dataCart = {
            amount: amount + parseInt(paramCart.amount)
        }
        const body = {
            method: 'PUT',
            body: JSON.stringify(dataCart),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        }
        getData("https://shop24h-backend.herokuapp.com/carts/" + paramCart._id, body)
            .then((data) => {
                console.log(data)
                setStatusModal("success");
                setNoidungAlertValid("Update số lượng thành công!");
                setOpenAlert(true);
                setDisabledAddCartButton(false)
            })
            .catch((error) => {
                console.log(error)
            })
    }
    const getApiPostCart = (paramCustomerId) => {
        var dataCart = {
            productId: id,
            amount: amount,
            price: subProduct.promotionPrice,
            name: subProduct.name,
            imgUrl: subProduct.imageUrl[0]
        }
        const body = {
            method: 'POST',
            body: JSON.stringify(dataCart),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        }
        getData("https://shop24h-backend.herokuapp.com/customers/" + paramCustomerId + "/carts", body)
            .then((data) => {
                console.log(data.Customer.carts.length)
                getAllCartsOfCustomerToSetAmountOfCart(paramCustomerId)

            })
            .catch((error) => {
                console.log(error)
            })
    }
    const getAllCartsOfCustomerToSetAmountOfCart = (paramCustomerId) => {
        getData("https://shop24h-backend.herokuapp.com/customers/" + paramCustomerId + "/carts")
            .then((data) => {
                var cartsList = data.Carts.carts
                setAmountProductInCart(cartsList.length)
                setStatusModal("success");
                setNoidungAlertValid("Đã thêm vào giỏ hàng!");
                setOpenAlert(true);
                setDisabledAddCartButton(false)
            })
            .catch((error) => {
                console.log(error)
            })
    }
    useEffect(() => {
        // gọi api lấy thông tin tất cả products
        getData("https://shop24h-backend.herokuapp.com/products/" + id)
            .then((data) => {
                console.log(data.product)
                setSubProduct(data.product)
                setSrcBigImg(data.product ? data.product.imageUrl[0] : null)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [id])
    return (
        <>
        {
            widthHandler > 800 ?
            <Container>
                <Row>
                    <Col sm="12">
                        <Row>
                            <Col sm="4">
                                <Row className="mt-5">
                                    <Col sm="12" className="mt-4">
                                        <div className="details">
                                            <img key="big-image" style={{ width: "100%", height: 220 }} src={srcBigImg} />
                                            <div className="box">
                                                <div className="thumb">
                                                    {subProduct ? subProduct.imageUrl.map((subImage, index, subProduct) => (
                                                        index === activeIndex ? <img key={index} style={{float:"left", width: 100/subProduct.length +"%", height:"80%"}} src={subImage} className="active" onClick={() => { onSubImgClick(index) }} />
                                                            : <img key={index} style={{float:"left", width: 100/subProduct.length +"%", height:"80%"}} src={subImage} onClick={() => { onSubImgClick(index) }} />
                                                    ))
                                                        : null
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                            <Col sm="8" >
                                <Row className="ms-4">
                                    <Col sm="12" className="ms-5 mb-3">
                                        <h2>{subProduct ? subProduct.name.toUpperCase() : null}</h2>
                                    </Col>
                                    <Col sm="12" className="ms-5 mb-3">
                                        {subProduct ? <p><strong>Thương hiệu:</strong> {subProduct.type}-{subProduct._id}</p> : null}
                                    </Col>
                                    <Col sm="12" className="ms-5 mb-3">
                                        <p><strong>Đánh giá: </strong><FontAwesomeIcon className="text-warning ms-2 mr-2" icon={faStar} />
                                            <FontAwesomeIcon className="text-warning ms-1 mr-1" icon={faStar} />
                                            <FontAwesomeIcon className="text-warning ms-1 mr-1" icon={faStar} />
                                            <FontAwesomeIcon className="text-warning ms-1 mr-1" icon={faStar} />
                                            <FontAwesomeIcon className="text-warning ms-1 mr-1" icon={faStar} />
                                        </p>
                                    </Col>
                                    <Col sm="12" className="ms-5 mb-3">
                                        {subProduct ? <p><strong>Mô tả:</strong> {subProduct.description}</p> : null}
                                    </Col>
                                    <Col sm="12" className="ms-5 mb-3">
                                        {subProduct ? <p><strong>Giá:</strong> <strong className="text-danger" style={{ fontSize: 30 }}>{(subProduct.promotionPrice).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} vnđ</strong></p> : null}
                                    </Col>
                                    <Col sm="12" className="ms-5 mb-4">
                                        <Button onClick={onTruClick} className="bg-secondary" style={{ width: 40, height: 40 }}>-</Button> <strong className="ms-3">{amount}</strong> <Button onClick={onCongClick} className="bg-secondary ms-3" style={{ width: 40, height: 40 }}>+</Button>
                                    </Col>
                                    <Col sm="12" className="ms-5 mb-3">
                                        <Button disabled={disabledAddCartButton} className="bg-dark" onClick={onAddToCartClick}>Thêm vào giỏ hàng</Button>
                                    </Col>
                                </Row>

                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
            :
            <Container>
                <Row>
                    <Col sm="12">
                        <Row>
                            <Col sm="12">
                                <Row className="mt-3">
                                    <Col sm="12" className="mt-3">
                                        <div className="details">
                                            <img key="big-image" style={{ width: "100%", height: 220 }} src={srcBigImg} />
                                            <div className="box">
                                                <div className="thumb">
                                                    {subProduct ? subProduct.imageUrl.map((subImage, index, subProduct) => (
                                                        index === activeIndex ? <img key={index} style={{float:"left", width: 100/subProduct.length +"%", height:"80%"}} src={subImage} className="active" onClick={() => { onSubImgClick(index) }} />
                                                            : <img key={index} style={{float:"left", width: 100/subProduct.length +"%", height:"80%"}} src={subImage} onClick={() => { onSubImgClick(index) }} />
                                                    ))
                                                        : null
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                            <Col sm="12" >
                                <Row>
                                <Col sm="12" className="mb-1">
                                        {subProduct ? <p><strong>Giá:</strong> <strong className="text-danger" style={{ fontSize: 30 }}>{(subProduct.promotionPrice).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} vnđ</strong></p> : null}
                                    </Col>
                                    <Col sm="12" className="mb-2">
                                        <Button onClick={onTruClick} className="bg-secondary" style={{ width: 40, height: 40 }}>-</Button> <strong className="ms-3">{amount}</strong> <Button onClick={onCongClick} className="bg-secondary ms-3" style={{ width: 40, height: 40 }}>+</Button>
                                    </Col>
                                    <Col sm="12" className="mb-1 ">
                                        <Button disabled={disabledAddCartButton} className="bg-danger w-100 mb-3" onClick={onAddToCartClick}>Thêm vào giỏ hàng</Button>
                                    </Col>
                                    <Col sm="12" className="mb-1">
                                        <h2>{subProduct ? subProduct.name.toUpperCase() : null}</h2>
                                    </Col>
                                    <Col sm="12" className="mb-1">
                                        {subProduct ? <p><strong>Thương hiệu:</strong> {subProduct.type}-{subProduct._id}</p> : null}
                                    </Col>
                                    <Col sm="12" className="mb-1">
                                        <p><strong>Đánh giá: </strong><FontAwesomeIcon className="text-warning ms-2 mr-2" icon={faStar} />
                                            <FontAwesomeIcon className="text-warning ms-1 mr-1" icon={faStar} />
                                            <FontAwesomeIcon className="text-warning ms-1 mr-1" icon={faStar} />
                                            <FontAwesomeIcon className="text-warning ms-1 mr-1" icon={faStar} />
                                            <FontAwesomeIcon className="text-warning ms-1 mr-1" icon={faStar} />
                                        </p>
                                    </Col>
                                    <Col sm="12" className="mb-1">
                                        {subProduct ? <p><strong>Mô tả:</strong> {subProduct.description}</p> : null}
                                    </Col>
                                </Row>

                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        }
            <Snackbar style={{zIndex: 1500}} open={openAlert} autoHideDuration={3000} onClose={handleCloseAlert} anchorOrigin={{ vertical, horizontal }}>
                <Alert onClose={handleCloseAlert} severity={statusModal} sx={{ width: '100%' }}>
                    {noidungAlertValid}
                </Alert>
            </Snackbar>

        </>
    )
}

export default ShowInfoProduct