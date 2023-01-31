import type { NextApiRequest, NextApiResponse } from 'next'
import { StaticJsonRpcProvider } from '@ethersproject/providers'
import { getAddress, isAddress } from '@ethersproject/address'
import config from '@/config'

const provider = new StaticJsonRpcProvider(config.ensRPC)

const firstParam = (param: string | string[]) => {
  return Array.isArray(param) ? param[0] : param
}

const resolve = (from: string, to: string) => {
  const resolvedUrl = new URL(to, new URL(from, 'resolve://'))
  if (resolvedUrl.protocol === 'resolve:') {
    const { pathname, search, hash } = resolvedUrl
    return `${pathname}${search}${hash}`
  }
  return resolvedUrl.toString()
}

type Data = {
  address: string | null
  name: string | null
  displayName: string
  avatar: string | null
  error?: string
}

const resolveAddress = async (
  lowercaseAddress: string,
  res: NextApiResponse<Data>,
) => {
  const address = getAddress(lowercaseAddress)
  let displayName = address.replace(
    /^(0x[0-9A-F]{3})[0-9A-F]+([0-9A-F]{4})$/i,
    '$1…$2',
  )

  try {
    const name = await provider.lookupAddress(address)
    if (name) {
      displayName = name
    }

    const avatar = name ? await provider.getAvatar(name) : null

    res
      .status(200)
      .setHeader('Cache-Control', `s-maxage=300, stale-while-revalidate=3600`)
      .json({ address, name, displayName, avatar })
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({
        address,
        name: null,
        displayName,
        avatar: null,
        error: error.message,
      })
    }
  }
}

const resolveName = async (name: string, res: NextApiResponse<Data>) => {
  const displayName = name
  try {
    const [address, avatar] = await Promise.all([
      provider.resolveName(name),
      provider.getAvatar(name),
    ])
    res
      .status(200)
      .setHeader('Cache-Control', `s-maxage=300, stale-while-revalidate=3600`)
      .json({ address, name, displayName, avatar })
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({
        address: null,
        name,
        displayName,
        avatar: null,
        error: error.message,
      })
    }
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const inputAddress = firstParam(req.query.address as string)
  const lowercaseAddress = inputAddress.toLowerCase()

  if (inputAddress !== lowercaseAddress) {
    return res.redirect(307, resolve(req.url || '', lowercaseAddress))
  }

  return isAddress(lowercaseAddress)
    ? resolveAddress(lowercaseAddress, res)
    : resolveName(lowercaseAddress, res)
}
