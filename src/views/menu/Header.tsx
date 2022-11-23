import SmartDisplayIcon from '@mui/icons-material/SmartDisplay';
import {AppBar, Toolbar, Typography} from '@mui/material';
import React from 'react';


export default function Header() {
	return (
		<AppBar position='sticky'>
			<Toolbar variant='dense'>
				<SmartDisplayIcon color={'primary'} sx={{mr: 1}}/>
				<Typography color='inherit' variant='h6'>
					YouTube Downloader
				</Typography>
			</Toolbar>
		</AppBar>
	);
}