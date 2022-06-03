import {Alert, Snackbar} from '@mui/material';
//@ts-ignore
import {IpcRendererEvent} from 'electron'
import React, {useEffect, useState} from 'react';
import IPCRenderer from '../../services/IPCRenderer';


function Notifications() {
	// snackbar handling
	const snackbarSeverityArr: ('error' | 'info' | 'success' | 'warning')[] = ['error', 'info', 'success', 'warning'];
	const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState('');
	const [snackbarSeverity, setSnackbarSeverity] = useState<'error' | 'info' | 'success' | 'warning'>('success');
	const handleSnackbarClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
		if (reason === 'clickaway')
			return;
		setIsSnackbarOpen(false);
	};

	// receive notifications from ipcMain
	const sendNotification = (event: IpcRendererEvent, severity: number, message: string) => {
		setSnackbarMessage(message);
		setSnackbarSeverity(snackbarSeverityArr[severity]);
		setIsSnackbarOpen(true);
	};

	useEffect(() => {
		IPCRenderer.getInstance().on('send-notification', sendNotification);
		return () => {
			IPCRenderer.getInstance().removeListener('send-notification', sendNotification);
		};
		// eslint-disable-next-line
	}, []);

	return (
		<Snackbar open={isSnackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
			<Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{width: '100%'}}>
				{snackbarMessage}
			</Alert>
		</Snackbar>
	);
}

export default Notifications;