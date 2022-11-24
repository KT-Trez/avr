import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography} from '@mui/material';
import React from 'react';


interface RemoveFileDialogProps {
	cancel: () => void;
	isOpen: boolean;
	path: string;
	remove: () => void;
}

function RemoveFileDialog({cancel, isOpen, path, remove}: RemoveFileDialogProps) {
	return (
		<Dialog maxWidth={'xs'} open={isOpen}>
			<DialogTitle>Delete file</DialogTitle>
			<DialogContent>
				<Typography color={'text.secondary'} noWrap={true} variant={'overline'}>
					{path}
				</Typography>
			</DialogContent>
			<DialogActions>
				<Button autoFocus onClick={cancel}>Cancel</Button>
				<Button color={'error'} onClick={remove}>Delete</Button>
			</DialogActions>
		</Dialog>
	);
}

export default RemoveFileDialog;