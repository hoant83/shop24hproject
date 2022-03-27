import Header from "../../Header"
import BreadcrumCartPage from "./BreadcrumCartPage"
import CartContent from "./CartContent"
import ThanhToan from "./ThanhToan"
import Footer from "../../footer/Footer"
import { useEffect, useState } from "react"
import { Navbar } from "react-bootstrap"
function CartPage ({user, setAmountProductInCart, amountProductInCart, widthHandler}){
    const [arrayProductChecked, setArrayProductChecked] = useState([]);
    const [amountProductChecked, setAmountProductChecked] = useState(0);
    const [sumMoney, setSumMoney] = useState(0)
    const [infoCustomer, setInfoCustomer] = useState(null);
    useEffect(() => {
        setAmountProductChecked(arrayProductChecked.length);
        var sum = 0;
        for(let i = 0; i < arrayProductChecked.length; i++){
            sum = sum + (arrayProductChecked[i].amount * arrayProductChecked[i].price)
        }
        setSumMoney(sum);
    }, [arrayProductChecked])
    return (
        <>
            <Header setAmountProductInCart={setAmountProductInCart} amountProductInCart={amountProductInCart} user={user}/>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <BreadcrumCartPage/>
            <br></br>
            <br></br>
            <CartContent
                widthHandler={widthHandler} user={user} setAmountProductInCart={setAmountProductInCart} setArrayProductChecked={setArrayProductChecked} setInfoCustomer={setInfoCustomer}/>
            <br></br>
            <br></br>
            <Navbar fixed=''>
                <ThanhToan widthHandler={widthHandler} arrayProductChecked={arrayProductChecked} amountProductChecked={amountProductChecked} sumMoney={sumMoney} infoCustomer={infoCustomer}/>
            </Navbar>
            
            <br></br>
            <br></br>
            <Footer widthHandler={widthHandler}/>
        </>
    )
}

export default CartPage