import { Actor, HttpAgent } from '@dfinity/agent';
import { idlFactory } from './declarations/minting_nft_dapp';

const agent = await HttpAgent.create();
const mintingCanister = Actor.createActor(idlFactory, {
  agent,
  canisterId: process.env.MINTING_CANISTER_ID,
}); 

export const mintNFT = async (owner, metadata) => {
  try {
    const nft = await mintingCanister.mint(owner, metadata);
    return nft;
  } catch (error) {
    console.error('Minting failed', error);
  }
};

export const getAllNFTs = async () => {
  return await mintingCanister.getAllNFTs();
};
