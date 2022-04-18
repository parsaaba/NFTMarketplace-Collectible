import React, { useContext, useEffect, useState } from "react";
import { NFTMarketplaceContext } from "../hardhat/SymfoniContext";
import CopyText from "./CopyText";
import {
  isValidNFTAddress,
  isValidBid,
  isValidTokenId,
  isValidDuration,
  isValidFingerprint,
} from "../utils/validator";

interface Props {}

export const NFTMarketplace: React.FC<Props> = () => {
  const nftMarketplace = useContext(NFTMarketplaceContext);
  const [error, setError] = useState("");
  const [marketplaceAddress, setMarketplaceAddress] = useState("");
  const [bid, setBid] = useState("");
  const [nftAddress, setNftAddress] = useState("");
  const [tokenId, setTokenId] = useState("");
  const [duration, setDuration] = useState("");
  const [fingerprint, setFingerprint] = useState("");
  useEffect(() => {
    const doAsync = async () => {
      if (!nftMarketplace.instance) return;
      console.log(
        "NFTMarketplace is deployed at ",
        nftMarketplace.instance.address
      );
      setMarketplaceAddress(nftMarketplace.instance.address);
    };
    doAsync();
  }, [nftMarketplace]);

  const showErrorMessage = (message: string) => {
    setError(message);
  };

  const handlePlaceBid = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (!nftMarketplace.instance) {
      showErrorMessage("NFT Marketplace instance not ready, please re-deploy");
      return;
    }
    if (nftMarketplace.instance) {
      if (!bid || !nftAddress || !tokenId || !duration) {
        showErrorMessage("Please fill all fields");
        return;
      }
      // validate bid for amount
      if (!isValidBid(bid)) {
        showErrorMessage(`Bid amount ${bid} is not a valid bid.`);
        return;
      }
      // validate nftAddress for address
      if (!isValidNFTAddress(nftAddress)) {
        showErrorMessage(
          `NFT address ${nftAddress} is not a valid NFT address.`
        );
        return;
      }
      // validate tokenId
      if (!isValidTokenId(tokenId)) {
        showErrorMessage(`Token ID ${tokenId} is not a valid token ID.`);
        return;
      }
      // validate duration
      if (!isValidDuration(duration)) {
        showErrorMessage(`Duration ${duration} is not a valid duration.`);
        return;
      }
      // validate fingerprint
      if (fingerprint && !isValidFingerprint(fingerprint)) {
        showErrorMessage(
          `Fingerprint ${fingerprint} is not a valid fingerprint.`
        );
        return;
      }
      const placeBidSuccessfulTx = await nftMarketplace.instance.placeBid(
        nftAddress,
        bid,
        tokenId,
        duration,
        fingerprint
      );
      if (placeBidSuccessfulTx) {
        console.log("place bid tx: ", placeBidSuccessfulTx);
        await placeBidSuccessfulTx.wait();
        setBid("");
        setDuration("");
        setTokenId("");
        setFingerprint("");
      }
      console.log(
        "View bids by token id, result: ",
        await nftMarketplace.instance.getBidByToken("", "", 1)
      );
    }
  };
  return (
    <div>
      <CopyText text={marketplaceAddress}>
        NFT Marketplace deployed at
        <div className="Address">{marketplaceAddress}</div>
      </CopyText>

      <form>
        <table className="Input-table">
          <thead>
            <th align="center"></th>
            <th align="center"></th>
          </thead>
          <tbody className="Input-table-body">
            <tr className="Input-table-row">
              <td className="Input-table-cell">Bid Value</td>
              <td className="Input-table-cell">
                <input
                  className="Input"
                  id="bid"
                  onChange={(e) => setBid(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td className="Input-table-cell">NFT Token Address</td>
              <td className="Input-table-cell">
                <input
                  className="Input"
                  id="nftAddress"
                  onChange={(e) => setNftAddress(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td className="Input-table-cell">Token ID</td>
              <td className="Input-table-cell">
                <input
                  className="Input"
                  id="tokenId"
                  onChange={(e) => setTokenId(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td className="Input-table-cell">Bid Valid Until</td>
              <td className="Input-table-cell">
                <input
                  className="Input"
                  id="duration"
                  onChange={(e) => setDuration(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td className="Input-table-cell">NFT Fingerprint</td>
              <td className="Input-table-cell">
                <input
                  className="Input"
                  id="fingerprint"
                  onChange={(e) => setFingerprint(e.target.value)}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <p className="Error-message">{error}</p>
        <button className="Button" onClick={(e) => handlePlaceBid(e)}>
          Place Bid
        </button>
      </form>
    </div>
  );
};
