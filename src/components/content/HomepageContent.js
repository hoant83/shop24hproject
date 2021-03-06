import { Button } from '@mui/material';
import { Container, Navbar } from "react-bootstrap"
import React from 'react';
import CarouselComponent from "./CarouselComponent"
import LastestProducts from "./LastestProducts"
import ViewAll from "./ViewAll"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
function HomepageContent({ widthHandler }) {
    const [products, setProducts] = useState([]);
    const [hideAllViewAfterClick, setHideAllViewAfterClick] = useState("block")
    const navigate = useNavigate();

    const goToCategoriesProductPage = () => {

        navigate("/categoriesproductpage");
    }
    // hàm gọi api
    const getData = async (paramUrl, paramOptions = {}) => {
        const response = await fetch(paramUrl, paramOptions);
        const responseData = await response.json();
        return responseData;
    }
    const onViewAllClick = () => {
        // gọi api lấy thông tin tất cả products
        getData("https://shop24h-backend.herokuapp.com/products")
            .then((data) => {

                setProducts(data.products);
                setHideAllViewAfterClick("none")
            })
            .catch((error) => {
                console.log(error)
            })
    }

    useEffect(() => {
        setHideAllViewAfterClick("block")
        // gọi api lấy thông tin tất cả products
        getData("https://shop24h-backend.herokuapp.com/products?limit=8&skip=0")
            .then((data) => {

                setProducts(data.products);
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])
    return (
        <>
            <Navbar fixed='bottom'>
                <Container>
                    <Button onClick={goToCategoriesProductPage} className='btn bg-success text-white' >Đến trang sản phẩm</Button>
                </Container>
            </Navbar>
            <CarouselComponent goToCategoriesProductPage={goToCategoriesProductPage} widthHandler={widthHandler} />
            <LastestProducts widthHandler={widthHandler} products={products} />
            <div style={{ display: hideAllViewAfterClick }} className="text-center mt-5 mb-5">
                <ViewAll onViewAllClick={onViewAllClick} />
            </div>

        </>

    )

}



export default HomepageContent