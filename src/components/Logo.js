import { Container, Navbar } from "react-bootstrap"
import { useNavigate } from "react-router-dom";

function Logo() {
    const navigate = useNavigate();
    const onLogoClick = () => {
        console.log("Logo được click!")
        navigate("/")
    }
    return (
        <Navbar.Brand type="button" onClick={onLogoClick}><img src="https://www.pngkey.com/png/full/307-3073999_fruit-ninja-fruit-ninja-logo.png" style={{width: 160, height: 60}}></img></Navbar.Brand>
    )
}
export default Logo