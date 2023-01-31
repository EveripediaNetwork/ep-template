import React, { Suspense } from 'react'
import { Box, Stack } from '@chakra-ui/react'
import Footer from '@/components/Layout/Footer/Footer'
import NetworkErrorNotification from '@/components/Layout/Network/NetworkErrorNotification'
import Navbar from '../Navbar/Navbar'
import GoogleAnalyticsScripts from '../GoogleAnalyticsScripts'

const Layout = ({
  children,
  noFooter,
}: {
  children: React.ReactNode
  noFooter?: boolean
}) => {
  return (
    <>
      <GoogleAnalyticsScripts />

      <Stack justify="space-between" minH="100vh" spacing={0}>
        <Navbar />
        <Box as="main" pt={20}>
          {children}
        </Box>
        <Suspense>{!noFooter && <Footer />}</Suspense>
      </Stack>

      <NetworkErrorNotification />
    </>
  )
}

export default Layout
