import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {ThemeProvider} from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import getTheme from './hooks/getTheme';
import {mountListeners} from './services/Messenger';


mountListeners();

ReactDOM.render(
	<React.StrictMode>
		<ThemeProvider theme={getTheme()}>
			<App/>
		</ThemeProvider>
	</React.StrictMode>,
	document.getElementById('root')
);