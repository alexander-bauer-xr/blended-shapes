// src/components/Layout.tsx
import { ReactNode, useEffect } from 'react';
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