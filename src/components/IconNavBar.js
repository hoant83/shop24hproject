import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Container, Navbar } from "react-bootstrap"
import { faBell, faCircleUser, faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { useNavigate, useParams } from "react-router-dom";
import { Snackbar, Alert, Box, Grid, Menu, MenuItem, Modal, Table, tableCellClasses, TableBody, Paper, TableCell, styled, TableContainer, TableHead, TableRow, Typography, Button, Input } from "@mui/material";
import { useEffect, useState } from 'react';
import { auth, googleProvider } from '../firebase';
import CartPage from "./content/cartPage/CartPage"
import { Col, Row } from "reactstrap";
const dtfUS = new Intl.DateTimeFormat('uk', { day: '2-digit', month: '2-digit', year: 'numeric'});

var validFullname = false;
var validPhoneNumber = false;
var validAddress = false;
var validCity = false;
var validCountry = false;
function IconNavBar({ user, setAmountProductInCart, amountProductInCart, widthHandler }) {
    const vertical = "top"
    const horizontal = "right"
    console.log(widthHandler)
    const style2 = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 1000,
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
    const [openAlert, setOpenAlert] = useState(false)
    const [noidungAlertValid, setNoidungAlertValid] = useState("")
    const [statusModal, setStatusModal] = useState("error")

    const handleCloseAlert = () => {
        setOpenAlert(false)
    }
    const [colorFullname, setColorFullname] = useState("red");
    const [charFullname, setCharFullname] = useState("x");
    const [colorPhoneNumber, setColorPhoneNumber] = useState("red");
    const [charPhoneNumber, setCharPhoneNumber] = useState("x");
    const [colorAddress, setColorAddress] = useState("red");
    const [charAddress, setCharAddress] = useState("x");
    const [colorCity, setColorCity] = useState("red");
    const [charCity, setCharCity] = useState("x");
    const [colorCountry, setColorCountry] = useState("red");
    const [charCountry, setCharCountry] = useState("x");

    const [openModalSeeOrderBought, setOpenModalSeeOrderBought] = useState(false)
    const [openModalDetailOrder, setOpenModalDetailOrder] = useState(false)
    const [openModalInfoCustomer, setOpenModalInfoCustomer] = useState(false)
    const [arrayProductBought, setArrayProductBought] = useState(null)
    const [arrayProductState, setArrayProductState] = useState(null)
    const [customerIdState, setCustomerIdState] = useState("")
    const [orderIdModal, setOrderIdModal] = useState("")
    const [orderDetailModal, setOrderDetailModal] = useState(null)
    const [sumMoney, setSumMoney] = useState(null)

    const [fullNameModal, setFullNameModal] = useState("");
    const [phoneNumberModal, setPhoneNumberModal] = useState("");
    const [addressModal, setAddressModal] = useState("");
    const [cityModal, setCityModal] = useState("");
    const [countryModal, setCountryModal] = useState("");
    const [infoCustomer, setInfoCustomer] = useState(null);

    const onCloseModalSeeOrderBoughtClick = () => {
        setOpenModalSeeOrderBought(false)
    }
    const onBtnCloseModalInFoCusTomerClick = () => {
        setOpenModalInfoCustomer(false)
    }
    const onCloseModalDetailOrderClick = () => {
        setOpenModalDetailOrder(false)
        setArrayProductState(null);
    }
    const navigate = useNavigate();
    const goToLoginPage = () => {
        navigate("/login");
    }
    const goToCartPage = () => {
        navigate("/cart");
    }

    // hàm gọi api
    const getData = async (paramUrl, paramOptions = {}) => {
        const response = await fetch(paramUrl, paramOptions);
        const responseData = await response.json();
        return responseData;
    }
    const onLogOutClick = () => {
        auth.signOut()
            .then(() => {
                //setUser(null)
            })
            .catch((error) => {
                console.log(error)
            })
    }
    // khối menuItem
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        if (user) {
            findEmailAPI(user.email)
        }
    }, [user])
    const findEmailAPI = (paramEmail, paramName) => {
        getData("https://shop24h-backend.herokuapp.com/customers/" + paramEmail)
            .then((data) => {
                setInfoCustomer(data.customer[0])
                setFullNameModal(data.customer[0].fullName)
                setPhoneNumberModal(data.customer[0].phoneNumber)
                setAddressModal(data.customer[0].address)
                setCityModal(data.customer[0].city)
                setCountryModal(data.customer[0].country)
                console.log(data.customer[0])
                let customerId = data.customer[0]._id
                console.log(customerId)
                setCustomerIdState(customerId)
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
                console.log(cartsList.length)
                setAmountProductInCart(cartsList.length)
            })
            .catch((error) => {
                console.log(error)
            })
    }
    const onCartClick = () => {
        handleClose()
        goToCartPage()
    }
    const onOrderBoughtClick = () => {
        handleClose()
        setOpenModalSeeOrderBought(true)
        callApiGetOrderById()
    }
    const callApiGetOrderById = () => {
        console.log(customerIdState)
        getData("https://shop24h-backend.herokuapp.com/orders/" + customerIdState + "/allOrders")
            .then((data) => {
                console.log(data)
                if(data.orders){
                    var arrayMoney = [];
                    for(let i = 0; i < data.orders.length; i++){
                        sumMoneyBigOrder(data.orders[i]._id, arrayMoney, data.orders.length)
                    }
                    setArrayProductBought(data.orders)
                    console.log(data.orders)
                }
                
            })
            .catch((error) => {
                console.log(error)
            })
    }
    const sumMoneyBigOrder = (paramOrderId, arrayMoney, lengthOfOrders) => {
        console.log(paramOrderId)
        var moneyOfOrder = 0;
        getData("https://shop24h-backend.herokuapp.com/orders/" + paramOrderId + "/orderDetails")
            .then((data) => {
                console.log(data)
                for(let i = 0; i< data.Order.orderDetails.length; i++){
                    console.log(data.Order.orderDetails[i].priceEach)
                    console.log(data.Order.orderDetails[i].quantity)
                    moneyOfOrder = moneyOfOrder + (parseInt(data.Order.orderDetails[i].priceEach)*parseInt(data.Order.orderDetails[i].quantity))
                }
                arrayMoney.push(moneyOfOrder)
                console.log(arrayMoney)
                if(arrayMoney.length===lengthOfOrders){
                    setSumMoney(arrayMoney)
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }
    const onDetailClick = (paramOrderId) => {
        console.log(paramOrderId)
        setOrderIdModal(paramOrderId)
        setOpenModalDetailOrder(true)
        getData("https://shop24h-backend.herokuapp.com/orders/" + paramOrderId + "/orderDetails")
            .then((data) => {
                console.log(data)
                setOrderDetailModal(data.Order.orderDetails)
                var orderDetail = data.Order.orderDetails
                console.log(orderDetail)
                var arrayProduct = [];
                for(let i = 0; i< orderDetail.length; i++){
                    callApiGetInfoProducts(orderDetail[i].product, arrayProduct, orderDetail.length)
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }
    const callApiGetInfoProducts = (paramProductId, arrayProduct, lengthOrderDetail) => {
        getData("https://shop24h-backend.herokuapp.com/products/" + paramProductId)
            .then((data) => {
                arrayProduct.push(data.product)
                if(arrayProduct.length == lengthOrderDetail){
                    console.log(arrayProduct)
                    setArrayProductState(arrayProduct)
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }
    const onFullnameChange = (event) => {
        setFullNameModal(event.target.value);
        if(event.target.value.length > 2 || fullNameModal.length > 2){
            setColorFullname("#288641");
            setCharFullname("✓");
            validFullname = true;
        }
        else{
            setColorFullname("red");
            setCharFullname("x");
            validFullname = false;
        }
    }
    const onPhoneNumberChange = (event) => {
        const filterPhone = /([\+84|84|0]+(3|5|7|8|9|1[2|6|8|9]))+([0-9]{8})\b/
        const filterPhone2 = /(([02]))+([0-9]{9})\b/
        setPhoneNumberModal(event.target.value);
        var checkPhone = (filterPhone.test(event.target.value) || filterPhone2.test(event.target.value))
        if(checkPhone){
            setColorPhoneNumber("#288641");
            setCharPhoneNumber("✓");
            validPhoneNumber = true;
        }
        else{
            setColorPhoneNumber("red");
            setCharPhoneNumber("x");
            validPhoneNumber = false;
        }
    }
    const onAddressChange = (event) => {
        setAddressModal(event.target.value);
        if(event.target.value != ""){
            setColorAddress("#288641");
            setCharAddress("✓");
            validAddress = true;
        }
        else{
            setColorAddress("red");
            setCharAddress("x");
            validAddress = false;
        }
    }
    const onCityChange = (event) => {
        setCityModal(event.target.value);
        if(event.target.value != ""){
            setColorCity("#288641");
            setCharCity("✓");
            validCity = true;
        }
        else{
            setColorCity("red");
            setCharCity("x");
            validCity = false;
        }
    }
    const onCountryChange = (event) => {
        setCountryModal(event.target.value);
        if(event.target.value != ""){
            setColorCountry("#288641");
            setCharCountry("✓");
            validCountry = true;
        }
        else{
            setColorCountry("red");
            setCharCountry("x");
            validCountry = false;
        }
    }
    const onInfoAccountClick = () => {
        handleClose();
        setOpenModalInfoCustomer(true)
        if(fullNameModal.length > 2){
            setColorFullname("#288641");
            setCharFullname("✓");
            validFullname = true;
        }
        const filterPhone = /([\+84|84|0]+(3|5|7|8|9|1[2|6|8|9]))+([0-9]{8})\b/
        const filterPhone2 = /(([02]))+([0-9]{9})\b/
        var checkPhone = (filterPhone.test(phoneNumberModal) || filterPhone2.test(phoneNumberModal))
        if(checkPhone){
            setColorPhoneNumber("#288641");
            setCharPhoneNumber("✓");
            validPhoneNumber = true;
        }
        if(addressModal != ""){
            setColorAddress("#288641");
            setCharAddress("✓");
            validAddress = true;
        }
        if(cityModal != ""){
            setColorCity("#288641");
            setCharCity("✓");
            validCity = true;
        }
        if(countryModal != ""){
            setColorCountry("#288641");
            setCharCountry("✓");
            validCountry = true;
        }
    }
    const onUpdateModalInFoCustomerClick = () => {
        console.log(infoCustomer._id)
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
                    onBtnCloseModalInFoCusTomerClick();
                    

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
        if(validFullname == false || validPhoneNumber == false || validAddress == false || validCity == false || validCountry == false){
            return false;
        }
        else{
            return true;
        }
    }
    return (
        <>
            
                <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
            {
                widthHandler > 800 ? 
                <Navbar.Text style={{ fontSize: 20 }}>
                    {(user == undefined || user == null) ? <div><FontAwesomeIcon type="button" onClick={goToLoginPage} className="text-warning ms-2" icon={faCircleUser} /> <small type="button" onClick={goToLoginPage} className="ms-2 mr-2 text-white">Đăng nhập</small>
                        <FontAwesomeIcon className="text-warning ms-2 mr-2" icon={faBell} />
                        <FontAwesomeIcon className="text-danger ms-2" icon={faCartShopping} type="button" onClick={goToLoginPage} />
                    </div>

                        : <div>
                            <img
                                id="user"
                                aria-controls={open ? 'user-menu' : undefined}

                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}
                                src={user.photoURL} style={{ width: 30, height: 30, borderRadius: 30 }}
                            >
                            </img>
                            <small
                                id="user"
                                aria-controls={open ? 'user-menu' : undefined}
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}
                                type="button" className="ms-2 mr-2"
                                style={{ color: "#FFFFFF" }}
                            >
                                {user.displayName}
                            </small>

                            <Menu
                                id="user-menu"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                MenuListProps={{
                                    'aria-labelledby': 'user',
                                }}
                                
                            >
                                <MenuItem style={{fontSize: 14}} onClick={onInfoAccountClick}>Thông tin tài khoản</MenuItem>
                                <MenuItem style={{fontSize: 14}} onClick={onOrderBoughtClick}>Đơn hàng đã mua</MenuItem>
                                <MenuItem style={{fontSize: 14}} onClick={onLogOutClick}>Đăng xuất</MenuItem>
                            </Menu>
                            <FontAwesomeIcon className="text-warning ms-2 mr-2" icon={faBell} />
                            <FontAwesomeIcon style={{ color: "#FFFFFF" }} className="ms-2" icon={faCartShopping} type="button" onClick={onCartClick} />
                            <span className='badge badge-warning' id='lblCartCount'> {amountProductInCart} </span>
                        </div>
                    }

                </Navbar.Text>
                : 
                <Navbar.Text style={{ fontSize: 18 }}>
                    {(user == undefined || user == null) ? <div><FontAwesomeIcon style={{backgroundColor: "none"}} onClick={goToLoginPage} className="text-warning ms-2" icon={faCircleUser} /> <small onClick={goToLoginPage} className="ms-2 mr-2 text-white">Đăng nhập</small>
        
                        <FontAwesomeIcon className="text-danger ms-2" icon={faCartShopping} onClick={goToLoginPage} />
                    </div>

                        : <div style={{display: "inline"}}>
                            <img
                                id="user"
                                aria-controls={open ? 'user-menu' : undefined}
                                className="mb-1"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}
                                src={user.photoURL} style={{ width: 20, height: 20, borderRadius: 40 }}
                            >
                            </img>
                            <Menu
                                id="user-menu"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                MenuListProps={{
                                    'aria-labelledby': 'user',
                                }}
                                
                            >
                                <MenuItem style={{fontSize: 14}} onClick={onInfoAccountClick}>Thông tin tài khoản</MenuItem>
                                <MenuItem style={{fontSize: 14}} onClick={onOrderBoughtClick}>Đơn hàng đã mua</MenuItem>
                                <MenuItem style={{fontSize: 14}} onClick={onLogOutClick}>Đăng xuất</MenuItem>
                            </Menu>
                            <FontAwesomeIcon className="text-warning ms-2 mr-2" icon={faBell} />
                            <FontAwesomeIcon style={{ color: "#FFFFFF" }} className="ms-2" icon={faCartShopping} onClick={onCartClick} />
                            <span className='badge badge-warning' id='lblCartCount'> {amountProductInCart} </span>
                        </div>
                    }

                </Navbar.Text>
                }
            </Navbar.Collapse>
                
            
            
            
            

            <Modal
                open={openModalSeeOrderBought}
                onClose={onCloseModalSeeOrderBoughtClick}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-confirm"
                style={{borderRadius: 10}}
            >
                <Box sx={widthHandler > 800 ? style2 : styleMobile} style={{ backgroundColor: "white" }}>
                    <Typography mb={2} id="modal-modal-title" variant="h5" component="h2">
                        <strong>Đơn hàng đã mua!</strong><br></br>
                    </Typography>
                    
                    <Grid container>
                        <Grid item xs={12} md={12} lg={12}>
                            
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="cart table">
                                    <TableHead >
                                        <TableRow>
                                            <TableCell  align="center">STT</TableCell>
                                            <TableCell  align="center">Mã đơn hàng</TableCell>
                                            <TableCell  align="center">Số sản phẩm</TableCell>
                                            <TableCell  align="center">Trạng thái</TableCell>
                                            <TableCell  align="center">Số Tiền</TableCell>
                                            <TableCell  align="center">Ngày đặt hàng</TableCell>
                                            <TableCell  align="center">Thao tác</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {arrayProductBought ? arrayProductBought.map((row, index) => (
                                            <StyledTableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                <StyledTableCell align="center">{index + 1}</StyledTableCell>
                                                <StyledTableCell align="center">{row._id}</StyledTableCell>
                                                <StyledTableCell align="center">{row.orderDetails.length}</StyledTableCell>
                                                <StyledTableCell align="center">{row.status == 0 ? "Đã tiếp nhận" : row.status == 1 ? "Đang giao" : row.status == 2 ? "Đã giao thành công" : "Đã hủy" }</StyledTableCell>
                                                <StyledTableCell align="center">{sumMoney ? (sumMoney[index]).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0}đ</StyledTableCell>
                                                <StyledTableCell align="center">{dtfUS.format(new Date(row.orderDate))}</StyledTableCell>
                                                <StyledTableCell align="center">
                                                    <Button onClick={() => { onDetailClick(row._id) }}>Chi tiết</Button>
                                                </StyledTableCell>
                                                
                                            </StyledTableRow >
                                        ))
                                            :
                                            <StyledTableRow>
                                                <StyledTableCell>Bạn không có đơn hàng nào!</StyledTableCell>
                                                <StyledTableCell></StyledTableCell>
                                                <StyledTableCell></StyledTableCell>
                                                <StyledTableCell></StyledTableCell>
                                                <StyledTableCell></StyledTableCell>
                                                <StyledTableCell></StyledTableCell>
                                                
                                            </StyledTableRow>
                                        }

                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                    </Grid>
                    <Row className="mt-2">
                        <Col sm="12">
                            {/* <p>Tổng: <strong style={{ color: "#ee4d2d", fontSize: 30 }}>{sumMoney.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}đ</strong></p> */}
                        </Col>
                    </Row>
                    <Row className="mt-4 text-center">
                        <Col sm="12">
                            <Row className="mt-2">
                                <Col sm="12">
                                    <Button onClick={onCloseModalSeeOrderBoughtClick} style={{ backgroundColor: "#ee4d2d" }} className="w-100 text-white">Đóng</Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Box>
            </Modal>
            <Modal
                open={openModalDetailOrder}
                onClose={onCloseModalDetailOrderClick}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-confirm"
                style={{borderRadius: 10}}
            >
                <Box sx={widthHandler > 800 ? style2 : styleMobile} style={{ backgroundColor: "white" }}>
                    <Typography mb={2} id="modal-modal-title" variant="h5" component="h2">
                        <strong>Chi tiết mã đơn hàng {orderIdModal}</strong><br></br>
                    </Typography>
                    <br></br>
                    <Grid container>
                        <Grid item xs={12} md={12} lg={12}>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="cart table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center">STT</TableCell>
                                            <TableCell  align="center">Sản phẩm</TableCell>
                                            <TableCell  align="center">Tên sản phẩm</TableCell>
                                            <TableCell  align="center">Đơn giá</TableCell>
                                            <TableCell  align="center">Số lượng sản phẩm</TableCell>
                                            <TableCell  align="center">Số Tiền</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {orderDetailModal ? orderDetailModal.map((row, index) => (
                                            <StyledTableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                <StyledTableCell align="center">{index + 1}</StyledTableCell>
                                                <StyledTableCell align="center"><img src={arrayProductState ? arrayProductState[index].imageUrl[0] : ""} style={{ height: 40, width: 40 }}></img></StyledTableCell>
                                                <StyledTableCell align="center">{arrayProductState ? arrayProductState[index].name : ""}</StyledTableCell>
                                                <StyledTableCell align="center">{(row.priceEach).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} vnđ</StyledTableCell>
                                                <StyledTableCell align="center">{row.quantity}</StyledTableCell>
                                                
                                                <StyledTableCell align="center">{(row.quantity*row.priceEach).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} vnđ</StyledTableCell>
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
                        <Col sm="12">
                            {/* <p>Tổng: <strong style={{ color: "#ee4d2d", fontSize: 30 }}>{sumMoney.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}đ</strong></p> */}
                        </Col>
                    </Row>
                    <Row className="mt-4 text-center">
                        <Col sm="12">
                            <Row className="mt-2">
                                <Col sm="12">
                                    <Button onClick={onCloseModalDetailOrderClick} style={{ backgroundColor: "#ee4d2d" }} className="w-100 text-white">Đóng</Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Box>
            </Modal>
            <Modal
                open={openModalInfoCustomer}
                onClose={onBtnCloseModalInFoCusTomerClick}
                aria-labelledby="modal-modal-info"
                aria-describedby="modal-modal-info"
            >
                <Box sx={widthHandler > 800 ? style2 : styleMobile} style={{ backgroundColor: "white" }}>
                    <Typography mb={2} id="modal-modal-info" variant="h5" component="h2">
                        <strong>Thông tin tài khoản</strong>
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
                                            <span style={{color: colorFullname}}>{charFullname}</span>
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
                                            <span style={{color: colorPhoneNumber}}>{charPhoneNumber}</span>
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
                                            <span style={{color: colorAddress}}>{charAddress}</span>
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
                                            <span style={{color: colorCity}}>{charCity}</span>
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
                                            <span style={{color: colorCountry}}>{charCountry}</span>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row className="mt-4 text-center">
                        <Col xs="12" sm="12">
                            <Row className="mt-4 mb-4">
                                <Col xs="6" sm="6">
                                    <Button onClick={onBtnCloseModalInFoCusTomerClick} className="bg-success w-75 text-white">Hủy Bỏ</Button>
                                </Col>
                                <Col xs="6" sm="6">
                                <Button onClick={onUpdateModalInFoCustomerClick} className="bg-success w-75 text-white">Update</Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Box>
            </Modal>
            <div style={{ zIndex: 5000 }}>
                <Snackbar open={openAlert} autoHideDuration={3000} onClose={handleCloseAlert} anchorOrigin={{ vertical, horizontal }} >
                    <Alert onClose={handleCloseAlert} severity={statusModal} sx={{ width: '100%' }}>
                        {noidungAlertValid}
                    </Alert>
                </Snackbar>
            </div>
            
        </>
    )
}
export default IconNavBar