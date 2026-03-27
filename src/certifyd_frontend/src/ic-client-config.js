import { HttpAgent } from "@dfinity/agent";
import { IDL } from "@dfinity/candid";

export const agent = new HttpAgent({
  host: "https://gateway.ic.network",
});

export const contractCanisterId = "<CANISTER_ID>"; // Insérez l'ID de votre canister ici
export const contractIDL = IDL.fromJSON(<CONTRACT_IDL_JSON>);
