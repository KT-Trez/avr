import {Stack, Typography} from '@mui/material';
import React, {useEffect, useState} from 'react';
import IPCRenderer from '../../services/IPCRenderer';
import QueueService from '../../services/QueueService';
import QueueEntry from '../queue/QueueEntry';
import QueueHeader from '../queue/QueueHeader';


function Queue() {
	const [queue, setQueue] = useState(QueueService.getQueue());

	const updateQueue = () => {
		setQueue(QueueService.getQueue());
	};

	useEffect(() => {
		IPCRenderer.getInstance().on('download-advanced-progress', updateQueue);
		IPCRenderer.getInstance().on('download-advanced-start', updateQueue);
		return () => {
			IPCRenderer.getInstance().removeListener('download-advanced-progress', updateQueue);
			IPCRenderer.getInstance().removeListener('download-advanced-start', updateQueue);
		};
	}, []);

	return (
		<React.Fragment>
			<QueueHeader/>

			<Stack alignItems={'center'} sx={{pb: 1}}>
				{queue.length === 0 ?
					<Typography align={'center'} color={'text.secondary'} sx={{fontStyle: 'italic', mt: 4}} variant={'body2'}>
						Downloads queue is empty.
					</Typography>
					:
					queue.map(queueEntry => {
						return(<QueueEntry entryMetadata={queueEntry} key={queueEntry.name} updateQueue={updateQueue}/>)
					})
				}
			</Stack>
		</React.Fragment>
	);
}

export default Queue;