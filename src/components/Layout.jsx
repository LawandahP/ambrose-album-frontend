/* eslint-disable react/prop-types */
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';


const Layout = ({children}) => {
  return (
    <>
        <CssBaseline />
        <Container sx={{ py: 8 }} maxWidth="md">
            {children}
        </Container>
    </>
  )
}

export default Layout