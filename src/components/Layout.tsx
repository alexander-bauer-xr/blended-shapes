// src/components/Layout.tsx
import { ReactNode } from 'react';
import Header from './Header';

type LayoutProps = {
    children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {

    return (
        <>
            <Header />
            {children}
        </>
    );
};

export default Layout;