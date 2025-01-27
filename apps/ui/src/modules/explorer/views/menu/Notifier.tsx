import { Alert, AlertTitle, Snackbar } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { YT_DL } from '../../../typings';

interface NotifierProps {
	notification: YT_DL.GUI.Notification | null;
}

function Notifier({notification}: NotifierProps) {
	const [isOpen, setIsOpen] = useState(false);

	const closeNotification = () => setIsOpen(false);

	const openNotification = () => setIsOpen(true);

	useEffect(() => {
		if (notification)
			openNotification();
	}, [notification]);

	return (
		<Snackbar autoHideDuration={5000} onClose={closeNotification} open={isOpen}>
			<Alert severity={notification?.severity} variant={notification?.variant}>
				{notification?.title &&
                    <AlertTitle>{notification?.title}</AlertTitle>
				}
				{notification?.message}
			</Alert>
		</Snackbar>

	);
}

export default Notifier;