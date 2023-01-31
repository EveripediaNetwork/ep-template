import { RiWalletFill } from 'react-icons/ri'
import { NavItem } from '@/types/NavItemType'

export const NAV_ITEMS: NavItem[] = []

export const NAV_ICON = {
  label: 'Account',
  id: 5,
  href: '#',
  subItem: [],
}

export const mobileWalletDetails: NavItem = {
  label: 'Wallet',
  href: '#',
  id: 6,
  icon: RiWalletFill,
}

export const MOBILE_NAV_ITEMS: NavItem[] = []
