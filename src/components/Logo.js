import { Container, Navbar } from "react-bootstrap"
import { useNavigate } from "react-router-dom";

function Logo({widthHandler}) {
    const navigate = useNavigate();
    const onLogoClick = () => {
        navigate("/")
        window.scrollTo(0, 0);
    }
    return (
        <>
        {
        
            widthHandler > 800 ?
            <div>
                <Navbar.Brand type="button" onClick={onLogoClick}><img className="me-5" src="https://www.pngkey.com/png/full/307-3073999_fruit-ninja-fruit-ninja-logo.png" style={{width: 160, height: 60}}></img></Navbar.Brand>
            </div> 
            :
            <div>
                <Navbar.Brand onClick={onLogoClick}><img src="https://www.pngkey.com/png/full/307-3073999_fruit-ninja-fruit-ninja-logo.png" style={{width: 120, height: 48}}></img></Navbar.Brand>
            </div> 
        }
        </>
        
    )
}
export default Logo