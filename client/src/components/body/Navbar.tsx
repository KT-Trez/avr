import DownloadIcon from '@mui/icons-material/Download';
import FolderIcon from '@mui/icons-material/Folder';
import ListIcon from '@mui/icons-material/List';
import {Tab, Tabs} from '@mui/material';
import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';


export default function Navbar() {
	const [activeTab, setActiveTab] = React.useState(0);
	const navigate = useNavigate();

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setActiveTab(newValue);
	};

	useEffect(() => {
		switch (activeTab) {
			case 0:
				navigate('/tabs/download');
				break;
			case 1:
				navigate('/tabs/queue');
				break;
			case 2:
				navigate('/tabs/downloaded');
				break;
		}
		// eslint-disable-next-line
	}, [activeTab]);

	return (
		<React.Fragment>
			<Tabs onChange={handleChange} value={activeTab} variant={'fullWidth'}>
				<Tab icon={<DownloadIcon fontSize={'small'}/>} iconPosition={'end'} label={'Download'}/>
				<Tab icon={<ListIcon fontSize={'small'}/>} iconPosition={'end'} label={'Queue'}/>
				<Tab icon={<FolderIcon fontSize={'small'}/>} iconPosition={'end'} label={'Downloaded'}/>
			</Tabs>
		</React.Fragment>
	);
};