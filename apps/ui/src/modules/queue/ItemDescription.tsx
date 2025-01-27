import { Stack, Typography } from '@mui/material';
import React from 'react';

interface ItemDescriptionProps {
	description: string;
	title: string;
}

function ItemDescription({title, description}: ItemDescriptionProps) {
	return (
		<Stack alignItems={'flex-end'} direction={'row'}>
			<Typography variant={'subtitle2'}>
				{title}
			</Typography>
			<Typography sx={{ml: 1}} variant={'caption'}>
				{description}
			</Typography>
		</Stack>
	);
}

export default ItemDescription;