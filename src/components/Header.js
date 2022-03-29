import Logo from "./Logo"
import IconNavBar from "./IconNavBar"
import { Container, Navbar } from "react-bootstrap"

function Header({ user, setAmountProductInCart, amountProductInCart, widthHandler }) {

    return (
        <>
            {
                widthHandler > 1280 ?
                    <Navbar fixed="top" style={{ backgroundColor: "#288641" }}>
                        <Container style={{ backgroundColor: "none" }}>
                            <Logo widthHandler={widthHandler} />
                            <marquee scrollamount="9" width="55%" className="ms-5 text-white"><h5>Mừng Lễ Phục Sinh - giảm 5% cho tất cả sản phẩm (đã giảm vào giá bán)</h5></marquee>
                            <IconNavBar widthHandler={widthHandler} setAmountProductInCart={setAmountProductInCart} amountProductInCart={amountProductInCart} user={user} />
                        </Container>
                    </Navbar>
                    :
                    <Navbar fixed="top" style={{ backgroundColor: "#288641" }}>
                        <Container style={{ backgroundColor: "none" }}>
                            <Logo widthHandler={widthHandler} />
                            <IconNavBar widthHandler={widthHandler} setAmountProductInCart={setAmountProductInCart} amountProductInCart={amountProductInCart} user={user} />
                        </Container>
                    </Navbar>
            }

        </>
    )
}
export default Header