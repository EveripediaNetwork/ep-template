import Avatar from '@/components/Elements/Avatar'
import { NAV_ICON } from '@/data/NavItemData'
import { Box } from '@chakra-ui/react'
import React, { Dispatch, SetStateAction } from 'react'
import { getCachedUserAddress } from '@/utils/getCachedUserAddress'
import { ColorModeToggle } from './ColorModeToggle'
import NavMenu from './NavMenu'
import { LogOutBtn } from './Logout'

interface ProfileNavMenuProps {
  setVisibleMenu: Dispatch<SetStateAction<number | null>>
  visibleMenu: number | null
}

const ProfileNavMenu = ({
  setVisibleMenu,
  visibleMenu,
}: ProfileNavMenuProps) => {
  const userAddress = getCachedUserAddress()
  return (
    <Box onMouseLeave={() => setVisibleMenu(null)}>
      <NavMenu
        navItem={NAV_ICON}
        setVisibleMenu={setVisibleMenu}
        visibleMenu={visibleMenu}
        label={
          <Avatar
            key={userAddress}
            address={userAddress}
            size={25}
            alt={userAddress}
          />
        }
      >
        <ColorModeToggle isInMobileMenu={false} />
        {userAddress && <LogOutBtn isInMobileMenu={false} />}
      </NavMenu>
    </Box>
  )
}

export default ProfileNavMenu
