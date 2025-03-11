import ApplicationLogo from '@/components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';
import HeaderLayout from './Header';
import FooterLayout from './Footer';

export default function GuestLayout({ children }: PropsWithChildren) {
    return (
        <>
            <HeaderLayout />
            {children}
            <FooterLayout />
        </>
    );
}
