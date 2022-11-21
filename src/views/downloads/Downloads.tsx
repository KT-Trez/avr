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
	TableHead,
	TableRow,
	Typography
} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {YT_DL} from '../../../typings';
import File from './File';


function Downloads() {
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	const [deleteContext, setDeleteContext] = useState('');
	const [files, setFiles] = useState<YT_DL.Core.Stats.FileStats[]>([]);

	const handleDialogCancel = () => {
		setIsDialogOpen(false);
		setDeleteContext('');
	};

	const handleDialogConfirm = async () => {
		window.coreAPI.deleteFromDownloads(deleteContext);
		handleDialogCancel();
		await getDownloads();
	};

	const openDownloadsDir = () => {
		window.coreAPI.openDownloads();
	};

	const getDownloads = async () => {
		setFiles(await window.coreAPI.getDownloads());
		setIsLoading(false);
	};

	const refreshDownloadsContent = () => {
		setIsLoading(true);
		setTimeout(() => getDownloads(), 700);
	};

	useEffect(() => {
		getDownloads();
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
				</Stack>
				:
				!isLoading && files.length === 0 ?
					<Typography align={'center'}
								color={'text.secondary'}
								sx={{fontStyle: 'italic', mt: 4}}
								variant={'body2'}>
						No downloaded audio/music.
					</Typography>
					:
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
									return (<File key={file.name}
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

export default Downloads;