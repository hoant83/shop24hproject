import { Container } from "@mui/material"
import { Col, Row } from "reactstrap"
import FillterComponent from "./FilterComponent"
import ProductsListComponent from "./ProductListComponent"
import NavigationComponent from "./NavigationComponent"
import { useState, useEffect } from "react"
import products from "../../../data.json"
import filterProducts from "./filterProducts"
function ContentComponent({widthHandler}) {
    console.log(widthHandler)
    const [page, setPage] = useState(1);
    const [noPage, setNoPage] = useState(1);
    const [productNew, setProductNew] = useState([]);
    const limit = 3;
    const [fillterName, setFillterName] = useState("");
    const [priceMin, setPriceMin] = useState(0);
    const [priceMax, setPriceMax] = useState(1000000);
    const [valueSelectTypeProduct, setValueSelectTypeProduct] = useState("none")
    const [runOnFilter, setRunOnFilter] = useState(0)

    // hàm gọi api
    const getData = async (paramUrl, paramOptions = {}) => {
        const response = await fetch(paramUrl, paramOptions);
        const responseData = await response.json();
        return responseData;
    }

    const changeFillterNameInput = (event) => {
        setFillterName(event.target.value)
        setPage(1)
    }
    const changeFillterPriceMinInput = (event) => {
        setPriceMin(event.target.value)
        setPage(1)
    }
    const changeFillterPriceMaxInput = (event) => {
        if (event.target.value != "") {
            setPriceMax(event.target.value)
            setPage(1)
        }
        else {
            setPriceMax(1000000)
            setPage(1)
        }
    }
    const onSelectProductType = (event) => {
        setValueSelectTypeProduct(event.target.value)
        setPage(1)
        console.log(event.target.value)
    }
    const changeHandler = (event, value) => {
        setPage(value);
    }
    const onBtnFilterClicked = () => {
        setRunOnFilter(runOnFilter + 1)
    }
    useEffect(() => {
        // gọi api lấy thông tin tất cả products
        getData("http://localhost:8000/products?" + "name=" + fillterName + "&priceMin=" + priceMin + "&priceMax=" + priceMax + "&valueSelected=" + valueSelectTypeProduct)
            .then((data) => {
                console.log(data.products)
                //setProducts(data.products);
                setNoPage(Math.ceil(data.products.length / limit));
                setProductNew(data.products.slice((page - 1) * limit, page * limit));
            })
            .catch((error) => {
                console.log(error)
            })
    }, [page, runOnFilter]);
    return (
        <>
        {widthHandler > 500 ?
        <Container>
            <Row>
                <Col sm="12">
                    <Row>
                        <Col sm="3">
                            <FillterComponent changeFillterNameInputHandler={changeFillterNameInput}
                                changeFillterPriceMinInputHandler={changeFillterPriceMinInput}
                                changeFillterPriceMaxInputHandler={changeFillterPriceMaxInput}
                                onSelectProductTypeHandler={onSelectProductType}
                                valueSelectTypeProduct={valueSelectTypeProduct}
                                onBtnFilterClickedHandler={onBtnFilterClicked}
                            />
                        </Col>
                        <Col sm="9">
                            <ProductsListComponent widthHandler={widthHandler} productNew={productNew} />
                        </Col>
                    </Row>
                </Col>
                <Col sm="12" style={{ display: "flex" }}>
                    <div style={{ marginLeft: "auto" }}>
                        <NavigationComponent changehandlerpagi={changeHandler} page={page} nopage={noPage} />
                    </div>
                </Col>
            </Row>
        </Container>
        :
        <Container>
            <Row>
                <Col xs="12">
                    <Row>
                        <Col xs="12">
                            <FillterComponent widthHandler={widthHandler} changeFillterNameInputHandler={changeFillterNameInput}
                                changeFillterPriceMinInputHandler={changeFillterPriceMinInput}
                                changeFillterPriceMaxInputHandler={changeFillterPriceMaxInput}
                                onSelectProductTypeHandler={onSelectProductType}
                                valueSelectTypeProduct={valueSelectTypeProduct}
                                onBtnFilterClickedHandler={onBtnFilterClicked}
                            />
                        </Col>
                    </Row>
                </Col>
                <Col xs="12">
                    <ProductsListComponent widthHandler={widthHandler} productNew={productNew} />
                </Col>
                <Col xs="12" style={{ display: "flex" }}>
                    <div style={{ marginLeft: "auto" }}>
                        <NavigationComponent changehandlerpagi={changeHandler} page={page} nopage={noPage} />
                    </div>
                </Col>
            </Row>
        </Container>
}
        </>
    )
}

export default ContentComponent