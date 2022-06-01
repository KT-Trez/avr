import {CssBaseline} from '@mui/material';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Header from './components/Header';
import Main from './components/Main';
import Navbar from './components/navbar/Navbar';
import React from 'react';


export default function AppRoot() {
	return (
		<React.Fragment>
			<BrowserRouter>
				<Header/>
				<Navbar/>
				<Routes>
					<Route element={<Main/>} path='/'/>
				</Routes>
			</BrowserRouter>
			<CssBaseline/>
		</React.Fragment>
	);
};