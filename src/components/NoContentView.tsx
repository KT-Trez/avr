import {Box, CircularProgress, Typography} from '@mui/material';
import React from 'react';


interface NoContentViewProps {
	children: JSX.Element | JSX.Element[];
	emptyText: string;
	header: JSX.Element;
	isEmpty: boolean;
	isLoading: boolean;
}

function NoContentView({children, emptyText, header, isEmpty, isLoading}: NoContentViewProps) {
	return (
		<Box>
			{header}

			{isLoading ?
				<CircularProgress sx={{display: 'block', m: 'auto', mt: 5}}/>
				:
				isEmpty ?
					<Typography align={'center'}
								color={'text.secondary'}
								sx={{fontStyle: 'italic', mt: 4, userSelect: 'none'}}
								variant={'body2'}>
						{emptyText}
					</Typography>
					:
					children
			}
		</Box>
	);
}

export default NoContentView;