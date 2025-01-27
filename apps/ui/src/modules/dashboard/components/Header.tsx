import SmartDisplayIcon from '@mui/icons-material/SmartDisplay';
import { AppBar, Toolbar, Typography } from '@mui/material';

export const MainHeader = () => (
    <AppBar position='sticky'>
      <Toolbar>
        <SmartDisplayIcon color='primary' sx={{ mr: 1 }}/>
        <Typography color='inherit' fontSize='inherit' fontWeight='bold' variant='h1'>
          YouTube Downloader
        </Typography>
      </Toolbar>
    </AppBar>
);