import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import RefreshIcon from '@mui/icons-material/Refresh';
import {
	Button,
	CircularProgress,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Divider,
	IconButton,
	Stack,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead, TableRow,
	Typography
} from '@mui/material';
import React, {useEffect, useState} from 'react';
import IPCRenderer from '../../services/IPCRenderer';
import {FileInfo} from '../../types/interfaces';
import FileMetadata from '../file/FileMetadata';


function Downloaded() {
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	const [deleteContext, setDeleteContext] = useState('');
	const [files, setFiles] = useState<FileInfo[]>([]);

	const handleDialogCancel = () => {
		setIsDialogOpen(false);
		setDeleteContext('');
	};

	const handleDialogConfirm = () => {
		IPCRenderer.deleteFromDownloads(deleteContext);
		handleDialogCancel();
		readDownloads();
	};

	const openDownloadsDir = () => {
		IPCRenderer.openDownloadsDir();
	};

	const readDownloads = () => {
		IPCRenderer.getSavedRecordingsInfo()
			.then(filesMetadata => {
				setFiles(filesMetadata);
				setIsLoading(false);
			});
	};

	const refreshDownloadsContent = () => {
		setIsLoading(true);
		setTimeout(() => readDownloads(), 500)
	};

	useEffect(() => {
		readDownloads();
	}, []);

	return (
		<React.Fragment>
			<Dialog maxWidth={'xs'} open={isDialogOpen}>
				<DialogTitle>Delete file</DialogTitle>
				<DialogContent>
					<Typography variant={'body1'}>
						Are you sure you want to delete:
					</Typography>
					<Stack alignItems={'flex-end'} direction={'row'}>
						<Typography color={'text.secondary'} noWrap={true} variant={'caption'}>
							{deleteContext}
						</Typography>
						<Typography sx={{ml: 1}} variant={'body1'}>
							?
						</Typography>
					</Stack>
				</DialogContent>
				<DialogActions>
					<Button autoFocus onClick={handleDialogCancel}>
						Cancel
					</Button>
					<Button onClick={handleDialogConfirm}>Ok</Button>
				</DialogActions>
			</Dialog>

			<Stack alignItems={'center'} direction={'row'} sx={{p: 1, pt: 2}}>
				<Typography variant={'h6'}>
					Open in directory
				</Typography>
				<IconButton onClick={openDownloadsDir}>
					<FolderOpenIcon/>
				</IconButton>
				<IconButton onClick={refreshDownloadsContent} sx={{alignSelf: 'flex-end', ml: 'auto'}}>
					<RefreshIcon/>
				</IconButton>
			</Stack>
			<Divider/>

			{isLoading ?
				<Stack direction={'row'} justifyContent={'center'} sx={{pt: 5}}>
					<CircularProgress/>
				</Stack> :
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
							{files.map(file => {
								return (<FileMetadata key={file.name}
													  metadata={file}
													  openDialog={setIsDialogOpen}
													  setDeleteContext={setDeleteContext}/>);
							})}
						</TableBody>
					</Table>
				</TableContainer>
			}
		</React.Fragment>
	);
}

export default Downloaded;