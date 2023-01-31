import React from 'react'
import { SimpleGrid, Stack, Icon, Text } from '@chakra-ui/react'
import { SocialIcon } from '@/components/Elements'
import { Socials } from '@/data/SocialsData'

const SocialFooter = () => {
  return (
    <Stack align={{ base: 'center', lg: 'flex-start' }}>
      <Text fontSize="xl" fontWeight="bold" py={2}>
        Community Hub
      </Text>
      <SimpleGrid columns={{ base: 3, lg: 7 }}>
        {Socials.map(social => (
          <SocialIcon
            key={social.href}
            link={social.href}
            Icon={<Icon as={social.icon} w={6} h={7} />}
          />
        ))}
      </SimpleGrid>
    </Stack>
  )
}

export default SocialFooter
