import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

export default function Footer() {
    return (
        <Box display="flex" alignItems="center" justifyContent="center"> 
            <AppBar position="static" style={{background: 'transparent', boxShadow: 'none'}}>
                <Toolbar>
                    <Typography variant="body1" color="inherit">
                        © {new Date().getFullYear()} Linhas da Maria
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    )
}