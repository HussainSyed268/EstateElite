'use client';

import * as React from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ArrowSquareUpRight as ArrowSquareUpRightIcon } from '@phosphor-icons/react/dist/ssr/ArrowSquareUpRight';
import { CaretUpDown as CaretUpDownIcon } from '@phosphor-icons/react/dist/ssr/CaretUpDown';

import { paths } from '../paths/paths';
import { isNavItemActive } from '../lib/isNavItemActive';
// import { Logo } from '@/components/core/logo';

import { navIcons } from './nav-icons';



export function MobileNav({ open, onClose }){
  const pathname = window.location.pathname;

  return (
    <></>
  );
}

function renderNavItems({ items = [], pathname })  {
  const children = items.reduce((acc, curr) => {
    const { key, ...item } = curr;

    acc.push(<NavItem key={key} pathname={pathname} {...item} />);

    return acc;
  }, []);

  return (
   <></>
  );
}



function NavItem({ disabled, external, href, icon, matcher, pathname, title }){
  const active = isNavItemActive({ disabled, external, href, matcher, pathname });
  const Icon = icon ? navIcons[icon] : null;

  return (
    <li>
      <></>
    </li>
  );
}
