const config = {
  iqAddress:
    process.env.NEXT_PUBLIC_IQ_ADDRESS ||
    '0x5E959c60f86D17fb7D764AB69B654227d464E820',
  isProduction: process.env.NEXT_PUBLIC_IS_PRODUCTION || false,
  alchemyApiKey: String(process.env.NEXT_PUBLIC_ALCHEMY_API_KEY),
  alchemyChain: process.env.NEXT_PUBLIC_ALCHEMY_CHAIN || 'maticmum',
  chainId: process.env.NEXT_PUBLIC_CHAIN_ID || '80001',
  chainName: process.env.NEXT_PUBLIC_CHAIN_NAME || 'Mumbai',
  ensRPC: String(process.env.NEXT_PUBLIC_ENS_RPC),
  magicLinkApiKey: String(process.env.NEXT_PUBLIC_MAGIC_LINK_API_KEY),
}

export default config
