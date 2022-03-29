import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../Header";
import Footer from "../footer/Footer";
import ShowInfoProduct from "./ShowInfoProduct";
import BreadcrumDetailPage from "./BreadcrumDetailPage";
import ShowDescriptionProduct from "./ShowDescriptionProduct"
import RelatedProducts from "./RelatedProducts"
function DetailProductPage({ user, setAmountProductInCart, amountProductInCart, widthHandler }) {
    const { id, name } = useParams();

    const navigate = useNavigate();

    return (
        <>
            <Header widthHandler={widthHandler} setAmountProductInCart={setAmountProductInCart} amountProductInCart={amountProductInCart} user={user} />
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <BreadcrumDetailPage name={name} />
            <ShowInfoProduct widthHandler={widthHandler} setAmountProductInCart={setAmountProductInCart} amountProductInCart={amountProductInCart} user={user} id={id} />
            <br></br>
            <ShowDescriptionProduct widthHandler={widthHandler} id={id} />
            <br></br>
            <RelatedProducts widthHandler={widthHandler} id={id} />
            <Footer widthHandler={widthHandler} />
        </>
    )
}

export default DetailProductPage