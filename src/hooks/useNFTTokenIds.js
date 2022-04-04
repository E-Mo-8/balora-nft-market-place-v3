import { useMoralisDapp } from "providers/MoralisDappProvider/MoralisDappProvider";
import { useEffect, useState } from "react";
import { useMoralisWeb3Api, useMoralisWeb3ApiCall } from "react-moralis";
import { useIPFS } from "./useIPFS";

export const useNFTTokenIds = (addr) => {
  const { token } = useMoralisWeb3Api();
  const { chainId } = useMoralisDapp();
  const { resolveLink } = useIPFS();
  const [NFTTokenIds, setNFTTokenIds] = useState([]);
  const [totalNFTs, setTotalNFTs] = useState();
  const [fetchSuccess, setFetchSuccess] = useState(true);
  const {
    fetch: getNFTTokenIds,
    data,
    error,
    isLoading,
  } = useMoralisWeb3ApiCall(token.getAllTokenIds, {
    chain: chainId,
    address: addr,
    limit: 10,
  });

  useEffect(() => {
    async function fetchData() {
      if (data?.result) {
        
        const NFTs = data.result;
        setTotalNFTs(data.total);
        setFetchSuccess(true);
        for (let NFT of NFTs) {
          var currentNft;
          if (NFT?.metadata) {
            console.log("data.result" + JSON.parse(JSON.stringify(NFT.metadata)))
            try {
              currentNft  = JSON.parse(NFT.metadata)
              } catch(e) {
                currentNft = NFT.metadata
              }
            NFT.metadata = currentNft; //JSON.parse(example);
            NFT.image = resolveLink(currentNft?.image);
          } else if (NFT?.token_uri) {
            try {
              await fetch(NFT.token_uri)
                .then((response) => response.json())
                .then((data) => {
                  NFT.image = resolveLink(data.image);
                });
            } catch (error) {
              setFetchSuccess(false);

              /*          !!Temporary work around to avoid CORS issues when retrieving NFT images!!
                          Create a proxy server as per https://dev.to/terieyenike/how-to-create-a-proxy-server-on-heroku-5b5c
                          Replace <your url here> with your proxy server_url below
                          Remove comments :)
              
                            try {
                              await fetch(`<your url here>/${NFT.token_uri}`)
                              .then(response => response.json())
                              .then(data => {
                                NFT.image = resolveLink(data.image);
                              });
                            } catch (error) {
                              setFetchSuccess(false);
                            }
              
               */
            }
          }
        }
        setNFTTokenIds(NFTs);
      }
    }
    fetchData();
  }, [data, resolveLink]);

  return {
    getNFTTokenIds,
    NFTTokenIds,
    totalNFTs,
    fetchSuccess,
    error,
    isLoading,
  };
};
