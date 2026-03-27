import Principal "mo:base/Principal";

module Types {

  public type User = {
    id: Principal;
    email: Text;
    passwordHash: Text;
    username: Text;
    role: Text;       // "student" | "institution" | "admin"
    isApproved: Bool; // Institutions require admin approval before they can mint
  };

  public type StudentProfile = {
    principal: Text;
    fullName: Text;
    universityId: Text;   // The approved institution they are enrolled in
    graduationYear: Text; // e.g. "2025"
    promotion: Text;      // e.g. "Promotion Alpha 2025"
    classId: Text;        // e.g. "Computer Science – Batch 3"
  };

  public type DiplomaInfo = {
    diplomaType: Text;
    institution: Text;
    graduationDate: Text;
    studentName: Text;
    description: Text;
    promotion: Text;
    classId: Text;
  };

  public type NFT = {
    id: Nat;
    owner_id: Text;
    issuer_id: Text;
    metadata: Text;
    diplomaInfo: DiplomaInfo;
    mintSeal: Text;
    isRevoked: Bool;
  };

  public type DiplomaRequest = {
    id: Nat;
    student_id: Text;
    studentName: Text;
    institution_id: Text;
    diplomaType: Text;
    graduationDate: Text;
    description: Text;
    status: Text; // "pending" | "approved" | "rejected"
  };
}
