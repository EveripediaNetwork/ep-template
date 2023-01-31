import React from 'react'
import { Box, BoxProps } from '@chakra-ui/react'
import NextImage, { ImageProps } from 'next/image'

export type NextChakraImageProps = Omit<Omit<BoxProps, 'as'>, 'objectFit'> &
  Omit<Omit<ImageProps, 'width'>, 'height'> & {
    imgW?: number
    imgH?: number
    hideOnError?: boolean
    objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down'
  }

export const Image = ({
  src,
  alt,
  imgW,
  imgH,
  priority,
  placeholder,
  blurDataURL,
  hideOnError,
  sizes,
  objectFit = 'cover',
  ...rest
}: NextChakraImageProps) => (
  <Box
    h={`${imgH}px`}
    w={`${imgW}px`}
    {...rest}
    overflow="hidden"
    position="relative"
  >
    <NextImage
      quality={95}
      style={{
        objectFit,
        objectPosition: 'center',
        width: '100%',
        height: '100%',
      }}
      fill={!(imgW && imgH)}
      src={src}
      alt={alt}
      onError={e => {
        if (hideOnError) {
          e.currentTarget.style.visibility = 'hidden'
        }
      }}
      priority={priority}
      sizes={sizes}
      placeholder={placeholder}
      blurDataURL={blurDataURL}
      loading={priority ? 'eager' : 'lazy'}
      width={imgW}
      height={imgH}
    />
  </Box>
)
