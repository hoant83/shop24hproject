import { Alert, Button, Container, Grid, Input, Paper, Snackbar, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow } from "@mui/material"
import { useEffect, useState } from "react"

function CartContent({ user, setAmountProductInCart, setArrayProductChecked, setInfoCustomer, widthHandler }) {
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const StyledTableCell1 = styled(TableCell)(({ theme }) => ({
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


    const [allCartList, setAllCartList] = useState(null)
    const [varRefeshPage, setVarRefeshPage] = useState(0)
    const [customerIdState, setCustomerIdState] = useState("");
    // hàm gọi api
    const getData = async (paramUrl, paramOptions = {}) => {
        const response = await fetch(paramUrl, paramOptions);
        const responseData = await response.json();
        return responseData;
    }
    useEffect(() => {
        if (user) {
            findEmailAPI(user.email)
        }

    }, [user, varRefeshPage])

    const findEmailAPI = (paramEmail) => {
        getData("https://shop24h-backend.herokuapp.com/customers/" + paramEmail)
            .then((data) => {
                setInfoCustomer(data.customer[0])
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
                console.log(cartsList)
                setAmountProductInCart(cartsList.length)
                setAllCartList(cartsList)
                cacutatorPriceAndAmount(cartsList)
            })
            .catch((error) => {
                console.log(error)
            })
    }
    const onBtnDeleteClick = (row) => {
        console.log(row)
        // gọi api delete order
        const vURL_DELETE = 'https://shop24h-backend.herokuapp.com/carts/' + customerIdState + "/" + row._id
        fetch(vURL_DELETE, { method: 'DELETE' })
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }
                setVarRefeshPage(varRefeshPage + 1)
            })
            .catch(error => {
                console.log(error)
            });
    }
    const onBtnCongClick = (row) => {
        const number = 1
        getApiUpdateCart(row, number, row.isChecked)
    }
    const onBtnTruClick = (row) => {
        const number = -1
        getApiUpdateCart(row, number, row.isChecked)
    }
    const getApiUpdateCart = (row, number, check) => {
        var dataCart = {
            amount: row.amount + number,
            isChecked: check
        }
        if (dataCart.amount > 0) {
            const body = {
                method: 'PUT',
                body: JSON.stringify(dataCart),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                }
            }
            getData("https://shop24h-backend.herokuapp.com/carts/" + row._id, body)
                .then((data) => {
                    console.log(data)
                    setVarRefeshPage(varRefeshPage + 1)
                })
                .catch((error) => {
                    console.log(error)
                })
        }

    }
    const onCheckBoxClick = (row, event, position) => {
        console.log(event.target.checked)
        console.log(row)
        console.log(position)
        getApiUpdateCart(row, 0, !row.isChecked)
    }

    const cacutatorPriceAndAmount = (cartsList) => {
        var subProductChecked = []
        for (let i = 0; i < cartsList.length; i++) {
            if (cartsList[i].isChecked) {
                subProductChecked.push(cartsList[i])
            }
        }
        console.log(subProductChecked)
        setArrayProductChecked(subProductChecked)
    }
    return (
        <>{
            widthHandler > 500 ? 
            <Container>
                <Grid container>
                    <Grid item xs={12} md={12} lg={12}>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="cart table">
                                <TableHead>
                                    <TableRow style={{ backgroundColor: "#ffeb3b" }}>
                                        <TableCell align="center">Chọn</TableCell>
                                        <TableCell align="center">Sản phẩm</TableCell>
                                        <TableCell align="center">Tên</TableCell>
                                        <TableCell align="center">Đơn giá</TableCell>
                                        <TableCell align="center">Số lượng</TableCell>
                                        <TableCell align="center">Số tiền</TableCell>
                                        <TableCell align="center">Thao tác</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {allCartList ? allCartList.map((row, index) => (
                                        <StyledTableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                            <StyledTableCell align="center">
                                                <input style={{ height: 20, width: 20 }} type="checkbox" id={row.productId} checked={row.isChecked} onChange={(event) => { onCheckBoxClick(row, event, index) }} />
                                            </StyledTableCell>
                                            <StyledTableCell align="center"><img src={row.imgUrl} style={{ height: 60, width: 60 }}></img></StyledTableCell>
                                            <StyledTableCell align="center">{row.name}</StyledTableCell>
                                            <StyledTableCell align="center">{(row.price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}đ</StyledTableCell>
                                            <StyledTableCell align="center">
                                                <Button onClick={() => { onBtnTruClick(row) }}>-</Button>
                                                {row.amount}
                                                <Button onClick={() => { onBtnCongClick(row) }}>+</Button>
                                            </StyledTableCell>

                                            <StyledTableCell align="center">{(row.price * row.amount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}đ</StyledTableCell>

                                            <StyledTableCell align="center">
                                                <Button value={index} onClick={() => { onBtnDeleteClick(row) }} style={{ borderRadius: 25, backgroundColor: "#288641", padding: "10px 20px", fontSize: "10px" }} variant="contained">Xóa</Button>
                                            </StyledTableCell>
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
            </Container>
            :
            <Container>
                <Grid container>
                    <Grid item xs={12}>
                        <TableContainer component={Paper}>
                            <Table xs={{ minWidth: 10 }} aria-label="cart table">
                                <TableHead>
                                    <TableRow style={{ backgroundColor: "#ffeb3b" }}> 
                                        <TableCell  align="center">Chọn</TableCell>
                                        <TableCell  align="center">Sản phẩm</TableCell>
                                        <TableCell  align="center">Tên</TableCell>
                                        <TableCell  align="center">Đơn giá</TableCell>
                                        <TableCell  align="center">Số lượng</TableCell>
                                        <TableCell  align="center">Số tiền</TableCell>
                                        <TableCell  align="center">Thao tác</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {allCartList ? allCartList.map((row, index) => (
                                        <StyledTableRow key={index}   xs={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                            <StyledTableCell1 align="center">
                                                <input style={{ height: 10, width: 10 }} type="checkbox" id={row.productId} checked={row.isChecked} onChange={(event) => { onCheckBoxClick(row, event, index) }} />
                                            </StyledTableCell1>
                                            <StyledTableCell1 align="center"><img src={row.imgUrl} style={{ height: 30, width: 30 }}></img></StyledTableCell1>
                                            <StyledTableCell1 align="center">{row.name}</StyledTableCell1>
                                            <StyledTableCell1 align="center">{(row.price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}đ</StyledTableCell1>
                                            <StyledTableCell1 align="center" >
                                                <div style={{display: "inline-flex"}}>
                                                    <Button onClick={() => { onBtnTruClick(row) }}>-</Button>
                                                    <span className="mt-2">{row.amount}</span>
                                                    <Button onClick={() => { onBtnCongClick(row) }}>+</Button>
                                                </div>
                                                
                                            </StyledTableCell1>

                                            <StyledTableCell1 align="center">{(row.price * row.amount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}đ</StyledTableCell1>

                                            <StyledTableCell1 align="center">
                                                <Button value={index} onClick={() => { onBtnDeleteClick(row) }} style={{backgroundColor: "#288641", padding: "5px 5px", fontSize: "7px" }} variant="contained">Xóa</Button>
                                            </StyledTableCell1>
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
            </Container>
        }
            
        </>
    )
}

export default CartContent