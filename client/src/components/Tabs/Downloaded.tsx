import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import {
	Box,
	Divider,
	IconButton, Stack,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	Typography
} from '@mui/material';
import React, {useEffect, useState} from 'react';
import IPCRenderer from '../../services/IPCRenderer';
import {FileInfo} from '../../types/interfaces';
import FileMetadata from '../file/FileMetadata';


function Downloaded() {
	const [isLoading, setIsLoading] = useState(true);

	const [files, setFiles] = useState<FileInfo[]>([]);

	const openDownloadsDir = () => {
		IPCRenderer.openDownloadsDir();
	};

	useEffect(() => {
		IPCRenderer.getDownloadedFiles()
			.then(filesMetadata => {
				setFiles(filesMetadata);
				setIsLoading(false);
			});
	}, []);

	return (
		<React.Fragment>
			<Stack alignItems={'center'} direction={'row'} sx={{p: 1, pt: 2}}>
				<Typography variant={'h6'}>
					Open in directory
				</Typography>
				<IconButton onClick={openDownloadsDir}>
					<FolderOpenIcon/>
				</IconButton>
			</Stack>
			<Divider/>

			{isLoading ?
				<Box>
					no kurde, ni mo
				</Box> :
				<TableContainer>
					<Table stickyHeader size={'small'}>
						<TableHead>
							<TableCell>Typ</TableCell>
							<TableCell>Nazwa</TableCell>
							<TableCell>Utworzono</TableCell>
							<TableCell>Rozmiar</TableCell>
							<TableCell></TableCell>
						</TableHead>
						<TableBody>
							{files.map(file => {
								return (<FileMetadata metadata={file}/>);
							})}
						</TableBody>
					</Table>
				</TableContainer>
			}

		</React.Fragment>
	);
}

export default Downloaded;