import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import InfoIcon from '@mui/icons-material/Info';
import {
	Box,
	CircularProgress,
	Collapse,
	Divider,
	Grid,
	IconButton,
	Paper,
	Stack, Table, TableBody, TableCell, TableContainer, TableHead,
	Typography
} from '@mui/material';
import React, {useState} from 'react';
import IPCRenderer from '../../services/IPCRenderer';
import {RecordingFormat, Video} from '../../types/interfaces';
import RecordingMetadata from './RecordingMetadata';


interface VideoMetadataProps {
	video: Video
}

function VideoMetadata({video}: VideoMetadataProps) {
	const [isDescriptionVisible, setIsDescriptionVisible] = useState(false);
	const [isDownloadMenuVisible, setIsDownloadMenuVisible] = useState(false);
	// todo: implement progress
	//const [isDownloading, setIsDownloading] = useState(false);

	const [downloadOptions, setDownloadOptions] = useState<RecordingFormat[]>([]);
	const [hasDownloadOptions, setHasDownloadOptions] = useState(false);

	const showDescription = () => {
		if (isDownloadMenuVisible)
			setIsDownloadMenuVisible(false);
		setIsDescriptionVisible(value => !value);
	};

	const showDownloadMenu = () => {
		if (!hasDownloadOptions)
			IPCRenderer.getRecordingFormats(video.url)
				.then(options => {
					setHasDownloadOptions(true);
					setDownloadOptions(options);
				});

		if (isDescriptionVisible)
			setIsDescriptionVisible(false);
		setIsDownloadMenuVisible(value => !value);
	};

	return (
		<Paper>
			<Grid container item>
				<Grid item xs={'auto'}>
					<Box sx={{
						backgroundImage: `url(${video.image})`,
						backgroundPosition: 'center',
						backgroundRepeat: 'no-repeat',
						backgroundSize: 'auto 100%',
						height: '30vh',
						width: '20vw'
					}}/>
				</Grid>

				<Grid item sx={{position: 'relative'}} xs>
					<Stack sx={{p: 1}}>
						{/* todo: open in new window*/}
						<Typography noWrap={false} variant={'h6'}>
							{video.title}
						</Typography>
						<Typography variant={'body1'}>
							{video.author.name}
						</Typography>


					</Stack>
					<Typography sx={{bottom: '0px', left: 0, mb: 1, ml: 1, position: 'absolute'}}>
						{video.duration.timestamp}
					</Typography>
				</Grid>

				<Grid item sx={{p: 1, position: 'relative'}} xs={2}>
					<Stack alignItems={'flex-end'}>
						<Typography>
							{video.views}
						</Typography>
						<Stack direction={'row'}>
							<IconButton onClick={showDescription}>
								<InfoIcon color={'primary'}/>
							</IconButton>
							<IconButton onClick={showDownloadMenu}>
								<DownloadForOfflineIcon color={'primary'}/>
							</IconButton>
						</Stack>
					</Stack>
					<Typography sx={{bottom: 0, mb: 1, mr: 1, position: 'absolute', right: 0}}>
						{video.ago ?? 'N/A'}
					</Typography>
				</Grid>
				{(isDescriptionVisible || isDownloadMenuVisible) &&
                    <Grid item xs={12}>
                        <Divider/>
                    </Grid>
				}
			</Grid>
			<Collapse in={isDescriptionVisible}>
				<Grid item sx={{p: 1}} xs={12}>
					<Typography variant={'body2'}>
						Description:
					</Typography>
					<Typography color={'text.secondary'} noWrap={false} variant={'body2'}>
						{video.description ?? 'Description N/A'}
					</Typography>
				</Grid>
			</Collapse>
			<Collapse in={isDownloadMenuVisible}>
				<Grid item sx={{p: 1}} xs={12}>
					<Typography variant={'body2'}>
						Download:
						{!hasDownloadOptions ?
							<Stack direction={'row'} justifyContent={'center'} sx={{p: 3, width: '100%'}}>
								<CircularProgress/>
							</Stack> :
							<TableContainer sx={{maxHeight: '38vh'}}>
								<Table size={'small'} stickyHeader>
									<TableHead>
										<TableCell align={'center'}>Bitrate</TableCell>
										<TableCell align={'center'}>Resolution</TableCell>
										<TableCell>Audio</TableCell>
										<TableCell>Video</TableCell>
										<TableCell>Codecs</TableCell>
										<TableCell>FPS</TableCell>
										<TableCell align={'right'}></TableCell>
									</TableHead>
									<TableBody>
										{downloadOptions.map(option => {
											return(<RecordingMetadata recording={option} videoID={video.videoId} videoType={video.type} videoURL={video.url}/>)
										})}
									</TableBody>
								</Table>
							</TableContainer>
						}
					</Typography>
				</Grid>
			</Collapse>
		</Paper>
	);
}

export default VideoMetadata;