import products from "../../../data.json"

function filterProducts(fillterName, PriceMin, PriceMax, valueSelectTypeProduct) {
    // hàm định dạng số 1000 => 1.000
    const removeAccents = (str) => {
        return str.normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/đ/g, 'd').replace(/Đ/g, 'D');
    }
    // lọc 3 bước
    var subArrayProduct1 = []
    var subArrayProduct2 = []
    var subArrayProduct3 = []
    // b1: lọc theo tên
    products.map((product1, index, products) => {
        if (removeAccents(product1.name.toLowerCase()).includes(removeAccents(fillterName.toLowerCase()))) {
            subArrayProduct1.push(product1)
        }
    })
    //b2: lọc theo giá
    subArrayProduct1.map((product2, index, subArrayProduct1) => {
        if ((product2.promotionPrice >= PriceMin) && (product2.promotionPrice <= PriceMax)) {
            subArrayProduct2.push(product2)
        }
    })
    //b3: lọc theo loại
    subArrayProduct2.map((product3, index, subArrayProduct2) => {
        if (product3.type === valueSelectTypeProduct || valueSelectTypeProduct === "none") {
            subArrayProduct3.push(product3)
        }
    })
    return subArrayProduct3
}

export default filterProducts

