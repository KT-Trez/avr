import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {Grid, LinearProgress, Stack, Typography} from '@mui/material';
import React from 'react';


interface ProgressProps {
	isDone: boolean;
	percent: number;
	progressIcon: React.ReactElement;
}

function Progress({isDone, percent, progressIcon}: ProgressProps) {
	return (
		<Grid container>
			<Grid item sx={{alignItems: 'center', display: 'flex', pr: 1}} xs={'auto'}>
				{isDone ?
					<CheckCircleIcon color={'success'}/>
					:
					progressIcon
				}
			</Grid>
			<Grid item xs>
				<Stack alignItems={'center'} direction={'row'} sx={{color: 'grey.800', height: '100%', width: '100%'}}>
					<LinearProgress sx={{width: '100%'}} variant='determinate' value={percent}/>
				</Stack>
			</Grid>
			<Grid item sx={{alignItems: 'center', display: 'flex', justifyContent: 'center'}} xs={1}>
				<Typography color='text.secondary' variant='body2'>{percent}%</Typography>
			</Grid>
		</Grid>
	);
}

export default Progress;