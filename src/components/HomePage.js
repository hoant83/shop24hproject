import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./Header"
import Footer from "./footer/Footer"
import HomepageContent from "./content/HomepageContent"
import { Container } from 'react-bootstrap';


function Homapage({ user, setAmountProductInCart, amountProductInCart, widthHandler }) {
  return (

    <div>
      <Header widthHandler={widthHandler} setAmountProductInCart={setAmountProductInCart} amountProductInCart={amountProductInCart} user={user} />
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <HomepageContent widthHandler={widthHandler} />
      <br></br>
      <Footer widthHandler={widthHandler} />
    </div>
  );
}

export default Homapage;
