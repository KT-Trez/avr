import {CssBaseline} from '@mui/material';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Header from './components/body/Header';
import Navbar from './components/body/Navbar';
import React from 'react';
import Notifications from './components/body/Notifications';
import Download from './components/Tabs/Download';
import Downloaded from './components/Tabs/Downloaded';
import Queue from './components/Tabs/Queue';


export default function AppRoot() {
	return (
		<React.Fragment>
			<Notifications/>

			<BrowserRouter>
				<Header/>
				<Navbar/>

				<Routes>
					<Route element={<Download/>} path={'/'}/>

					<Route element={<Download/>} path='/tabs/download'/>
					<Route element={<Downloaded/>} path='/tabs/downloaded'/>
					<Route element={<Queue/>} path={'/tabs/queue'}/>
				</Routes>
			</BrowserRouter>
			<CssBaseline/>
		</React.Fragment>
	);
};