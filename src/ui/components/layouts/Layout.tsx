import type { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from 'react-router-dom';

interface LayoutProps {
  children?: ReactNode; 
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-6">
        {children || <Outlet />} 
      </main>
      <Footer />
    </div>
  );
};

export default Layout;