import React from 'react';
import { Button } from 'react-bootstrap';
function ViewAll({ onViewAllClick }) {
    const viewAllClick = () => {
        onViewAllClick()
    }
    return (
        <>
            <Button onClick={viewAllClick} style={{ backgroundColor: "#288641" }}>Xem tất cả</Button>
        </>

    )
}
export default ViewAll