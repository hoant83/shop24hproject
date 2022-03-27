import { auth, googleProvider } from '../firebase';
import { useNavigate } from "react-router-dom";
import { Alert, Box, Button, Container, FormControl, Input, Modal, Snackbar, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFacebook, faInstagram, faYoutube, faTwitter, faGoogle } from '@fortawesome/free-brands-svg-icons'
import { useEffect, useState } from "react";
import { Col, Row } from "reactstrap"
/////TRONG ĐÂY CÓ PHẦN ĐĂNG KÝ USER MỚI CHƯA VIẾT XONG
const Div = styled('div')(({ theme }) => ({
    ...theme.typography.button,

    padding: theme.spacing(1),
    textAlign: "center",
    marginTop: 0,
}));
const style2 = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    p: 4
};
    var validUserName = false;
    var validPassword = false;
    var validFullname = false;
    var validPhoneNumber = false;
    var validEmail = false;
    var validAddress = false;
    var validCity = false;
    var validCountry = false;

function LoginPage({ user, setUser, widthHandler, heightHandler }) {
    const vertical = "top"
    const horizontal = "right"
    console.log(heightHandler)
    const [openAlert, setOpenAlert] = useState(false)
    const [noidungAlertValid, setNoidungAlertValid] = useState("")
    const [statusModal, setStatusModal] = useState("error")
    const handleCloseAlert = () => {
        setOpenAlert(false)
    }

    const [openModalCreateCustomer, setOpenModalCreateCustomer] = useState(false)

    const [userNameModal, setUserNameModal] = useState("");
    const [passwordModal, setPasswordModal] = useState("");
    const [fullNameModal, setFullNameModal] = useState("");
    const [phoneNumberModal, setPhoneNumberModal] = useState("");
    const [emailModal, setEmailModal] = useState("");
    const [addressModal, setAddressModal] = useState("");
    const [cityModal, setCityModal] = useState("");
    const [countryModal, setCountryModal] = useState("");

    const [colorUserName, setColorUserName] = useState("red");
    const [charUserName, setCharUserName] = useState("x");
    const [colorPassword, setColorPassword] = useState("red");
    const [charPassword, setCharPassword] = useState("x");
    const [colorFullname, setColorFullname] = useState("red");
    const [charFullname, setCharFullname] = useState("x");
    const [colorPhoneNumber, setColorPhoneNumber] = useState("red");
    const [charPhoneNumber, setCharPhoneNumber] = useState("x");
    const [colorEmail, setColorEmail] = useState("red");
    const [charEmail, setCharEmail] = useState("x");
    const [colorAddress, setColorAddress] = useState("red");
    const [charAddress, setCharAddress] = useState("x");
    const [colorCity, setColorCity] = useState("red");
    const [charCity, setCharCity] = useState("x");
    const [colorCountry, setColorCountry] = useState("red");
    const [charCountry, setCharCountry] = useState("x");


    const onBtnCancelClick = () => {
        setOpenModalCreateCustomer(false)
    }
    const navigate = useNavigate();
    const goToHomePage = () => {
        navigate("/");
    }
    // hàm gọi api
    const getData = async (paramUrl, paramOptions = {}) => {
        const response = await fetch(paramUrl, paramOptions);
        const responseData = await response.json();
        return responseData;
    }

    const loginGoogle = () => {
        auth.signInWithPopup(googleProvider)
            .then((result) => {
                console.log(result);
                setUser(result.user);
                findEmailAPI(result.user.email, result.user.displayName) // tìm mail xem có tồn tại trên db ko
            })
            .catch((error) => {
                console.log(error)
            })

    }
    const findEmailAPI = (paramEmail, paramName) => {
        getData("http://localhost:8000/customers/" + paramEmail)
            .then((data) => {
                if (data.customer) {
                    console.log(data.customer)
                    goToHomePage()
                }
                else {
                    createCustomer(paramEmail, paramName)
                }
            })
            .catch((error) => {
                console.log(error)
                return false
            })
    }
    const createCustomer = (paramEmail, paramName) => {
        // gọi api tạo đơn hàng
        var vInfoCustomer = {
            email: paramEmail,
            fullName: paramName
        }
        const body = {
            method: 'POST',
            body: JSON.stringify(vInfoCustomer),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        }
        getData("http://localhost:8000/customers", body)
            .then((data) => {
                console.log(data)
                goToHomePage()
            })
            .catch((error) => {
                console.log(error)

            })
    }
    const onSignUpHereClick = () => {
        setStatusModal("warning");
        setNoidungAlertValid("Chức năng này tạm thời chưa kích hoạt!");
        setOpenAlert(true);
        //setOpenModalCreateCustomer(true)
    }
    const onUserNameChange = (event) => {
        var usernameRegex = /^[a-zA-Z0-9]+$/;
        var checkChar = usernameRegex.test(event.target.value);
        setUserNameModal(event.target.value);
        if(event.target.value.length > 5 && checkChar === true){
            setColorUserName("#288641");
            setCharUserName("✓");
            validUserName = true;
            console.log(validUserName)
        }
        else{
            setColorUserName("red");
            setCharUserName("x");
            validUserName = false;
            console.log(validUserName)
        }
    }
    const onPasswordChange = (event) => {
        setPasswordModal(event.target.value);
        if(event.target.value.length > 7){
            setColorPassword("#288641");
            setCharPassword("✓");
            validPassword = true;
        }
        else{
            setColorPassword("red");
            setCharPassword("x");
            validPassword = false;
        }
    }
    const onFullnameChange = (event) => {
        setFullNameModal(event.target.value);
        if(event.target.value.length > 2){
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
        var checkPhone = (filterPhone.test(event.target.value) || filterPhone2.test(event.target.value))
        setPhoneNumberModal(event.target.value);
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
    const onEmailChange = (event) => {
        const filterEmail = /^([a-zA-Z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?)$/;
        setEmailModal(event.target.value);
        if(filterEmail.test(event.target.value)){
            setColorEmail("#288641");
            setCharEmail("✓");
            validEmail = true;
        }
        else{
            setColorEmail("red");
            setCharEmail("x");
            validEmail = false;
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
    const onBtnDangKyClick = () => {
        var vCheckValidForm = validateForm();
        if(vCheckValidForm){
            getAllCustomerAndCheck()
        }
    }
    const validateForm = () => {
        console.log(validUserName)
        if(validUserName === false){
            setStatusModal("error");
            setNoidungAlertValid("User name tối thiểu 6 ký tự và chỉ chứa chữ cái không dấu và số!");
            setOpenAlert(true);
            return false;
        }
        if(validPassword === false){
            setStatusModal("error");
            setNoidungAlertValid("Password phải có tối thiểu 8 ký tự!");
            setOpenAlert(true);
            return false;
        }
        if(validFullname === false){
            setStatusModal("error");
            setNoidungAlertValid("Họ tên phải có tối thiểu 2 ký tự!");
            setOpenAlert(true);
            return false;
        }
        if(validPhoneNumber === false){
            setStatusModal("error");
            setNoidungAlertValid("Số điện thoại không đúng!");
            setOpenAlert(true);
            return false;
        }
        if(validEmail === false){
            setStatusModal("error");
            setNoidungAlertValid("Email không đúng!");
            setOpenAlert(true);
            return false;
        }
        if(validAddress === false){
            setStatusModal("error");
            setNoidungAlertValid("Địa chỉ không được rỗng!");
            setOpenAlert(true);
            return false;
        }
        if(validAddress === false){
            setStatusModal("error");
            setNoidungAlertValid("Địa chỉ không được rỗng!");
            setOpenAlert(true);
            return false;
        }
        if(validCity === false){
            setStatusModal("error");
            setNoidungAlertValid("Thành phố không được rỗng!");
            setOpenAlert(true);
            return false;
        }
        if(validCountry === false){
            setStatusModal("error");
            setNoidungAlertValid("Quốc gia không được rỗng!");
            setOpenAlert(true);
            return false;
        }
        else{
            return true;
        }
    }

    const getAllCustomerAndCheck = () => {
        getData("http://localhost:8000/customers/")
            .then((data) => {
                console.log(data)
                if(data.customer == undefined){
                    console.log("có thể tạo customer")
                }
                else{
                    for(let i = 0; i < data.customer.length; i++){
                        
                    }
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }
    const onBtnSignInClick = () => {
        setStatusModal("warning");
        setNoidungAlertValid("Chức năng này tạm thời chưa kích hoạt!");
        setOpenAlert(true);
    }
    const tiepTucLaKhachClick = () => {
        navigate("/");
    }
    return (
        <>
        <div style={{ backgroundColor: "#26a69a", backgroundSize: "cover", height: heightHandler }}>
                <Div>
                    <FormControl style={{ backgroundColor: "#e3f2fd", alignItems: "center", marginTop: 60 }}>
                    <Container>
                        <br></br>
                        <Button onClick={loginGoogle} style={{ borderRadius: 25, backgroundColor: "#b71c1c", padding: "5px 10px", fontSize: "20px", width: "90%", alignContent: "center", fontFamily: "italic" }} variant="contained"><i><FontAwesomeIcon className="text-warning me-3" icon={faGoogle} /> Sign in with <strong> Google</strong></i></Button>
                        <br></br>
                        <br></br>
                        <br></br>
                        <p>or</p>
                        <TextField className='borderRadius-Texfield' id="input-username" label="Username" variant="outlined" sx={{ width: "90%" }} />

                        <TextField className='borderRadius-Texfield' id="input-password" label="Password" variant="outlined" sx={{ width: "90%" }} />
                        <br></br>
                        <Button onClick={onBtnSignInClick} style={{ borderRadius: 25, backgroundColor: "#03a9f4", padding: "5px 10px", fontSize: "20px", width: "90%", alignContent: "center", marginBottom: 55 }} variant="contained"><i>Sign in</i></Button>
                        </Container>
                    </FormControl>
                    
                </Div>
                <p className='text-center text-white'>Don't have an account? <strong type="button" onClick={onSignUpHereClick} className='text-warning'>Sign up here</strong></p>
                
                <p className='text-center text-white text-decoration-underline' type="button" onClick={tiepTucLaKhachClick}>Tiếp tục là khách</p>
            </div>
            <Modal
                open={openModalCreateCustomer}
                onClose={onBtnCancelClick}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-confirm"
            >
                <Box sx={style2} style={{ backgroundColor: "white" }}>
                    <Typography mb={2} id="modal-modal-title" variant="h5" component="h2">
                        <i>Đăng ký!</i><br></br>
                        <small style={{ fontSize: 15 }}>Tất cả trường đều là bắt buộc.</small>
                    </Typography>
                    <br></br>
                    <Row>
                        <Col sm="6">
                            <Row>
                                <Col sm="12">
                                    <Row>
                                        <Col sm="4">
                                            <label>User name:</label>
                                        </Col>
                                        <Col sm="8">
                                            <Input defaultValue={userNameModal} placeholder='Tối thiểu 6 ký tự' onChange={onUserNameChange}/>
                                            <span style={{color: colorUserName}}>{charUserName}</span>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                        <Col sm="6">
                            <Row>
                                <Col sm="12">
                                    <Row>
                                        <Col sm="4">
                                            <label >Password:</label>
                                        </Col>
                                        <Col sm="8">
                                            <Input defaultValue={passwordModal} onChange={onPasswordChange} type='password' />
                                            <span style={{color: colorPassword}}>{charPassword}</span>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm="6">
                            <Row>
                                <Col sm="12">
                                    <Row>
                                        <Col sm="4">
                                            <label>Họ tên:</label>
                                        </Col>
                                        <Col sm="8">
                                            <Input defaultValue={fullNameModal} onChange={onFullnameChange}/>
                                            <span style={{color: colorFullname}}>{charFullname}</span>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                        <Col sm="6">
                            <Row>
                                <Col sm="12">
                                    <Row>
                                        <Col sm="4">
                                            <label >Số điện thoại:</label>
                                        </Col>
                                        <Col sm="8">
                                            <Input defaultValue={phoneNumberModal} type='number' onChange={onPhoneNumberChange}/>
                                            <span style={{color: colorPhoneNumber}}>{charPhoneNumber}</span>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row className="mt-2">
                        <Col sm="6">
                            <Row>
                                <Col sm="12">
                                    <Row>
                                        <Col sm="4">
                                            <label >Email:</label>
                                        </Col>
                                        <Col sm="8">
                                            <Input defaultValue={emailModal} onChange={onEmailChange}/>
                                            <span style={{color: colorEmail}}>{charEmail}</span>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                        <Col sm="6">
                            <Row>
                                <Col sm="12">
                                    <Row>
                                        <Col sm="4">
                                            <label >Địa chỉ:</label>
                                        </Col>
                                        <Col sm="8">
                                            <Input defaultValue={addressModal} onChange={onAddressChange}/>
                                            <span style={{color: colorAddress}}>{charAddress}</span>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row className="mt-2">
                        <Col sm="6">
                            <Row>
                                <Col sm="12">
                                    <Row>
                                        <Col sm="4">
                                            <label >Thành phố:</label>
                                        </Col>
                                        <Col sm="8">
                                            <Input defaultValue={cityModal} onChange={onCityChange}/>
                                            <span style={{color: colorCity}}>{charCity}</span>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                        <Col sm="6">
                            <Row>
                                <Col sm="12">
                                    <Row>
                                        <Col sm="4">
                                            <label >Quốc gia:</label>
                                        </Col>
                                        <Col sm="8">
                                            <Input defaultValue={countryModal} onChange={onCountryChange}/>
                                            <span style={{color: colorCountry}}>{charCountry}</span>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row className="mt-4 text-center">
                        <Col sm="12">
                            <Row className="mt-4 mb-4">
                                <Col sm="6">
                                <Button onClick={onBtnCancelClick} className="bg-success w-75 text-white">Hủy Bỏ</Button>
                                </Col>
                                <Col sm="6">
                                    <Button onClick={onBtnDangKyClick} className="bg-success w-75 text-white">Đăng ký</Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Box>
            </Modal>
            <Snackbar open={openAlert} autoHideDuration={3000} onClose={handleCloseAlert} anchorOrigin={{ vertical, horizontal }}>
                <Alert onClose={handleCloseAlert} severity={statusModal} sx={{ width: '100%' }}>
                    {noidungAlertValid}
                </Alert>
            </Snackbar>
        </>
    )
}

export default LoginPage