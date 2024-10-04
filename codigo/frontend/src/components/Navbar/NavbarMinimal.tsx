import { useState } from 'react';
import { Center, Tooltip, UnstyledButton, Stack, rem } from '@mantine/core';
import {
    IconHome2,
    IconCar,
    IconContract,
    IconLogout,
} from '@tabler/icons-react';
import '@mantine/core/styles.css';
import { Image } from '@mantine/core';
import classes from './NavbarMinimal.module.css';

interface NavbarLinkProps {
    icon: typeof IconHome2;
    label: string;
    href: string;
    active?: boolean;
    onClick?(): void;
}

function NavbarLink({ icon: Icon, label, href, active, onClick }: NavbarLinkProps) {
    return (
        <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
            <a href={href}>
                <UnstyledButton onClick={onClick} className={classes.link} data-active={active || undefined}>
                    <Icon style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
                </UnstyledButton>
            </a>
        </Tooltip>
    );
}

const mockdata = [
    { icon: IconHome2, label: 'Home', href: '/' },
    { icon: IconCar, label: 'Carros', href: '/carros' },
    { icon: IconContract, label: 'Contratos', href: '/tabela' },
];

export function NavbarMinimal() {
    const [active, setActive] = useState(0);



    const links = mockdata.map((link, index) => (
        <NavbarLink
            {...link}
            key={link.label}
            href={link.href || '#'}
            active={index === active}
            onClick={() => setActive(index)}
        />
    ));

    return (
        <nav className={classes.navbar}>
            <Center>
                <Image 
                fit='contain'
                src="../assets/LocalizeLogo.png"
                />
            </Center>

            <div className={classes.navbarMain}>
                <Stack justify="center" gap={0}>
                    {links}
                </Stack>
            </div>

            <Stack justify="center" gap={0}>
                <NavbarLink icon={IconLogout} label="Logout" href='*****FAZER ELE DESLOGAR*****' />
            </Stack>
        </nav>
    );
}