import {CssBaseline} from '@mui/material';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Header from './components/Header';
import Main from './components/Main';
import Navbar from './components/Navbar';
import React from 'react';
import Download from './components/Tabs/Download';
import Downloaded from './components/Tabs/Downloaded';


export default function AppRoot() {
	return (
		<React.Fragment>
			<BrowserRouter>
				<Header/>
				<Navbar/>

				<Routes>
					<Route element={<Main/>} path='/'/>

					<Route element={<Download/>} path='/tabs/download'/>
					<Route element={<Downloaded/>} path='/tabs/downloaded'/>
				</Routes>
			</BrowserRouter>
			<CssBaseline/>
		</React.Fragment>
	);
};