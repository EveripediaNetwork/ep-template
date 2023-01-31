import React, { memo, RefObject, useState } from 'react'
import {
  Box,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Text,
  MenuButton,
  Menu,
  HStack,
  Image,
  MenuList,
  MenuItem,
  Spinner,
  useToast,
} from '@chakra-ui/react'
import { useAccount } from 'wagmi'
import { FocusableElement } from '@chakra-ui/utils'
import { RiArrowLeftSLine, RiRefreshLine } from 'react-icons/ri'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { shortenAccount } from '@/utils/textUtils'
import Connectors from '@/components/Layout/WalletDrawer/Connectors'
import { walletsLogos } from '@/data/WalletData'
import Avatar from '@/components/Elements/Avatar'
import { useDispatch } from 'react-redux'

import { updateWalletDetails } from '@/store/slices/user-slice'
import NetworkMenu from '@/components/Layout/Network/NetworkMenu'
import { useENSData } from '@/hooks/useENSData'
import { useHiIQBalance } from '@/hooks/useHiIQBalance'
import { useFetchWalletBalance } from '@/hooks/UseFetchWallet'

type WalletDrawerType = {
  toggleOperations: {
    isOpen: boolean
    onClose: () => void
    onOpen: () => void
  }
  finalFocusRef: RefObject<FocusableElement>
  setHamburger: React.Dispatch<React.SetStateAction<boolean>>
}

const WalletDrawer = ({
  toggleOperations,
  finalFocusRef,
  setHamburger,
}: WalletDrawerType) => {
  const { address: userAddress, isConnected: isUserConnected } = useAccount()
  const [, username] = useENSData(userAddress)
  useHiIQBalance(userAddress)
  const [accountRefreshLoading, setAccountRefreshLoader] =
    useState<boolean>(false)
  const toast = useToast()
  const { refreshBalance } = useFetchWalletBalance(userAddress)
  const dispatch = useDispatch()

  const handleNavigation = () => {
    toggleOperations.onClose()
    setHamburger(true)
  }

  const handleAccountRefresh = () => {
    if (typeof userAddress !== 'undefined') {
      setAccountRefreshLoader(true)
      refreshBalance().then(response => {
        dispatch(updateWalletDetails(response))
        setAccountRefreshLoader(false)
        toast({
          description: 'Account successfully refreshed',
          status: 'success',
          duration: 4000,
          isClosable: true,
          position: 'bottom-right',
        })
      })
    }
  }

  return toggleOperations.isOpen ? (
    <Drawer
      isOpen={toggleOperations.isOpen}
      onClose={toggleOperations.onClose}
      placement="right"
      finalFocusRef={finalFocusRef}
      trapFocus={false}
      size="sm"
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader mt={7}>
          <Flex
            w="full"
            cursor="pointer"
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
          >
            <HStack flex="1">
              <Box
                onClick={handleNavigation}
                display={{ sm: 'block', md: 'none' }}
              >
                <RiArrowLeftSLine size="30" />
              </Box>
              <Avatar address={userAddress} alt={userAddress} />
              <Box>
                <Menu>
                  <MenuButton pl={1} fontSize="md" fontWeight={600}>
                    My Wallet {isUserConnected && <ChevronDownIcon />}
                  </MenuButton>
                  {isUserConnected && (
                    <MenuList py={0}>
                      <MenuItem py={3}>
                        <Image
                          boxSize="24px"
                          borderRadius="full"
                          src={`/images/wallet-logos/${walletsLogos[0]}`}
                          alt="MetaMask"
                          mr={3}
                        />
                        <Text fontSize="small" fontWeight="bold">
                          MetaMask
                        </Text>
                      </MenuItem>
                      <Divider />
                      <MenuItem
                        onClick={handleAccountRefresh}
                        closeOnSelect={false}
                        py={3}
                        icon={<RiRefreshLine size={25} />}
                      >
                        <Flex>
                          <Text flex="1" fontSize="small" fontWeight="bold">
                            Refresh
                          </Text>
                          {accountRefreshLoading && <Spinner size="sm" />}
                        </Flex>
                      </MenuItem>
                    </MenuList>
                  )}
                </Menu>
                {isUserConnected && (
                  <Text color="fadedText2" pl={1} fontSize="sm">
                    {username || (userAddress && shortenAccount(userAddress))}
                  </Text>
                )}
              </Box>
            </HStack>
            <NetworkMenu />
          </Flex>
        </DrawerHeader>
        <Divider />
        <DrawerBody shadow="sm">
          <Connectors openWalletDrawer={toggleOperations.onOpen} />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  ) : null
}

export default memo(WalletDrawer)
