import Header from "../Header"
import Footer from "../footer/Footer"
import { Container } from "react-bootstrap"
import BreadcrumComponent from "./BreadcrumbComponent"
import ContentComponent from "./categoriesContent/ContentComponent"
function CategoriesProductPage ({user, setAmountProductInCart, amountProductInCart, widthHandler}){
    return (
        <>
            <Container>
                <Header widthHandler={widthHandler} setAmountProductInCart={setAmountProductInCart} amountProductInCart={amountProductInCart} user={user}/>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <BreadcrumComponent/>
                <br></br>
                <br></br>
                <ContentComponent widthHandler={widthHandler}/>
                <br></br>
            </Container>
            <Footer widthHandler={widthHandler}/>
        </>
    )
}

export default CategoriesProductPage