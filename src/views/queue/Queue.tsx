import {Stack, Typography} from '@mui/material';
import React, {useEffect, useState} from 'react';
import NoContentView from '../../components/NoContentView';
import TitleBar from '../../components/TitleBar';
import {QueueItem} from '../../services/Queue';
import Item from './Item';

// important: reimplement
function Queue() {
	const [queue, setQueue] = useState<QueueItem[]>([]);

	const removeProgress = () => {
		//setQueue();
	};

	useEffect(() => {
		// todo: attach to queue listener

		return () => {
			// todo: detach to queue listener
		};
	}, []);

	return (
		<NoContentView emptyText={'Downloads queue is empty.'}
					   header={
						   <TitleBar>
							   <Typography variant={'h6'}>
								   Downloads queue
							   </Typography>
						   </TitleBar>
					   }
					   isEmpty={queue.length === 0}
					   isLoading={false}>

			<Stack alignItems={'center'}>
				{queue.map(entry => <Item entryMetadata={entry}
										  key={entry.name}
										  removeFromQueue={removeProgress}/>)}
			</Stack>
		</NoContentView>
	);
}

export default Queue;