import { Container, Nav } from "react-bootstrap"
import Logo from "../Logo"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFacebook, faInstagram, faYoutube, faTwitter } from '@fortawesome/free-brands-svg-icons'
function SocialFooter() {
    return (
        <>
            <Logo className="text-black" />
            <FontAwesomeIcon icon={faFacebook} /> <FontAwesomeIcon icon={faInstagram} className="ms-2" /> <FontAwesomeIcon icon={faYoutube} className="ms-2" /> <FontAwesomeIcon icon={faTwitter} className="ms-2" />
        </>
    )
}
export default SocialFooter