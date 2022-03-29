import { Button, FormControl, MenuItem, Select, Slide } from "@mui/material"
import { minHeight } from "@mui/system"
import { useState } from "react"
import { Col, Input, Label, Row } from "reactstrap"

function FillterComponent({ changeFillterNameInputHandler, changeFillterPriceMinInputHandler, changeFillterPriceMaxInputHandler,
    valueSelectTypeProduct, onSelectProductTypeHandler, onBtnFilterClickedHandler, widthHandler
}) {
    const onInputFillerNameChange = (event) => {
        changeFillterNameInputHandler(event)

    }
    const onInputPriceMinChange = (event) => {
        changeFillterPriceMinInputHandler(event)

    }
    const onInputPriceMaxChange = (event) => {
        changeFillterPriceMaxInputHandler(event)

    }
    const onSelectProductTypeChange = (event) => {
        onSelectProductTypeHandler(event)
    }
    const onBtnFilterClick = () => {
        onBtnFilterClickedHandler()
    }
    return (
        <>
            {widthHandler > 800 ?
                <Row>
                    <Col sm="12">
                        <Label>
                            <strong>Lọc theo tên sản phẩm:</strong>
                        </Label>
                    </Col>
                    <Col sm="12" className="mb-2">
                        <Input onChange={onInputFillerNameChange} style={{ width: 180 }} />
                    </Col>
                    <Col sm="12">
                        <Label>
                            <strong>Lọc theo giá sản phẩm (VNĐ):</strong>
                        </Label>
                    </Col>
                    <Col sm="10" className="mb-2">
                        <Row>
                            <Col sm="6">
                                <Input type="number" onChange={onInputPriceMinChange} className="w-100" placeholder="min" />
                            </Col>
                            <Col sm="6">
                                <Input type="number" onChange={onInputPriceMaxChange} className="w-100" placeholder="max" />
                            </Col>
                        </Row>
                    </Col>
                    <Col sm="12">
                        <Label>
                            <strong>Lọc theo loại sản phẩm:</strong>
                        </Label>
                    </Col>
                    <Col sm="12" className="mb-5">
                        <FormControl sx={{ minWidth: 180 }}>
                            <Select
                                id="products-select"
                                value={valueSelectTypeProduct}
                                defaultValue={valueSelectTypeProduct}
                                onChange={onSelectProductTypeChange}
                            >
                                <MenuItem value="none"> <em>Chọn loại sản phẩm</em> </MenuItem>
                                <MenuItem value="Juice">Juice</MenuItem>
                                <MenuItem value="Fruits">Fruits</MenuItem>
                            </Select>
                        </FormControl>
                    </Col>
                    <Col sm="12">
                        <Button className='btn bg-success text-white w-75' onClick={onBtnFilterClick}>Lọc</Button>
                    </Col>
                </Row>
                :
                <Row>
                    <Col xs="12">
                        <Label>
                            <strong>Lọc theo tên sản phẩm:</strong>
                        </Label>
                    </Col>
                    <Col xs="12" className="mb-2">
                        <Input onChange={onInputFillerNameChange} style={{ width: "100%" }} />
                    </Col>
                    <Col xs="12">
                        <Label>
                            <strong>Lọc theo giá sản phẩm (VNĐ):</strong>
                        </Label>
                    </Col>
                    <Col xs="12" className="mb-2">
                        <Row>
                            <Col xs="6" >
                                <Input type="number" onChange={onInputPriceMinChange} style={{ width: "100%" }} placeholder="min" />
                            </Col>
                            <Col xs="6">
                                <Input type="number" onChange={onInputPriceMaxChange} style={{ width: "100%" }} placeholder="max" />
                            </Col>
                        </Row>
                    </Col>
                    <Col xs="12">
                        <Label>
                            <strong>Lọc theo loại sản phẩm:</strong>
                        </Label>
                    </Col>
                    <Col xs="12" className="mb-2">
                        <FormControl style={{ width: "100%" }}>
                            <Select
                                id="products-select"
                                value={valueSelectTypeProduct}
                                defaultValue={valueSelectTypeProduct}
                                onChange={onSelectProductTypeChange}
                            >
                                <MenuItem value="none"> <em>Chọn loại sản phẩm</em> </MenuItem>
                                <MenuItem value="Juice">Juice</MenuItem>
                                <MenuItem value="Fruits">Fruits</MenuItem>
                            </Select>
                        </FormControl>
                    </Col>
                    <Col xs="12" className="mb-4">
                        <Button className='btn bg-success text-white w-100' onClick={onBtnFilterClick}>Lọc</Button>
                    </Col>
                </Row>
            }

        </>

    )
}

export default FillterComponent