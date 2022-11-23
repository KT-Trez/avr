import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import DownloadingIcon from '@mui/icons-material/Downloading';
import MergeIcon from '@mui/icons-material/Merge';
import {Grid, IconButton, Paper, Stack, Typography} from '@mui/material';
import React from 'react';
import {QueueItem} from '../../services/Queue';
import Progress from './Progress';


interface ItemProps {
	entryMetadata: QueueItem;
	removeFromQueue: () => void;
}

function Item({entryMetadata}: ItemProps) {
	const close = () => {
		// todo: implement
	};

	return (
		<Paper sx={{mt: 1, p: 1, position: 'relative', width: '95%'}}>
			<Stack>
				<Stack alignItems={'flex-end'} direction={'row'}>
					<Typography variant={'subtitle2'}>
						File:
					</Typography>
					<Typography sx={{ml: 1}} variant={'body2'}>
						{entryMetadata.name}
					</Typography>
				</Stack>
				<Grid container>
					<Grid item xs>
						<Stack>
							<Progress isDisabled={true}
									  isDone={false}
									  name={'Audio'} percent={0}
									  progressIcon={<DownloadingIcon color={'disabled'}/>}/>
							<Progress isDisabled={true}
									  isDone={false}
									  name={'Video'}
									  percent={0}
									  progressIcon={<DownloadingIcon color={'disabled'}/>}/>
							<Progress isDisabled={true}
									  isDone={false}
									  name={'Merge'}
									  percent={0}
									  progressIcon={<MergeIcon color={'disabled'} sx={{transform: 'rotate(90deg)'}}/>}/>
						</Stack>
					</Grid>
					<Grid item sx={{alignItems: 'center', display: 'flex', justifyContent: 'center'}} xs={1}>
						{Math.random() >= 0.5 ?
							<CheckCircleIcon color={'success'} fontSize={'large'}/>
							:
							<DownloadingIcon color={'disabled'} fontSize={'large'}/>
						}
					</Grid>
				</Grid>
			</Stack>
			<IconButton disabled={true} onClick={close} size={'small'} sx={{position: 'absolute', right: 1, top: 1}}>
				<CloseIcon sx={{fontSize: 15}}/>
			</IconButton>
		</Paper>
	);
}

export default Item;