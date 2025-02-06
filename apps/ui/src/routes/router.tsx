import { createBrowserRouter } from 'react-router-dom';
import { DashboardPage } from '../modules/dashboard/DashboardPage.tsx';
import { ExplorerPage } from '../modules/explorer/ExplorerPage.tsx';
import { QueuePage } from '../modules/queue/QueuePage.tsx';
import { DownloadPage } from '../modules/search/DownloadPage.tsx';
import { SearchPage } from '../modules/search/SearchPage.tsx';

export const router = createBrowserRouter([
  {
    children: [
      { element: <ExplorerPage/>, path: '/explorer' },
      { element: <QueuePage/>, path: '/queue' },
      {
        children: [
          { element: <DownloadPage/>, path: '/search/:mediaUrl' },
          { element: <SearchPage/>, path: '/search' },
        ],
        path: '/search',
      },
    ],
    element: <DashboardPage/>,
    path: '/',
  },
]);
