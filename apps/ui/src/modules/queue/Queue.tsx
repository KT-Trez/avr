import { Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { YT_DL } from '../../../typings';
import PageContainer from '../../components/PageContainer.tsx';
import TitleBar from '../../components/TitleBar';
import Messenger from '../../services/Messenger';
import Item from './Item';

function Queue() {
	const [queue, setQueue] = useState<YT_DL.Core.Cache.Download[]>([]);

	const updateQueue = async () => {
		const updatedQueue = await window.coreAPI.queueGetUpdate();
		setQueue(updatedQueue);

		//const finished = updatedQueue.filter(d => d.hasFinished);
		//if (finished.length > 0)
		//	window.coreAPI.queueUnsubscribeItem(finished.map(d => d.id));
	};

	const removeProgress = (id: string) => {
		window.coreAPI.queueUnsubscribeItem([id]);
		setQueue([...queue.filter(d => d.id !== id)]);
	};

	useEffect(() => {
		updateQueue();
		Messenger.emitter.addEventListener('queue:update', updateQueue);

		return () => {
			Messenger.emitter.removeEventListener('queue:update', updateQueue);
		};
	}, []);

	return (
			<PageContainer
					emptyText={'Downloads queue is empty.'}
					header={
						   <TitleBar>
							   <Typography variant={'h6'}>
								   Downloads queue
							   </Typography>
						   </TitleBar>
					   }
					isEmpty={queue.length === 0}
					isLoading={false}
			>

			<Stack alignItems={'center'} sx={{pb: 1}}>
				{queue.map(d => <Item item={d}
									  key={d.id}
									  removeFromQueue={removeProgress}/>)}
			</Stack>
			</PageContainer>
	);
}

export default Queue;