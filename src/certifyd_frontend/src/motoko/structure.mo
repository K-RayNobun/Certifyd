tpye Contract = {
    id: Nat;
    creatorUserId: Text;
    parties: [Party.Party]
}

type Contractor = {
    userId: Text;
    approvedContractTerms: Bool;
}