import { Alert, Box, Button, Container, Grid, Input, Modal, Paper, styled, tableCellClasses, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import { Col, Row } from "reactstrap"
import { useNavigate, useParams } from "react-router-dom";
function ThanhToan({ arrayProductChecked, amountProductChecked, sumMoney, infoCustomer, widthHandler }) {
    const vertical = "top"
    const horizontal = "right"
    const style2 = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 800,
        p: 4,
        borderRadius: '10px'
    };
    const styleMobile = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 350,
        p: 2,
        borderRadius: '10px'
    };
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));
    // hàm gọi api
    const getData = async (paramUrl, paramOptions = {}) => {
        const response = await fetch(paramUrl, paramOptions);
        const responseData = await response.json();
        return responseData;
    }
    const navigate = useNavigate();
    const [openAlert, setOpenAlert] = useState(false)
    const [noidungAlertValid, setNoidungAlertValid] = useState("")
    const [statusModal, setStatusModal] = useState("error")

    const handleCloseAlert = () => {
        setOpenAlert(false)
    }

    const [openModalDontHaveOrder, setOpenModalDontHaveOrder] = useState(false);
    const [openModalUpdateCustomer, setOpenModalUpdateCustomer] = useState(false);
    const [openModalConfirmOrder, setOpenModalConfirmOrder] = useState(false);
    const [openModalCreateOrderSuccess, setOpenModalCreateOrderSuccess] = useState(false);

    const [orderId, setOrderId] = useState("");

    const [fullNameModal, setFullNameModal] = useState("");
    const [phoneNumberModal, setPhoneNumberModal] = useState("");
    const [addressModal, setAddressModal] = useState("");
    const [cityModal, setCityModal] = useState("");
    const [countryModal, setCountryModal] = useState("");

    const onBtnCancelClick = () => {
        setOpenModalDontHaveOrder(false);
        setOpenModalUpdateCustomer(false);
        setOpenModalConfirmOrder(false);
        setOpenModalCreateOrderSuccess(false)
    }
    const onMuaHangClick = () => {
        if (amountProductChecked === 0) {
            setOpenModalDontHaveOrder(true);
        }
        else {
            setOpenModalUpdateCustomer(true);
        }
    }
    const onFullnameChange = (event) => {
        setFullNameModal(event.target.value);
    }
    const onPhoneNumberChange = (event) => {
        setPhoneNumberModal(event.target.value);
    }
    const onAddressChange = (event) => {
        setAddressModal(event.target.value);
    }
    const onCityChange = (event) => {
        setCityModal(event.target.value);
    }
    const onCountryChange = (event) => {
        setCountryModal(event.target.value);
    }
    const onHoanThanhClick = () => {
        var vCheck = validInfoCustomer()
        if (vCheck) {
            var vDataInfoCustomer = {
                fullName: fullNameModal,
                phoneNumber: phoneNumberModal,
                address: addressModal,
                city: cityModal,
                country: countryModal
            }
            const body = {
                method: 'PUT',
                body: JSON.stringify(vDataInfoCustomer),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                }
            }
            getData("https://shop24h-backend.herokuapp.com/customers/" + infoCustomer._id, body)
                .then((data) => {
                    setStatusModal("success");
                    setNoidungAlertValid("Cập nhật thành công!");
                    setOpenAlert(true);
                    onBtnCancelClick();
                    setOpenModalConfirmOrder(true);

                })
                .catch((error) => {
                    setStatusModal("error");
                    setNoidungAlertValid("Lỗi mạng, xin thử lại!");
                    setOpenAlert(true);
                    console.log(error)
                })
        }
    }
    const validInfoCustomer = () => {
        const filterPhone = /([\+84|84|0]+(3|5|7|8|9|1[2|6|8|9]))+([0-9]{8})\b/
        const filterPhone2 = /(([02]))+([0-9]{9})\b/

        if (fullNameModal === "") {
            setStatusModal("error");
            setNoidungAlertValid("Họ tên cần được nhập vào!");
            setOpenAlert(true);
            return false;
        }

        if ((filterPhone.test(phoneNumberModal) === false) && filterPhone2.test(phoneNumberModal) === false) {
            setStatusModal("error");
            setNoidungAlertValid("Số điện thoại không đúng!");
            setOpenAlert(true);
            return false;
        }

        if (addressModal === "") {
            setStatusModal("error");
            setNoidungAlertValid("Địa chỉ cần được nhập vào!");
            setOpenAlert(true);
            return false;
        }
        if (cityModal === "") {
            setStatusModal("error");
            setNoidungAlertValid("Thành phố cần được nhập vào!");
            setOpenAlert(true);
            return false;
        }
        if (countryModal === "") {
            setStatusModal("error");
            setNoidungAlertValid("Quốc gia cần được nhập vào!");
            setOpenAlert(true);
            return false;
        }
        return true;
    }
    const onBtnXacNhanDatHangClick = () => {
        var infoCreateOrder = {
            note: "Đơn hàng có " + amountProductChecked + " sản phẩm."
        }
        const body = {
            method: 'POST',
            body: JSON.stringify(infoCreateOrder),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        }
        getData("https://shop24h-backend.herokuapp.com/customers/" + infoCustomer._id + "/orders", body)
            .then((data) => {
                console.log(data)
                console.log(arrayProductChecked)
                postAllOrderDetail(data)
                setOrderId(data.order._id)
                onBtnCancelClick()
                setOpenModalCreateOrderSuccess(true)
                
            })
            .catch((error) => {
                console.log(error)
            })
    }
    const postAllOrderDetail = (data) => {
        for (let i = 0; i < arrayProductChecked.length; i++) {
            getApiPostDetailOrder(arrayProductChecked[i], data)
        }
    }
    const getApiPostDetailOrder = (productChecked, data) => {
        var infoOrderDetail = {
            quantity: productChecked.amount
        }
        const body = {
            method: 'POST',
            body: JSON.stringify(infoOrderDetail),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        }
        getData("https://shop24h-backend.herokuapp.com/orders/" + data.order._id + "/" + productChecked.productId + "/orderDetails", body)
            .then((data) => {
                console.log(data)
            })
            .catch((error) => {
                console.log(error)
            })
    }
    const onBtnCombackHomeClick = () => {
        navigate("/");
    }
    useEffect(() => {
        setFullNameModal(infoCustomer ? infoCustomer.fullName : "")
        setPhoneNumberModal(infoCustomer ? infoCustomer.phoneNumber : "")
        setAddressModal(infoCustomer ? infoCustomer.address : "")
        setCityModal(infoCustomer ? infoCustomer.city : "")
        setCountryModal(infoCustomer ? infoCustomer.country : "")
    }, [infoCustomer])
    return (
        <>
            <Container>
                <Row className="justify-content-end">
                    <Col sm="8">
                        <Row>
                            <Col sm="12" className="text-end">
                                <Row>
                                    <Col sm="9">
                                        <h5>Tổng thanh toán ({amountProductChecked} sản phẩm): <strong style={{ fontSize: "30px", color: "#ee4d2d" }}>{sumMoney.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}đ</strong></h5>
                                    </Col>
                                    <Col sm="3">
                                        <Button onClick={onMuaHangClick} style={{ borderRadius: 10, backgroundColor: "#ee4d2d", width: 150, height: 40, fontSize: "10px" }} variant="contained">Mua Hàng</Button>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>

            <Modal
                open={openModalDontHaveOrder}
                onClose={onBtnCancelClick}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                style={{ outline: 'none' }}
            >
                <div style={{ outline: 'none' }}>
                    <Box sx={widthHandler > 500 ? style2 : styleMobile} style={{ backgroundColor: "white" }}>
                        <Row>
                            <p>Bạn vẫn chưa chọn sản phẩm nào để mua.</p>
                        </Row>
                        <Row className="mt-4 text-center" >
                            <Col sm="12">
                                <Row className="mt-4">
                                    <Col sm="12">
                                        <Button onClick={onBtnCancelClick} style={{ backgroundColor: "#ee4d2d" }} className="w-100 text-white">Đóng</Button>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Box>
                </div>
            </Modal>

            <Modal
                open={openModalUpdateCustomer}
                onClose={onBtnCancelClick}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-confirm"
            >
                <Box sx={widthHandler > 500 ? style2 : styleMobile} style={{ backgroundColor: "white" }}>
                    <Typography mb={2} id="modal-modal-title" variant="h5" component="h2">
                        <i>Địa chỉ mới!</i><br></br>
                        <small style={{ fontSize: 15 }}>Để đặt hàng, vui lòng thêm địa chỉ nhận hàng</small>
                    </Typography>
                    <br></br>
                    <Row>
                        <Col xs="12" sm="6">
                            <Row>
                                <Col xs="12" sm="12">
                                    <Row>
                                        <Col xs="3" sm="4">
                                            <label>Họ tên:</label>
                                        </Col>
                                        <Col xs="9" sm="8">
                                            <Input onChange={onFullnameChange} defaultValue={infoCustomer ? infoCustomer.fullName : ""} align="center" />
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                        <Col xs="12" sm="6">
                            <Row>
                                <Col xs="12" sm="12">
                                    <Row>
                                        <Col xs="3" sm="4">
                                            <label >Số điện thoại:</label>
                                        </Col>
                                        <Col xs="9" sm="8">
                                            <Input onChange={onPhoneNumberChange} defaultValue={infoCustomer ? infoCustomer.phoneNumber : ""} align="center" />
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row className="mt-2">
                        <Col xs="12" sm="6">
                            <Row>
                                <Col xs="12" sm="12">
                                    <Row>
                                        <Col xs="3" sm="4">
                                            <label >Email:</label>
                                        </Col>
                                        <Col xs="9" sm="8">
                                            <Input readOnly defaultValue={infoCustomer ? infoCustomer.email : ""} />
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                        <Col xs="12" sm="6">
                            <Row>
                                <Col xs="12" sm="12">
                                    <Row>
                                        <Col xs="3" sm="4">
                                            <label >Địa chỉ:</label>
                                        </Col>
                                        <Col xs="9" sm="8">
                                            <Input onChange={onAddressChange} defaultValue={infoCustomer ? infoCustomer.address : ""} />
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row className="mt-2">
                        <Col xs="12" sm="6">
                            <Row>
                                <Col xs="12" sm="12">
                                    <Row>
                                        <Col xs="3" sm="4">
                                            <label >Thành phố:</label>
                                        </Col>
                                        <Col xs="9" sm="8">
                                            <Input onChange={onCityChange} defaultValue={infoCustomer ? infoCustomer.city : ""} />
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                        <Col xs="12" sm="6">
                            <Row>
                                <Col xs="12" sm="12">
                                    <Row>
                                        <Col xs="3" sm="4">
                                            <label >Quốc gia:</label>
                                        </Col>
                                        <Col xs="9" sm="8">
                                            <Input onChange={onCountryChange} defaultValue={infoCustomer ? infoCustomer.country : ""} />
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row className="mt-4 text-center">
                        <Col xs="12" sm="12">
                            <Row className="mt-4 mb-4">
                                <Col xs="7" sm="6">
                                    <Button onClick={onHoanThanhClick} className="bg-success w-75 text-white">Hoàn thành</Button>
                                </Col>
                                <Col xs="5" sm="6">
                                    <Button onClick={onBtnCancelClick} className="bg-secondary w-75 text-white">Hủy Bỏ</Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Box>
            </Modal>

            <Modal
                open={openModalConfirmOrder}
                onClose={onBtnCancelClick}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-confirm"
            >
                <Box sx={widthHandler > 500 ? style2 : styleMobile} style={{ backgroundColor: "white" }}>
                    <Typography mb={2} id="modal-modal-title" variant="h5" component="h2">
                        <i>Kiểm tra lại đơn hàng!</i><br></br>
                    </Typography>
                    <br></br>
                    <Grid container>
                        <Grid item xs={12} md={12} lg={12}>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="cart table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center">STT</TableCell>
                                            <TableCell align="center">Sản phẩm</TableCell>
                                            <TableCell align="center">Tên sản phẩm</TableCell>
                                            <TableCell align="center">Đơn giá</TableCell>
                                            <TableCell align="center">Số lượng</TableCell>
                                            <TableCell align="center">Số tiền</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {arrayProductChecked ? arrayProductChecked.map((row, index) => (
                                            <StyledTableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                <StyledTableCell align="center">{index + 1}</StyledTableCell>
                                                <StyledTableCell align="center"><img src={row.imgUrl} style={{ height: 40, width: 40 }}></img></StyledTableCell>
                                                <StyledTableCell align="center">{row.name}</StyledTableCell>
                                                <StyledTableCell align="center">{(row.price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} đ</StyledTableCell>
                                                <StyledTableCell align="center">{row.amount}</StyledTableCell>
                                                <StyledTableCell align="center">{(row.price * row.amount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} đ</StyledTableCell>
                                            </StyledTableRow >
                                        ))
                                            :
                                            null
                                        }

                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                    </Grid>
                    <Row className="mt-2">
                        <Col xs="12" sm="12">
                            <p>Tổng: <strong style={{ color: "#ee4d2d", fontSize: 30 }}>{sumMoney.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}đ</strong></p>
                        </Col>
                    </Row>
                    <Row className="mt-4 text-center">
                        <Col xs="12" sm="12">
                            <Row className="mt-2">
                                <Col xs="6" sm="6">
                                    <Button onClick={onBtnCancelClick} style={{ backgroundColor: "#ee4d2d" }} className="w-100 text-white">Hủy Bỏ</Button>
                                </Col>
                                <Col xs="6" sm="6">
                                    <Button onClick={onBtnXacNhanDatHangClick} style={{ backgroundColor: "#ee4d2d" }} className="w-100 text-white">Xác nhận</Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Box>
            </Modal>
            <Modal
                open={openModalCreateOrderSuccess}
                onClose={onBtnCancelClick}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                style={{ outline: 'none' }}
            >
                <div style={{ outline: 'none' }}>
                    <Box sx={widthHandler > 500 ? style2 : styleMobile} style={{ backgroundColor: "white" }}>
                        <Row>
                            <p>Tạo đơn hàng thành công.</p>
                            <p>Mã đơn hàng của bạn là: <strong>{orderId}</strong></p>
                        </Row>
                        <Row className="mt-4 text-center" >
                            <Col xs="12" sm="12">
                                <Row className="mt-4">
                                    <Col xs="12" sm="12">
                                        <Button onClick={onBtnCombackHomeClick} style={{ backgroundColor: "#ee4d2d" }} className="w-100 text-white">Về trang chủ</Button>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Box>
                </div>
            </Modal>
            <Snackbar style={{zIndex: 1500}} open={openAlert} autoHideDuration={3000} onClose={handleCloseAlert} anchorOrigin={{ vertical, horizontal }}>
                <Alert onClose={handleCloseAlert} severity={statusModal} sx={{ width: '100%' }}>
                    {noidungAlertValid}
                </Alert>
            </Snackbar>
        </>
    )
}

export default ThanhToan