
import { Grid, Pagination } from "@mui/material"
function NavigationComponent ({nopage, page, changehandlerpagi}){

    const changeHandlerComponent = (event, value) => {
        changehandlerpagi(event, value)
    }
    return (
        <Grid item xs={12} md={12} sm={12} lg={12} marginTop={5} marginBottom={5}>
            <Pagination onChange={changeHandlerComponent} count={nopage}></Pagination>
        </Grid>
    )
}

export default NavigationComponent