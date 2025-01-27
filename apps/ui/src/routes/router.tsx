import { createHashRouter } from 'react-router-dom';
import { DashboardPage } from '../modules/dashboard/DashboardPage.tsx';
import { ExplorerPage } from '../modules/explorer/ExplorerPage.tsx';
import { QueuePage } from '../modules/queue/QueuePage.tsx';
import { SearchPage } from '../modules/search/SearchPage.tsx';

export const router = createHashRouter([
  {
    children: [
      { element: <ExplorerPage/>, path: '/explorer' },
      { element: <QueuePage/>, path: '/queue' },
      { element: <SearchPage/>, path: '/search' },
    ],
    element: <DashboardPage/>,
    path: '/',
  },
]);