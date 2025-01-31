import { Outlet } from 'react-router-dom';
import { MainHeader } from './components/Header.tsx';
import { Navbar } from './components/Navbar.tsx';

export const DashboardPage = () => {
  return (
      <>
        <MainHeader/>
        <Navbar/>
        <Outlet/>
      </>
  );
};
