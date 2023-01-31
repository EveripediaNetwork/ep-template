export const shortenText = (text: string, length: number) => {
  return text?.length > length ? `${text.substring(0, length)}...` : text
}

export const shortenBalance = (balance: number | null) => {
  return typeof balance === 'number' ? balance.toFixed(2) : balance
}

export const shortenAccount = (
  account: string,
  firstTakeLength = 6,
  secondTakeLength = 4,
) => {
  const firstChunk = account.substring(0, firstTakeLength)
  const secondChunk = account.substring(account.length - secondTakeLength)

  return `${firstChunk}...${secondChunk}`
}
