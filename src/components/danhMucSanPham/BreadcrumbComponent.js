
import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { Container } from '@mui/material';
import { useNavigate } from "react-router-dom";

function handleClick(event) {
  event.preventDefault();

}

export default function BreadcrumComponent() {
  const navigate = useNavigate();
  const onHomeClick = () => {
    console.log("Home Breadcrumb được click!")
    navigate("/")
  }
  return (
    <Container>
      <div role="presentation" onClick={handleClick}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            underline="hover"
            color="inherit"
            onClick={onHomeClick}
            type="button"
          >
            Home
          </Link>
          <Typography color="text.primary">All Products</Typography>
        </Breadcrumbs>
      </div>
    </Container>
  );
}
