import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import DownloadIcon from '@mui/icons-material/Download';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import InfoIcon from '@mui/icons-material/Info';
import {
	Box, Button,
	CircularProgress,
	Collapse,
	Divider, Fade,
	Grid,
	IconButton,
	Paper,
	Stack,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
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
	const [isAdvancedDownloadActive, setIsAdvancedDownloadActive] = useState(false);
	const [isDescriptionVisible, setIsDescriptionVisible] = useState(false);
	const [isDownloadMenuVisible, setIsDownloadMenuVisible] = useState(false);

	const [downloadOptions, setDownloadOptions] = useState<RecordingFormat[]>([]);
	const [hasDownloadOptions, setHasDownloadOptions] = useState(false);

	const [advancedAudioFormat, setAdvancedAudioFormat] = useState<RecordingFormat | null>(null);
	const [advancedVideoFormat, setAdvancedVideoFormat] = useState<RecordingFormat | null>(null);

	const advanceDownload = () => {
		if (!advancedAudioFormat || !advancedVideoFormat)
			return;
		IPCRenderer.getRecordingAdvanced(video.url, advancedAudioFormat, advancedVideoFormat, video.duration.seconds);
	};

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

	const toggleAdvancedDownload = () => {
		setIsAdvancedDownloadActive(value => !value);
		if (!isAdvancedDownloadActive) {
			setAdvancedAudioFormat(null);
			setAdvancedVideoFormat(null);
		}
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
					<Typography variant={'subtitle2'}>
						Description:
					</Typography>
					<Typography color={'text.secondary'} noWrap={false} variant={'body2'}>
						{video.description ?? 'Description N/A'}
					</Typography>
				</Grid>
			</Collapse>
			<Collapse in={isDownloadMenuVisible}>
				<Grid item sx={{p: 1}} xs={12}>
					<Stack direction={'row'} justifyContent={'space-between'}>
						<Typography variant={'subtitle2'}>
							Download:
						</Typography>
						<IconButton edge={'end'} onClick={toggleAdvancedDownload} size={'small'}>
							<MoreHorizIcon/>
						</IconButton>
					</Stack>
					<Collapse in={isAdvancedDownloadActive} unmountOnExit>
						<Stack>
							<Stack alignItems={'flex-end'} direction={'row'}>
								<Typography variant={'body2'}>
									Audio format:
								</Typography>
								<Typography sx={{ml: 1}} variant={'caption'}>
									{advancedAudioFormat ? `${advancedAudioFormat.audioCodec} ${advancedAudioFormat.audioQuality}` : '-'}
								</Typography>
							</Stack>
							<Stack alignItems={'flex-end'} direction={'row'}>
								<Typography variant={'body2'}>
									Video format:
								</Typography>
								<Typography sx={{ml: 1}} variant={'caption'}>
									{advancedVideoFormat ? `${advancedVideoFormat.videoCodec} ${advancedVideoFormat.qualityLabel}` : '-'}
								</Typography>
							</Stack>
							{/* todo: prettier download button */}
							<Button disabled={!advancedAudioFormat || !advancedVideoFormat}
									endIcon={<DownloadIcon/>}
									onClick={advanceDownload}
									size={'small'}
									sx={{mb: 2, mt: 1}}>
								Advanced download
							</Button>
						</Stack>
					</Collapse>

					{!hasDownloadOptions ?
						<Stack direction={'row'} justifyContent={'center'} sx={{p: 3, width: '100%'}}>
							<CircularProgress/>
						</Stack> :
						<TableContainer sx={{maxHeight: '38vh'}}>
							<Table size={'small'} stickyHeader>
								<TableHead>
									<TableRow>
										<TableCell align={'center'}>Bitrate</TableCell>
										<TableCell align={'center'}>Resolution</TableCell>
										<TableCell>Audio</TableCell>
										<TableCell>Video</TableCell>
										<TableCell>Codecs</TableCell>
										<TableCell>FPS</TableCell>
										<Fade in={isAdvancedDownloadActive} unmountOnExit>
											<TableCell align={'center'}>
												Audio/Video
											</TableCell>
										</Fade>
										<TableCell/>
									</TableRow>
								</TableHead>
								<TableBody>
									{downloadOptions.map(option => {
										return (<RecordingMetadata advancedDownload={isAdvancedDownloadActive}
																   hasAdvancedAudioFormat={advancedAudioFormat !== null}
																   hasAdvancedVideoFormat={advancedVideoFormat !== null}
																   key={(option.audioBitrate ?? 0) + 'x' + (option.qualityLabel ?? '0p') + 'x' + option.codecs + 'x' + video.videoId}
																   recordingFormat={option} videoURL={video.url}
																   setAdvancedAudioFormat={setAdvancedAudioFormat}
																   setAdvancedVideoFormat={setAdvancedVideoFormat}/>)
									})}
								</TableBody>
							</Table>
						</TableContainer>
					}
				</Grid>
			</Collapse>
		</Paper>
	);
}

export default VideoMetadata;