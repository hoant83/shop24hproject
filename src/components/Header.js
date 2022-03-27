import Logo from "./Logo"
import IconNavBar from "./IconNavBar"
import { Container, Navbar } from "react-bootstrap"

function Header({ user, setAmountProductInCart, amountProductInCart, widthHandler }) {
    console.log(widthHandler)
    return (
        <Navbar fixed="top" style={{ backgroundColor: "#288641" }}>
            <Container>
                <div className="text-white">
                    <Logo />
                </div>

                <IconNavBar widthHandler={widthHandler} setAmountProductInCart={setAmountProductInCart} amountProductInCart={amountProductInCart} user={user} />
            </Container>
        </Navbar>
    )
}
export default Header