import Text "mo:base/Text";
import Nat "mo:base/Nat";
import Array "mo:base/Array";
import Principal "mo:base/Principal";

// Internal modules
import T "./Types"; 
import U "./Utils";

persistent actor CertifydBackend {

  // ─────────────────────────────────────────────────────────────────────────
  // STATE (stable → persists across upgrades)
  // ─────────────────────────────────────────────────────────────────────────

  stable var nfts: [T.NFT] = [];
  stable var nextId: Nat = 0;
  stable var users: [T.User] = [];
  stable var studentProfiles: [T.StudentProfile] = [];
  stable var diplomaRequests: [T.DiplomaRequest] = [];
  stable var nextRequestId: Nat = 0;
  stable var adminPrincipal: Principal = Principal.fromText("2vxsx-fae"); // Will be securely reset via claimAdmin()

  // ─────────────────────────────────────────────────────────────────────────
  // ADMIN & AUTH  
  // ─────────────────────────────────────────────────────────────────────────

  public shared(msg) func claimAdmin() : async Bool {
    if (Array.size(users) == 0) {
      adminPrincipal := msg.caller;
      let newUser: T.User = { id = msg.caller; email = "admin@certifyd.com"; passwordHash = ""; username = "SuperAdmin"; role = "admin"; isApproved = true };
      users := Array.append(users, [newUser]);
      return true;
    };
    return false;
  };

  // ─────────────────────────────────────────────────────────────────────────
  // AUTHENTICATION & REGISTRATION (Email-based)
  // ─────────────────────────────────────────────────────────────────────────

  public shared(msg) func signup(name: Text, email: Text, passwordHash: Text, role: Text) : async Bool {
    for (u in users.vals()) { if (u.email == email) { return false; }; };
    let newUser : T.User = {
      id = msg.caller; 
      email = email;
      passwordHash = passwordHash;
      username = name;
      role = role;
      isApproved = if (role == "institution") false else true;
    };
    users := Array.append<T.User>(users, [newUser]);
    true
  };

  public query func login(email: Text, passwordHash: Text) : async ?Text {
    for (u in users.vals()) {
      if (u.email == email and u.passwordHash == passwordHash) {
        return ?u.role;
      };
    };
    null
  };

  public shared(msg) func approveInstitution(targetEmail: Text) : async Bool {
    if (msg.caller != adminPrincipal) return false;
    var found = false;
    users := Array.map<T.User, T.User>(users, func(u: T.User) : T.User {
      if (u.email == targetEmail) { found := true; { u with isApproved = true } } else { u }
    });
    found
  };

  // ─────────────────────────────────────────────────────────────────────────
  // DIPLOMA MINTING & MANAGEMENT
  // ─────────────────────────────────────────────────────────────────────────

  public shared func mint(ownerEmail: Text, metadata: Text, diplomaInfo: T.DiplomaInfo) : async T.NFT {
    let id = nfts.size();
    let nft : T.NFT = {
      id = id;
      owner_id = ownerEmail;
      issuer_id = diplomaInfo.institution;
      metadata = metadata;
      diplomaInfo = diplomaInfo;
      mintSeal = U.buildMintSeal(id, ownerEmail, diplomaInfo.institution, diplomaInfo.diplomaType);
      isRevoked = false;
    };
    nfts := Array.append<T.NFT>(nfts, [nft]);
    nft
  };

  public shared func requestDiploma(studentEmail: Text, studentName: Text, institutionEmail: Text, diplomaType: Text, gradDate: Text, desc: Text) : async T.DiplomaRequest {
    let id = nextRequestId;
    nextRequestId += 1;
    let req : T.DiplomaRequest = {
      id = id; student_id = studentEmail; studentName = studentName; institution_id = institutionEmail;
      diplomaType = diplomaType; graduationDate = gradDate; description = desc;
      status = "pending";
    };
    diplomaRequests := Array.append<T.DiplomaRequest>(diplomaRequests, [req]);
    req
  };

  public shared func approveRequest(reqId: Nat, institutionName: Text, metadata: Text) : async ?T.NFT {
    var foundReq: ?T.DiplomaRequest = null;
    diplomaRequests := Array.map<T.DiplomaRequest, T.DiplomaRequest>(diplomaRequests, func(req: T.DiplomaRequest) : T.DiplomaRequest {
      if (req.id == reqId and req.status == "pending") {
        foundReq := ?req;
        { req with status = "approved" }
      } else { req }
    });

    switch (foundReq) {
      case null { null };
      case (?req) {
        let diplomaInfo : T.DiplomaInfo = {
          diplomaType = req.diplomaType;
          institution = institutionName;
          graduationDate = req.graduationDate;
          studentName = req.studentName; 
          description = req.description;
          promotion = "";
          classId = "";
        };
        ? (await mint(req.student_id, metadata, diplomaInfo))
      };
    }
  };

  public shared func rejectRequest(reqId: Nat, issuerEmail: Text) : async Bool {
    var found = false;
    diplomaRequests := Array.map<T.DiplomaRequest, T.DiplomaRequest>(diplomaRequests, func(req: T.DiplomaRequest) : T.DiplomaRequest {
      if (req.id == reqId and req.status == "pending") {
        found := true;
        { req with status = "rejected" }
      } else { req }
    });
    found
  };

  public shared func revokeNFT(nftId: Nat, issuerEmail: Text) : async Bool {
    var found = false;
    nfts := Array.map<T.NFT, T.NFT>(nfts, func(nft: T.NFT) : T.NFT {
      if (nft.id == nftId) { found := true; { nft with isRevoked = true } } else { nft }
    });
    found
  };

  // ─────────────────────────────────────────────────────────────────────────
  // DATA QUERIES
  // ─────────────────────────────────────────────────────────────────────────

  public query func getNFT(nftId: Nat) : async ?T.NFT {
    for (nft in nfts.vals()) { if (nft.id == nftId) return ?nft; };
    null
  };

  public query func getNFTsByOwner(email: Text) : async [T.NFT] {
    Array.filter(nfts, func(nft: T.NFT) : Bool { nft.owner_id == email })
  };

  public query func getNFTsByIssuer(email: Text) : async [T.NFT] {
    Array.filter(nfts, func(nft: T.NFT) : Bool { nft.issuer_id == email })
  };

  public query func getPendingRequests(email: Text) : async [T.DiplomaRequest] {
    Array.filter(diplomaRequests, func(req: T.DiplomaRequest) : Bool { req.institution_id == email and req.status == "pending" })
  };

  public query func getStudentRequests(email: Text) : async [T.DiplomaRequest] {
    Array.filter(diplomaRequests, func(req: T.DiplomaRequest) : Bool { req.student_id == email })
  };

  public shared(msg) func getPendingInstitutions() : async [T.User] {
    if (msg.caller != adminPrincipal) { return []; };
    Array.filter(users, func(u: T.User) : Bool { u.role == "institution" and not u.isApproved })
  };

  public query func resolveIssuer(issuerPrincipal: Principal) : async ?Text {
    for (u in users.vals()) { if (u.id == issuerPrincipal) return ?u.username; };
    null
  };
}
