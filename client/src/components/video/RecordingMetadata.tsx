import CheckIcon from '@mui/icons-material/Check';
import DownloadIcon from '@mui/icons-material/Download';
import {Button, TableCell, TableRow} from '@mui/material';
import React from 'react';
import IPCRenderer from '../../services/IPCRenderer';
import {RecordingFormat} from '../../types/interfaces';

interface RecordingMetadataProps {
	recording: RecordingFormat;
	videoID: string;
	videoType: string;
	videoURL: string;
}

function RecordingMetadata({recording, videoID, videoType, videoURL}: RecordingMetadataProps) {
	const downloadRecording = () => {
		IPCRenderer.downloadRecording(videoURL,  recording,videoType + '-' + videoID);
	};

	return (
		<TableRow key={recording.audioBitrate + 'x' + recording.qualityLabel}>
			<TableCell align={'center'}>{recording.audioBitrate}</TableCell>
			<TableCell align={'center'}>{recording.qualityLabel}</TableCell>
			<TableCell>{recording.hasAudio ? <CheckIcon/> : ''}</TableCell>
			<TableCell>{recording.hasVideo ? <CheckIcon/> : ''}</TableCell>
			<TableCell>{recording.codecs}</TableCell>
			<TableCell>{recording.fps}</TableCell>
			<TableCell align={'right'}>
				<Button endIcon={<DownloadIcon/>} onClick={downloadRecording} size={'small'}>
					Download
				</Button>
			</TableCell>
		</TableRow>
	);
}

export default RecordingMetadata;