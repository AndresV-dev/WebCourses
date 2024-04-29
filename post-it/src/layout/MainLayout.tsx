import { FC, ReactNode } from "react";
import Sidebar from "../components/Sidebar";

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  return (
    <>
      {<Sidebar />}
      {children}
      {/**Footer */}
    </>
  );
};
