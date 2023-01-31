import { Icon, IconProps } from '@chakra-ui/react'
import React from 'react'

export const Flag = (props: IconProps) => {
  return (
    <Icon viewBox="0 0 24 25" fill="currentColor" {...props}>
      <path d="M0 0H12.5093C12.7569 0.000132198 12.9995 0.0691775 13.21 0.199403C13.4206 0.329629 13.5907 0.515892 13.7013 0.737333L14.6667 2.66667H22.6667C23.0203 2.66667 23.3594 2.80714 23.6095 3.05719C23.8595 3.30724 24 3.64638 24 4V18.6667C24 19.0203 23.8595 19.3594 23.6095 19.6095C23.3594 19.8595 23.0203 20 22.6667 20H14.1573C13.9098 19.9999 13.6672 19.9308 13.4566 19.8006C13.2461 19.6704 13.076 19.4841 12.9653 19.2627L12 17.3333H2.66667V25.3333H0V0Z" />
    </Icon>
  )
}