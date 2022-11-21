import SearchIcon from '@mui/icons-material/Search';
import {CircularProgress, Divider, IconButton, Stack, TextField, Typography} from '@mui/material';
import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Video as IVideo} from '../../../typings/interfaces';
import Video from './Video';


function Search() {
	const [isSearching, setIsSearching] = useState(false);

	const [keywords, setKeywords] = useState<string>('');
	const [videos, setVideos] = useState<IVideo[]>([]);

	const getVideos = async () => {
		if (isSearching || !keywords)
			return;

		setIsSearching(true);
		if (!keywords)
			return;

		setVideos(await window.coreAPI.searchVideos(keywords));
		setIsSearching(false);
	};

	const handleSearchInput = (event: ChangeEvent<HTMLInputElement>) => {
		setKeywords(event.target.value);
	};

	const handleSearchKeyInput = async (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.key.toLowerCase() === 'enter')
			await getVideos();
	};

	return (
		<React.Fragment>
			<Stack alignItems={'center'} direction={'row'} sx={{p: 1, pt: 2}}>
				<TextField disabled={isSearching}
						   label={'Video keywords'}
						   onKeyDown={handleSearchKeyInput}
						   onChange={handleSearchInput}
						   placeholder={'e.x.: never gonna give you up'}
						   size={'small'}
						   value={keywords}/>
				<IconButton onClick={getVideos}>
					<SearchIcon/>
				</IconButton>
			</Stack>
			<Divider/>

			{isSearching ?
				<Stack direction={'row'} justifyContent={'center'} sx={{pt: 5}}>
					<CircularProgress/>
				</Stack> :
				<Stack gap={2} sx={{mt: 3, p: 1}}>
					{videos.length === 0 ?
						<Typography align={'center'} color={'text.secondary'} sx={{fontStyle: 'italic'}}
									variant={'body2'}>
							Search for videos first.
						</Typography> :
						videos.map(video => {
							return (<Video key={video.videoId} video={video}/>);
						})
					}
				</Stack>
			}
		</React.Fragment>
	);
}

export default Search;