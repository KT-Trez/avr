import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import RefreshIcon from '@mui/icons-material/Refresh';
import {IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {YT_DL} from '../../../typings';
import NoContentView from '../../components/NoContentView';
import TitleBar from '../../components/TitleBar';
import File from './File';
import RemoveFileDialog from './RemoveFileDialog';


function Downloads() {
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	const [files, setFiles] = useState<YT_DL.Core.Stats.FileStats[]>([]);
	const [pathOfFileToRemove, setPathOfFileToRemove] = useState('');

	const cancelRemoveFile = () => {
		setIsDialogOpen(false);
		setPathOfFileToRemove('');
	};

	const getDownloads = async () => {
		setFiles(await window.coreAPI.getDownloads());
		setIsLoading(false);
	};

	const openDownloadsDir = () => {
		window.coreAPI.openDownloads();
	};

	const refreshDownloadsContent = () => {
		setIsLoading(true);
		setTimeout(() => getDownloads(), 700);
	};

	const removeFile = async () => {
		window.coreAPI.deleteFromDownloads(pathOfFileToRemove);
		cancelRemoveFile();
		await getDownloads();
	};

	useEffect(() => {
		getDownloads();
	}, []);

	useEffect(() => {
		if (pathOfFileToRemove)
			setIsDialogOpen(true);
	}, [pathOfFileToRemove]);

	return (
		<NoContentView emptyText={'No downloaded audio/music.'}
					   header={
						   <TitleBar>
							   <Typography variant={'h6'}>
								   Open in directory
							   </Typography>
							   <IconButton onClick={openDownloadsDir}>
								   <FolderOpenIcon/>
							   </IconButton>
							   <IconButton onClick={refreshDownloadsContent}
										   sx={{alignSelf: 'flex-end', ml: 'auto'}}>
								   <RefreshIcon/>
							   </IconButton>
						   </TitleBar>
					   }
					   isEmpty={files.length === 0}
					   isLoading={isLoading}>

			<RemoveFileDialog cancel={cancelRemoveFile}
							  isOpen={isDialogOpen}
							  path={pathOfFileToRemove}
							  remove={removeFile}/>

			<TableContainer>
				<Table size={'small'} stickyHeader>
					<TableHead>
						<TableRow>
							<TableCell>Typ</TableCell>
							<TableCell>Nazwa</TableCell>
							<TableCell>Utworzono</TableCell>
							<TableCell>Rozmiar</TableCell>
							<TableCell/>
						</TableRow>
					</TableHead>
					<TableBody>
						{files.map(f => <File key={f.name}
											  metadata={f}
											  setPathOfFileToRemove={setPathOfFileToRemove}/>)}
					</TableBody>
				</Table>
			</TableContainer>
		</NoContentView>
	);
}

export default Downloads;