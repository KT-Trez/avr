import {CssBaseline} from '@mui/material';
import React from 'react';
import {HashRouter, Route, Routes} from 'react-router-dom';
import Downloads from './views/downloads/Downloads';
import Header from './views/menu/Header';
import Navbar from './views/menu/Navbar';
import Queue from './views/queue/Queue';
import Search from './views/search/Search';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


export default function App() {
	return (
		<React.Fragment>

			<HashRouter>
				<Header/>
				<Navbar/>

				<Routes>
					<Route element={<Search/>} path={'/'}/>

					<Route element={<Search/>} path='/tabs/search'/>
					<Route element={<Downloads/>} path='/tabs/downloaded'/>
					<Route element={<Queue/>} path={'/tabs/queue'}/>
				</Routes>
			</HashRouter>
			<CssBaseline/>
		</React.Fragment>
	);
};