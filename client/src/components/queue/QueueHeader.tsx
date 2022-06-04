import {Divider, Stack, Typography} from '@mui/material';
import React from 'react';


function QueueHeader() {
	return (
		<React.Fragment>
			<Stack alignItems={'center'} direction={'row'} sx={{height: 64, p: 1, pt: 2}}>
				<Typography variant={'h6'}>
					Downloads queue
				</Typography>
			</Stack>
			<Divider/>
		</React.Fragment>);
}

export default QueueHeader;