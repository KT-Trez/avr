import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import LaunchIcon from '@mui/icons-material/Launch';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import {IconButton, TableCell, TableRow} from '@mui/material';
import moment from 'moment';
import React from 'react';
import IPCRenderer from '../../services/IPCRenderer';
import {FileInfo} from '../../types/interfaces';


interface FileMetadataProps {
	metadata: FileInfo;
}

function FileMetadata({metadata}: FileMetadataProps) {
	const deleteFile = () => {
		// todo: implement it
	};

	const openFile = () => {
		IPCRenderer.openFile(metadata.name);
	};

	return (
		<TableRow key={metadata.name}>
			<TableCell>
				{metadata.media === 'mp3' ?
					<MusicNoteIcon color={'disabled'}/> :
					<PlayCircleIcon color={'disabled'}/>
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
				<IconButton>
					<DeleteForeverIcon color={'error'}/>
				</IconButton>
			</TableCell>
		</TableRow>
	);
}

export default FileMetadata;