import { Actor, HttpAgent } from "@dfinity/agent";
import { idlFactory } from "../declarations/minting_nft_dapp";

// Create the agent
async function createMintingCanister() {
  //
  const agent = await HttpAgent.create();
  const mintingCanister = Actor.createActor(idlFactory, {
    agent,
    canisterId: process.env.MINTING_CANISTER_ID as string,
  })
}

const mintingCanister = await createMintingCanister();