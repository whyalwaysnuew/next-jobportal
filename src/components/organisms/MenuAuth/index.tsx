import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { signOut, useSession } from 'next-auth/react';
import React, { FC } from 'react'
import { TbLogout } from 'react-icons/tb';
import { VscAccount } from 'react-icons/vsc';
import {IoIosArrowDown} from "react-icons/io";

interface MenuAuthProps {
  
}

const MenuAuth: FC<MenuAuthProps> = ({  }) => {
    const {data: session} = useSession()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="inline-flex items-center gap-1 cursor-pointer">
          <div className="font-semibold text-primary mr-2">{session?.user.name}</div>
          <IoIosArrowDown />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="font-semibold" onClick={() => {}}>
          <VscAccount className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="font-semibold text-red-500"
          onClick={() => signOut()}
        >
          <TbLogout className="mr-2 h-4 w-4" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default MenuAuth;