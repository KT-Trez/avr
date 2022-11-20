import AudioFileIcon from '@mui/icons-material/AudioFile';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import LaunchIcon from '@mui/icons-material/Launch';
import VideoFileIcon from '@mui/icons-material/VideoFile';
import {IconButton, TableCell, TableRow} from '@mui/material';
import moment from 'moment';
import React from 'react';
import {FileInfo} from '../../../typings/interfaces';


interface FileProps {
	metadata: FileInfo;
	openDialog: (isOpen: boolean) => void;
	setDeleteContext: (deleteContext: string) => void;
}

function File({metadata, openDialog, setDeleteContext}: FileProps) {
	const deleteFile = () => {
		setDeleteContext(metadata.name);
		openDialog(true);
	};

	const openFile = () => {
		// IPCRenderer.openDownloadsFile(metadata.name);
	};

	return (
		<TableRow key={metadata.name}>
			<TableCell>
				{metadata.media === 'mp3' ?
					<AudioFileIcon color={'disabled'} fontSize={'large'}/> :
					<VideoFileIcon color={'disabled'} fontSize={'large'}/>
				}
			</TableCell>
			<TableCell>
				{metadata.name}
			</TableCell>
			<TableCell>
				{moment(metadata.created).format('DD-MM-YYYY • HH:mm')}
			</TableCell>
			<TableCell>
				{metadata.size.value} {metadata.size.unit}
			</TableCell>
			<TableCell>
				<IconButton onClick={openFile}>
					<LaunchIcon/>
				</IconButton>
				<IconButton onClick={deleteFile}>
					<DeleteForeverIcon color={'error'}/>
				</IconButton>
			</TableCell>
		</TableRow>
	);
}

export default File;