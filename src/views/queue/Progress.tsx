import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DoNotDisturbAltIcon from '@mui/icons-material/DoNotDisturbAlt';
import {Grid, LinearProgress, Stack, Typography} from '@mui/material';
import React from 'react';


interface ProgressProps {
	isDisabled: boolean;
	isDone: boolean;
	name: string;
	percent: number;
	progressIcon: React.ReactElement;
}

function Progress({isDisabled, isDone, name, percent, progressIcon}: ProgressProps) {
	return (
		<Grid container>
			<Grid item sx={{alignItems: 'center', display: 'flex'}} xs={1}>
				{isDisabled ?
					<DoNotDisturbAltIcon color={'disabled'}/>
					:
					isDone ?
						<CheckCircleIcon color={'success'}/>
						:
						progressIcon
				}
			</Grid>
			<Grid item sx={{alignItems: 'center', display: 'flex'}} xs={1}>
				<Typography color='text.secondary' variant='body2'>{name}</Typography>
			</Grid>
			<Grid item xs>
				<Stack alignItems={'center'} direction={'row'} sx={{color: 'grey.800', height: '100%', width: '100%'}}>
					<LinearProgress color={isDisabled ? 'inherit' : undefined} sx={{width: '100%'}} variant='determinate' value={isDisabled ? 0 : percent}/>
				</Stack>
			</Grid>
			<Grid item sx={{alignItems: 'center', display: 'flex', justifyContent: 'center'}} xs={1}>
				<Typography color='text.secondary' variant='body2'>{isDisabled ? '##' : percent}%</Typography>
			</Grid>
		</Grid>
	);
}

export default Progress;