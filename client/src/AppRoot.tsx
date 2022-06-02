import {CssBaseline} from '@mui/material';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Header from './components/body/Header';
import Navbar from './components/body/Navbar';
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
					<Route element={<Download/>} path='/tabs/download'/>
					<Route element={<Downloaded/>} path='/tabs/downloaded'/>
				</Routes>
			</BrowserRouter>
			<CssBaseline/>
		</React.Fragment>
	);
};