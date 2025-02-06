import { CssBaseline, ThemeProvider } from '@mui/material';
import { RouterProvider } from 'react-router-dom';
import { ConfirmationDialogProvider } from './components/ConfirmationDialog/ConfirmationDialogContext.tsx';
import { SnackbarProvider } from './components/Snackbar/SnackbarContext.tsx';
import { theme } from './constants/theme.ts';
import { router } from './routes/router.tsx';

export const App = () => {
  // const [notification, setNotification] = useState<YT_DL.GUI.Notification | null>(null);
  //
  // const handleNotification = (event: CustomEvent<YT_DL.GUI.Notification>) => {
  //   setNotification(event.detail);
  // };
  //
  // useEffect(() => {
  //   Messenger.emitter.addEventListener('notification', handleNotification);
  //
  //   return () => {
  //     Messenger.emitter.removeEventListener('notification', handleNotification);
  //   };
  // }, []);

  return (
      <ThemeProvider theme={theme}>
        <SnackbarProvider>
          <ConfirmationDialogProvider>
            <CssBaseline/>
            <RouterProvider router={router}/>

            {/*<Notifier notification={notification}/>*/}
          </ConfirmationDialogProvider>
        </SnackbarProvider>
      </ThemeProvider>
  );
};
