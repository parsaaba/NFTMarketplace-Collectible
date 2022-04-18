export const isValidNFTAddress = (address: string) => {
  return address.match(/^0x[0-9a-fA-F]{40}$/);
};

export const isValidBid = (bid: string) => {
  return bid.match(/^[0-9]+$/);
};

export const isValidTokenId = (tokenId: string) => {
  return tokenId.match(/^[0-9]+$/);
};

export const isValidDuration = (duration: string) => {
  return duration.match(/^[0-9]+$/);
};

export const isValidFingerprint = (fingerprint: string) => {
  return fingerprint.match(/^[0-9a-fA-F]{64}$/);
};
