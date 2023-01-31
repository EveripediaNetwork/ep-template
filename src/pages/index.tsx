import { Link } from '@/components/Elements'
import { Center, Text, VStack } from '@chakra-ui/react'
import React from 'react'

const index = () => {
  return (
    <Center minH="50vh" p={4} textAlign={{ base: 'center', lg: 'left' }}>
      <VStack>
        <Text fontSize="4xl" fontWeight="bold">
          📜{' '}
          <Link color="brandLinkColor" href="http://iq.wiki">
            IQ WIKI
          </Link>{' '}
          Starter Template
        </Text>
        <Text>
          Start building your next project with this starter template.
        </Text>
      </VStack>
    </Center>
  )
}

export default index
