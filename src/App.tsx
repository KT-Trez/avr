import {CssBaseline} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {HashRouter, Route, Routes} from 'react-router-dom';
import {YT_DL} from '../typings';
import Messenger from './services/Messenger';
import Downloads from './views/downloads/Downloads';
import Header from './views/menu/Header';
import Navbar from './views/menu/Navbar';
import Notifier from './views/menu/Notifier';
import Queue from './views/queue/Queue';
import Search from './views/search/Search';


export default function App() {
	const [notification, setNotification] = useState<YT_DL.GUI.Notification | null>(null);

	const handleNotification = (event: CustomEvent<YT_DL.GUI.Notification>) => {
		setNotification(event.detail);
	};

	useEffect(() => {
		Messenger.emitter.addEventListener('notification', handleNotification);

		return () => {
			Messenger.emitter.removeEventListener('notification', handleNotification);
		};
	}, []);

	// todo: check possibility of implementing https://reactdesktop.js.org/
	return (
		<>
			<HashRouter>
				<Header/>
				<Navbar/>

				<Notifier notification={notification}/>

				<Routes>
					<Route element={<Search/>} path={'/'}/>

					<Route element={<Search/>} path='/tabs/search'/>
					<Route element={<Downloads/>} path='/tabs/downloaded'/>
					<Route element={<Queue/>} path={'/tabs/queue'}/>
				</Routes>
			</HashRouter>
			<CssBaseline/>
		</>
	);
};