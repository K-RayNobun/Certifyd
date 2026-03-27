import Text "mo:base/Text";
import Nat "mo:base/Nat";
import Principal "mo:base/Principal";

module Utils {

  // Build a deterministic mint seal string from the core diploma data attributes.
  // This acts as a human-readable and cryptographically persistent fingerprint.
  public func buildMintSeal(nftId: Nat, ownerEmail: Text, issuerEmail: Text, diplomaType: Text) : Text {
    "CERTIFYD-SEAL:" # Nat.toText(nftId)
      # "|owner:" # ownerEmail
      # "|issuer:" # issuerEmail
      # "|type:" # diplomaType
  };
}
