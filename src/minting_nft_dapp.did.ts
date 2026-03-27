export const idlFactory = ({ IDL }) => {

    const DiplomaInfo = IDL.Record({
      diplomaType: IDL.Text,
      institution: IDL.Text,
      graduationDate: IDL.Text,
      studentName: IDL.Text,
      description: IDL.Text,
    });
    const NFT = IDL.Record({
      id: IDL.Nat,
      owner: IDL.Principal,
      metadata: IDL.Text,
      diplomaInfo: DiplomaInfo,
    });
    return IDL.Service({
      'mint': IDL.Func([IDL.Principal, IDL.Text], [NFT], []),
      'mintWithDiplomaInfo': IDL.Func(
        [IDL.Principal, IDL.Text, DiplomaInfo],
        [NFT],
        []
      ),
      'getAllNFTs': IDL.Func([], [IDL.Vec(NFT)], ['query']),
      'getNFTsByOwner': IDL.Func([IDL.Principal], [IDL.Vec(NFT)], ['query']),
    });
  };
  export const init = ({ IDL }) => {
    return [];
  };
  