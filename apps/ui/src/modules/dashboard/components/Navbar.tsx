import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import SearchIcon from '@mui/icons-material/Search';
import { Tab, Tabs } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Navbar = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    switch (activeTab) {
      case 0:
        navigate('/search');
        break;
      case 1:
        navigate('/queue');
        break;
      case 2:
        navigate('/explorer');
        break;
      default:
        navigate('/');
        break;
    }
  }, [activeTab, navigate]);

  return (
      <Tabs onChange={(_, value) => setActiveTab(value)} value={activeTab} variant='fullWidth'>
        <Tab icon={<SearchIcon/>} iconPosition='end' label='Search'/>
        <Tab icon={<FormatListBulletedIcon/>} iconPosition='end' label='Queue'/>
        <Tab icon={<DownloadForOfflineIcon/>} iconPosition='end' label='Downloads'/>
      </Tabs>
  );
};
