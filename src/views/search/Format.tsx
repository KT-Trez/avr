import CheckIcon from '@mui/icons-material/Check';
import DownloadIcon from '@mui/icons-material/Download';
import {Box, Fade, IconButton, Switch, TableCell, TableRow} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {RecordingFormat} from '../../../typings/interfaces';


interface FormatProps {
	advancedDownload: boolean;
	hasAdvancedAudioFormat: boolean;
	hasAdvancedVideoFormat: boolean;
	recordingFormat: RecordingFormat;
	setAdvancedAudioFormat: Function;
	setAdvancedVideoFormat: Function;
	videoURL: string;
}

function Format({
					advancedDownload,
					hasAdvancedAudioFormat,
					hasAdvancedVideoFormat,
					recordingFormat,
					setAdvancedAudioFormat,
					setAdvancedVideoFormat,
					videoURL
				}: FormatProps) {
	// todo: one active state for whole video ?
	const [isSelected, setIsSelected] = useState(false);

	const selectAudio = () => {
		if (!isSelected)
			setAdvancedAudioFormat(recordingFormat);
		else
			setAdvancedAudioFormat(null);
		setIsSelected(value => !value);
	};

	const selectVideo = () => {
		if (!isSelected)
			setAdvancedVideoFormat(recordingFormat);
		else
			setAdvancedVideoFormat(null);
		setIsSelected(value => !value);
	};

	const downloadRecording = () => {
		// IPCRenderer.getRecording(videoURL, recordingFormat);
	};

	useEffect(() => {
		return () => {
			setIsSelected(false);
		};
	}, []);

	return (
		<TableRow>
			<TableCell align={'center'}>{recordingFormat.audioBitrate}</TableCell>
			<TableCell align={'center'}>{recordingFormat.qualityLabel}</TableCell>
			<TableCell>{recordingFormat.hasAudio ? <CheckIcon/> : ''}</TableCell>
			<TableCell>{recordingFormat.hasVideo ? <CheckIcon/> : ''}</TableCell>
			<TableCell>{recordingFormat.codecs}</TableCell>
			<TableCell>{recordingFormat.fps}</TableCell>
			{/* todo: fix that shitty animation */}
			<Fade in={advancedDownload} unmountOnExit>
				<TableCell align={'center'}>
					<Box sx={{height: 30.75}}>
						<Switch disabled={hasAdvancedAudioFormat && !isSelected}
								onChange={selectAudio}
								size={'small'}
								sx={{visibility: (recordingFormat.hasAudio && !recordingFormat.hasVideo ? 'initial' : 'hidden')}}/>
						<Switch disabled={hasAdvancedVideoFormat && !isSelected}
								onChange={selectVideo}
								size={'small'}
								sx={{visibility: (!recordingFormat.hasAudio && recordingFormat.hasVideo ? 'initial' : 'hidden')}}/>
					</Box>
				</TableCell>
			</Fade>
			<TableCell>
				<IconButton onClick={downloadRecording} size={'small'}>
					<DownloadIcon color={'primary'}/>
				</IconButton>
			</TableCell>
		</TableRow>
	);
}

export default Format;