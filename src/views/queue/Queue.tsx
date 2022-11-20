import {Stack, Typography} from '@mui/material';
import React, {useEffect, useState} from 'react';
import QueueService from '../../services/QueueService';
import Header from './Header';
import Item from './Item';


function Queue() {
	const [queue, setQueue] = useState(QueueService.getQueue());

	const updateQueue = () => {
		setQueue(QueueService.getQueue());
	};

	useEffect(() => {
		// IPCRenderer.getInstance().on('search-advanced-progress', updateQueue);
		// IPCRenderer.getInstance().on('search-advanced-start', updateQueue);
		return () => {
			// IPCRenderer.getInstance().removeListener('search-advanced-progress', updateQueue);
			// IPCRenderer.getInstance().removeListener('search-advanced-start', updateQueue);
		};
	}, []);

	return (
		<React.Fragment>
			<Header/>

			<Stack alignItems={'center'} sx={{pb: 1}}>
				{queue.length === 0 ?
					<Typography align={'center'} color={'text.secondary'} sx={{fontStyle: 'italic', mt: 4}} variant={'body2'}>
						Downloads queue is empty.
					</Typography>
					:
					queue.map(queueEntry => {
						return (<Item entryMetadata={queueEntry} key={queueEntry.name} updateQueue={updateQueue}/>);
					})
				}
			</Stack>
		</React.Fragment>
	);
}

export default Queue;