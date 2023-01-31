import React, { useEffect } from 'react'
import CustomAvatar from 'boring-avatars'
import {
  Avatar as ChakraAvatar,
  Center,
  ChakraProps,
  SystemStyleObject,
  HTMLChakraProps,
  Icon,
} from '@chakra-ui/react'
import { AvatarColorArray } from '@/data/AvatarData'
import { RiUserLine } from 'react-icons/ri'
import { useENSData } from '@/hooks/useENSData'

type DisplayAvatarProps = ChakraProps & {
  address?: string | null
  svgProps?: SystemStyleObject
  avatarIPFS?: string | null
  wrapperProps?: HTMLChakraProps<'span'>
  size?: number
  alt: string | undefined
}
const Avatar = ({
  address,
  svgProps,
  avatarIPFS,
  wrapperProps,
  size = 26,
  alt,
  ...rest
}: DisplayAvatarProps) => {
  const [avatar] = useENSData(address)

  const content = () => {
    if (avatar)
      return (
        <ChakraAvatar boxSize={`${size}px`} src={avatar} name={alt} {...rest} />
      )

    if (address)
      return (
        <CustomAvatar
          size={size}
          variant="pixel"
          name={address}
          colors={AvatarColorArray}
        />
      )

    return (
      <Icon
        cursor="pointer"
        fontSize={size}
        color="gray.600"
        _dark={{ color: 'gray.200' }}
        fontWeight={600}
        as={RiUserLine}
        title={alt}
      />
    )
  }

  return (
    <Center
      {...wrapperProps}
      sx={{
        svg: {
          ...svgProps,
        },
      }}
      borderRadius="full"
    >
      {content()}
    </Center>
  )
}

export default Avatar
