import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import {InputAdornment, Stack, TextField} from '@mui/material';
import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Video as IVideo} from '../../../typings/interfaces';
import NoContentView from '../../components/NoContentView';
import TitleBar from '../../components/TitleBar';
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
		<NoContentView emptyText={'Search for videos first.'}
					   header={
						   <TitleBar>
							   <TextField disabled={isSearching}
										  InputProps={{
											  endAdornment: <InputAdornment
												  position={'end'}><TravelExploreIcon/></InputAdornment>
										  }}
										  label={'Search'}
										  onKeyDown={handleSearchKeyInput}
										  onChange={handleSearchInput}
										  placeholder={'e.x.: never gonna give you up'}
										  size={'small'}
										  value={keywords}/>
						   </TitleBar>
					   }
					   isEmpty={videos.length === 0}
					   isLoading={isSearching}>

			<Stack gap={2} sx={{mt: 3, p: 1}}>
				{videos.map(video => <Video key={video.videoId} video={video}/>)}
			</Stack>
		</NoContentView>
	);
}

export default Search;