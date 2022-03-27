import { Container, Nav } from "react-bootstrap"


function InfoFooter2 (){
    return (
        <Container>
            <Nav>
                <Nav.Item>
                <Nav.Link><h6 className="text-black">SERVICES</h6></Nav.Link>
                    <Nav.Link className="text-black">Help Center</Nav.Link>
                    <Nav.Link className="text-black">Contact Us</Nav.Link>
                    <Nav.Link className="text-black">Product Help</Nav.Link>
                    <Nav.Link className="text-black">Warranty</Nav.Link>
                    <Nav.Link className="text-black">Order Status</Nav.Link>
                </Nav.Item>
            </Nav>
            
        </Container>
    )
}
export default InfoFooter2