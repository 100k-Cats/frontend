import React from "react";
import ReactDOM from 'react-dom';
import styled from 'styled-components';

const Faq = ({ show, onClose, fontsize }) => {
  const title = 'frequently asked questions';
  const [browser, setBrowser] = React.useState(false);

  React.useEffect(() => {
    setBrowser(true);
  }, []);

  const handleCloseClick = (e) => {
    e.preventDefault();
    onClose();
  };

  const modalContent = show ? (
    <StyledModalOverlay>
      <StyledModal>
        <StyledModalHeader>
          <a href="#" onClick={handleCloseClick}>
            x
          </a>
        </StyledModalHeader>
        {title && <StyledModalTitle>{title}</StyledModalTitle>}
        <StyledModalBody>
          <div style={{ marginTop: '0px' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
              <img style={{ borderRadius: '3px', border: 'solid', borderWidth: '1px' }} alt="sample" src="avatar.gif" width="100" height="100"/>
            </div>
            <div style={{ marginBottom: 10 }}>
              <h4 style={{textAlign: 'center'}}>what is 100k ens cats?</h4>
            </div>
            <div style={{ marginBottom: 20, marginLeft: 5, lineHeight: '15px' }}>
              <p style={{ fontFamily: 'MajorMono', fontSize: `${fontsize}`, fontWeight: 800, textAlign: 'center' }}>100k ens cats (100kcat) is the first ens 100k subdomain collection where the subdomain nft is your membership to the club.</p>
            </div>
            <div style={{ marginBottom: 10 }}>
              <h4 style={{textAlign: 'center'}}>contract</h4>
            </div>
            <div style={{ marginBottom: 20, marginLeft: 5, lineHeight: '15px' }}>
              <p style={{ fontFamily: 'MajorMono', fontSize: `${fontsize}`, fontWeight: 800, textAlign: 'center' }}><a rel="noreferrer" target='_blank' href={`https://etherscan.io/address/0xd3E58Bf93A1ad3946bfD2D298b964d4eCe1A9E7E`} style={{ textDecoration: 'none' }}>0<span style={{ fontFamily: 'SFMono', fontSize: 12, fontWeight: 400 }}>x</span>d3e58...a9e7e</a></p>
            </div>
            <div style={{ marginBottom: 10 }}>
              <h4 style={{textAlign: 'center'}}>what is the purpose & vision of 100kcat?</h4>
            </div>
            <div style={{ marginBottom: 20, marginLeft: 5, lineHeight: '15px' }}>
              <p style={{ fontFamily: 'MajorMono', fontSize: `${fontsize}`, fontWeight: 800, textAlign: 'center' }}>100kcat&apos;s primary purpose is to provide the ens community with a light-weight, experimental ens subdomain project that has sufficient features for the holders to form a sub-dao within ens. upon reaching full functionality, 100kcat sub-dao will enable the holders to vote as a single delegate within ens dao. in addition to ens dao education & voting, 100kcat aims to explore experimental ens use cases - especially of ens subdomains, and potentially support the ens builders through 100kcat grants.
              </p>
            </div>
            <div style={{ marginBottom: 10 }}>
              <h4 style={{textAlign: 'center'}}>how will minting work?</h4>
            </div>
            <div style={{ marginBottom: 20, marginLeft: 5, lineHeight: '15px' }}>
              <p style={{ fontFamily: 'MajorMono', fontSize: `${fontsize}`, fontWeight: 800, textAlign: 'center' }}>a collection of 10,000 100k ens cats subdomain nfts (0-9999) with an array of name-bound features will be available to mint at a price of 0.01 eth each on sept 9, 2022 12:00 utc.
              </p>
            </div>
            <div style={{ marginBottom: 10 }}>
              <h4 style={{textAlign: 'center'}}>what are name-bound tokens?</h4>
            </div>
            <div style={{ marginBottom: 20, marginLeft: 5, lineHeight: '15px' }}>
              <p style={{ fontFamily: 'MajorMono', fontSize: `${fontsize}`, fontWeight: 800, textAlign: 'center' }}>100kcat drop will consist of an nft (including an avatar) + 100kcat.eth subdomain that are mutually name-bound. name-bound tokens are similar to soul-bound tokens in the sense that tokens are bound to ens names instead of wallets. the owner can freely sell/transfer the nft and the two subdomains will automatically be transferred with the nft to the new owner along with all the metadata (e.g. avatar, decentralised website).
              </p>
            </div>
            <div style={{ marginBottom: 10 }}>
              <h4 style={{textAlign: 'center'}}>what is 100kcat treasury?</h4>
            </div>
            <div style={{ marginBottom: 20, marginLeft: 5, lineHeight: '15px' }}>
              <p style={{ fontFamily: 'MajorMono', fontSize: `${fontsize}`, fontWeight: 800, textAlign: 'center' }}>100kcat treasury is the 3/4 multi-sig managed by the founders at the start of the project. in due time as project matures, the treasury will be migrated to the sub-dao governor contract. 50% of all proceeds from the mint will be transferred to the treasury and converted to $ens tokens to be delegated to 100kcat. the remaining 50% of all proceeds from the mint will be held as eth in the treasury for long term sustainability of 100kcat and ongoing development.
              </p>
            </div>
            <div style={{ marginBottom: 10 }}>
              <h4 style={{textAlign: 'center'}}>do the subdomains have their own websites?</h4>
            </div>
            <div style={{ marginBottom: 20, marginLeft: 5, lineHeight: '15px' }}>
              <p style={{ fontFamily: 'MajorMono', fontSize: `${fontsize}`, fontWeight: 800, textAlign: 'center' }}>yes, each 100kcat subdomain will have its own automatically generated decentralized website.
              </p>
            </div>
            <div style={{ marginBottom: 10 }}>
              <h4 style={{textAlign: 'center'}}>what is $<img className="largeicon" alt="icon" src="ape.png"/>?</h4>
            </div>
            <div style={{ marginBottom: 20, marginLeft: 5, lineHeight: '15px' }}>
              <p style={{ fontFamily: 'MajorMono', fontSize: `${fontsize}`, fontWeight: 800, textAlign: 'center' }}>100kcat is experimenting with the use cases of fractionalizing ens domain ownership to create community tokens. <img className="icon" alt="icon" src="ape.png"/>coin.eth has been fractionalized into 1 billion $<img className="icon" alt="icon" src="ape.png"/> tokens and $<img className="icon" alt="icon" src="ape.png"/> tokens collectively own <img className="icon" alt="icon" src="ape.png"/>coin.eth. <img className="icon" alt="icon" src="ape.png"/>coin.eth can be purchased by anyone & will start with a purchase price of 10,000 eth. holders of $<img className="icon" alt="icon" src="ape.png"/> tokens will have a right to vote on the purchase price of <img className="icon" alt="icon" src="ape.png"/>coin.eth. upon conclusion of 100kcat 100k subdomain mints, 50% of $<img className="icon" alt="icon" src="ape.png"/> will be airdropped to the 100kcat subdomain owners through a &apos;claim process&apos; (similar to the $ens token airdrop) and 50% of $<img className="icon" alt="icon" src="ape.png"/> will go to the 100kcat treasury. 100kcat subdomain holders may vote to use the treasury as a source of grants for builders from the ens community. if <img className="icon" alt="icon" src="ape.png"/>coin.eth is bought out, then $<img className="icon" alt="icon" src="ape.png"/> will become pegged to the purchase price and $<img className="icon" alt="icon" src="ape.png"/> holders will be able to swap $<img className="icon" alt="icon" src="ape.png"/> for the proportional share of eth from the <img className="icon" alt="icon" src="ape.png"/>coin.eth buyout.
              </p>
            </div>
            <div style={{ marginBottom: 10 }}>
              <h4 style={{textAlign: 'center'}}><img className="largeicon" alt="icon" src="ape.png"/>🧪<img className="largeicon" alt="icon" src="322.svg"/></h4>
            </div>
            <div style={{ marginBottom: 20, marginLeft: 5, lineHeight: '15px' }}>
              <p style={{ fontFamily: 'MajorMono', fontSize: `${fontsize}`, fontWeight: 800, textAlign: 'center' }}>pssss... upon 100kcat 100k subdomain mints, the founding team might have an additional surprise 🧪. you didn&apos;t hear it from us.
              </p>
            </div>
            <br></br>
          </div>
        </StyledModalBody>
      </StyledModal>
    </StyledModalOverlay>
  ) : null;

  if (browser) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById("modal")
    );
  } else {
    return null;
  }
};

const StyledModalBody = styled.div`
  padding-top: 10px;
  padding-left: 20px;
  padding-right: 40px;
  padding-bottom: 20px;
  display: flex;
  justify-content: center;
  height: 500px;
  overflow-y: auto;
`;

const StyledModalTitle = styled.div`
  padding-top: 20px;
  font-size: 22px;
  display: flex;
  justify-content: center;
  font-weight: 800;
  margin-bottom: 20px;
`;

const StyledModalHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  font-size: 20px;
`;

const StyledModal = styled.div`
  background: linear-gradient(144deg, rgba(224,145,145,1) 0%, rgba(223,223,223,1) 100%);
  width: 500px;
  height: 600px;
  border-radius: 6px;
  padding: 15px;
  overflow-y: initial !important
  padding-bottom: 20px;
`;

const StyledModalOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.75);
`;

export default Faq;
