import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import DownloadingIcon from '@mui/icons-material/Downloading';
import {Grid, IconButton, Paper, Stack, Typography} from '@mui/material';
import React from 'react';
import QueueService from '../../services/QueueService';
import {QueueEntryMetadata} from '../../types/interfaces';
import QueueProgress from './QueueProgress';


interface QueueEntryProps {
	entryMetadata: QueueEntryMetadata;
	updateQueue: () => void;
}

function QueueEntry({entryMetadata, updateQueue}: QueueEntryProps) {
	const close = () => {
		QueueService.deleteEntry(entryMetadata.name);
		updateQueue();
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
							<QueueProgress isDisabled={!entryMetadata.hasAudio} isDownloaded={entryMetadata.isAudioDownloaded} name={'Audio'} percent={entryMetadata.audioProgress}/>
							<QueueProgress isDisabled={!entryMetadata.hasVideo} isDownloaded={entryMetadata.isVideoDownloaded} name={'Video'} percent={entryMetadata.videoProgress}/>
						</Stack>
					</Grid>
					<Grid item sx={{alignItems: 'center', display: 'flex', justifyContent: 'center'}} xs={1}>
						{entryMetadata.isDownloaded ?
							<CheckCircleIcon color={'success'} fontSize={'large'}/>
							:
							<DownloadingIcon color={'disabled'} fontSize={'large'}/>
						}
					</Grid>
				</Grid>
			</Stack>
			<IconButton disabled={!entryMetadata.isDownloaded} onClick={close} size={'small'} sx={{position: 'absolute', right: 1, top: 1}}>
				<CloseIcon sx={{fontSize: 15}}/>
			</IconButton>
		</Paper>
	);
}

export default QueueEntry;