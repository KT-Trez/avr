import {createTheme} from '@mui/material';


const theme = createTheme({
	palette: {
		mode: 'dark',
		primary: {
			dark: '#388e3c',
			light: '#c8e6c9',
			main: '#4caf50'
		}
	}
});

const getTheme = () => {
	return theme;
};

export default getTheme;