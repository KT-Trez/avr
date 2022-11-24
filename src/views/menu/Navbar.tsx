import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import SearchIcon from '@mui/icons-material/Search';
import {Tab, Tabs} from '@mui/material';
import React, {SyntheticEvent, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';


export default function Navbar() {
	const navigate = useNavigate();

	const [activeTab, setActiveTab] = useState(0);

	const handleChange = (event: SyntheticEvent, tab: number) => {
		setActiveTab(tab);
	};

	useEffect(() => {
		switch (activeTab) {
			case 0:
				navigate('/tabs/search');
				break;
			case 1:
				navigate('/tabs/queue');
				break;
			case 2:
				navigate('/tabs/downloaded');
				break;
		}
	}, [activeTab, navigate]);

	return (
		<>
			<Tabs onChange={handleChange} value={activeTab} variant={'fullWidth'}>
				<Tab icon={<SearchIcon fontSize={'small'}/>} iconPosition={'end'} label={'Search'}/>
				<Tab icon={<FormatListBulletedIcon fontSize={'small'}/>} iconPosition={'end'} label={'Queue'}/>
				<Tab icon={<DownloadForOfflineIcon fontSize={'small'}/>} iconPosition={'end'} label={'Downloads'}/>
			</Tabs>
		</>
	);
};