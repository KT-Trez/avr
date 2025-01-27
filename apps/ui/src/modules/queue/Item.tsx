import CloseIcon from '@mui/icons-material/Close';
import DownloadingIcon from '@mui/icons-material/Downloading';
import { IconButton, Paper, Stack } from '@mui/material';
import React from 'react';
import { YT_DL } from '../../../typings';
import ItemDescription from './ItemDescription';
import Progress from './Progress';

interface ItemProps {
	item: YT_DL.Core.Cache.Download;
	removeFromQueue: (id: string) => void;
}

function Item({item, removeFromQueue}: ItemProps) {
	const close = () => {
		removeFromQueue(item.id);
	};

	return (
		<Paper sx={{mt: 1, p: 1, position: 'relative', width: '95%'}}>
			<Stack>
				<ItemDescription description={item.name} title={'Media:'}/>
				<ItemDescription description={item.status} title={'Status:'}/>

				<Stack sx={{p: 1}}>
					{/* progress icons
						download:
							<DownloadingIcon/>
						merge:
							<MergeIcon sx={{transform: 'rotate(90deg)'}}/>
					*/}
					<Progress isDone={item.hasFinished}
							  percent={item.progress}
							  progressIcon={<DownloadingIcon color={'disabled'}/>}/>
				</Stack>
			</Stack>
			<IconButton onClick={close} size={'small'} sx={{position: 'absolute', right: 1, top: 1}}>
				<CloseIcon sx={{fontSize: 15}}/>
			</IconButton>
		</Paper>
	);
}

export default Item;