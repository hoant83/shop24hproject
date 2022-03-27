import 'bootstrap/dist/css/bootstrap.min.css';
import Homapage from "./components/HomePage"
import CategoriesProductPage from "./components/danhMucSanPham/CategoriesProductPage"
import DetailProductPage from "./components/detailproduct/DetailProductPage"
import CartPage from "./components/content/cartPage/CartPage"
import './App.css';
import { Route, Routes } from 'react-router-dom';
import LoginPage from "./components/LoginPage"
import { useEffect, useState } from 'react';
import { auth, googleProvider } from './firebase';
import useWindowDimensions from './components/windowsDimensions';
function App() {
  const { height, width } = useWindowDimensions();
  const [user, setUser] = useState(null);
  const [amountProductInCart, setAmountProductInCart] = useState(0);

  useEffect(() => {
    auth.onAuthStateChanged((result) => { // khi refesh kiểm tra xem đã đăng nhập hay chưa, nếu rồi thì trả kết quả trước đó
      setUser(result); // set lại giống giá trị khi vừa đăng nhập
    })
  }, [])
  return (
    <>
      <Routes>
        <Route exact path="/categoriesproductpage" element={<CategoriesProductPage user={user} widthHandler={width} setAmountProductInCart={setAmountProductInCart} amountProductInCart={amountProductInCart} />}></Route>
        <Route exact path="/login" element={<LoginPage heightHandler={height} widthHandler={width} user={user} setUser={setUser} />}></Route>
        <Route exact path="/cart" element={<CartPage widthHandler={width} user={user} setAmountProductInCart={setAmountProductInCart} amountProductInCart={amountProductInCart} />}></Route>
        <Route exact path="/detail-product/:id/:name" element={<DetailProductPage widthHandler={width} user={user} setAmountProductInCart={setAmountProductInCart} amountProductInCart={amountProductInCart} />}></Route>
        <Route exact path="/" element={<Homapage widthHandler={width} user={user} setAmountProductInCart={setAmountProductInCart} amountProductInCart={amountProductInCart} />}></Route>
        <Route exact path="*" element={<Homapage widthHandler={width} user={user} setAmountProductInCart={setAmountProductInCart} amountProductInCart={amountProductInCart} />}></Route>
      </Routes>
    
      
    </>
  );
}

export default App;
