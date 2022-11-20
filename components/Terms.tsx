import React from "react";
import ReactDOM from 'react-dom';
import styled from 'styled-components';

const Terms = ({ show, onClose }) => {
  const title = 'terms of use';
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
          <div style={{ marginTop: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
              <img style={{ borderRadius: '3px', border: 'solid', borderWidth: '0.5px' }} alt="sample" src="avatar.gif" width="50" height="50"/>
            </div>
            <div style={{ marginBottom: 30, marginLeft: 5, lineHeight: '15px' }}>
              <p style={{ fontFamily: 'MajorMono', fontSize: 11, fontWeight: 800, textAlign: 'center' }}>100kcat.eth is a collection of ens subdomains and digital artworks (collectively hereinafter &apos;subdomain/nft&apos;) running on the ethereum network. this website is only an interface allowing participants to purchase 100kcat.eth subdomains/nfts. users are entirely responsible for the safety and management of their own private ethereum wallets and validating all transactions and contracts generated by this website before approval. furthermore, as the 100kcat.eth smart contract runs on the ethereum network, there is no ability to undo, reverse, or restore any transactions. this website and its connected services are provided &apos;as is&apos; and &apos;as available&apos; without warranty of any kind. by using this website you are accepting sole responsibility for any and all transactions involving 100kcat.eth and any associated subdomain/nft.</p>
            </div>
            <div style={{ marginBottom: 10 }}>
              <h4 style={{textAlign: 'center'}}>ownership</h4>
            </div>
            <div style={{ marginBottom: 30, marginLeft: 5, lineHeight: '15px' }}>
              <p style={{ fontFamily: 'MajorMono', fontSize: 11, fontWeight: 800, textAlign: 'center' }}>a. you own the subdomain and nft: each subdomain and nft is on the ethereum blockchain. when you purchase a subdomain/nft, ownership of the subdomain/nft is mediated entirely by the smart contract(s) and the ethereum network: at no point may we seize, freeze, or otherwise modify the ownership of any subdomain/nft.
              <br></br>
              <br></br>
              b. personal use: subject to your continued compliance with these terms, 100kcat.eth grants you a worldwide, royalty-free license to use, copy, and display the purchased subdomain & nft(s), along with any extensions that you choose to create or use, solely for the following purposes: (i) for your own personal, non-commercial use; (ii) as part of a marketplace that permits the purchase and sale of your subdomain/nft, provided that the marketplace cryptographically verifies each owner’s rights to display the subdomain/nft to ensure that only the actual owner can display the subdomain/nft; or (iii) as part of a third party website or application that permits the inclusion, involvement, or participation of your subdomain/nft, provided that the website/application cryptographically verifies each subdomain/nft  owner’s rights to display the subdomain/nft to ensure that only the actual owner can display the subdomain/nft, and provided that the subdomain/nft is no longer visible once the owner of the subdomain/nft leaves the website/application.
              <br></br>
              <br></br>
              c. ethereum name service:  you understand and agree for the underlying 100kcat.eth ens name must remain registered for the owner to maintain ownership of the underlying subdomain(s), and if the 100kcat.eth or any other subdomain name bound to the owner’s 100kcat.eth subdomain/nft, then ownership of said subdomain shall mediated entirely by the applicable ens smart contract(s) and potentially lost to the owner.
              <br></br>
              <br></br>
              d. 100k ens cats/100kcat.eth ip:  other than the rights to the art, nothing herein gives you any rights to any other trademarks or other intellectual property rights belonging to 100kcat.eth including, without limitation, to 100k ens cats, 100kcat and the associated logos. all of these rights are expressly reserved.
              <br></br>
              <br></br>
              e. feedback: you may choose to submit comments, bug reports, ideas or other feedback about the site, including without limitation about how to improve the site (collectively, &apos;feedback&apos;). by submitting any feedback, you agree that we are free to use such feedback in any way we choose without additional compensation to you and you hereby grant us a perpetual, irrevocable, nonexclusive, worldwide license to incorporate and use the feedback for any purpose.
              </p>
            </div>
            <div style={{ marginBottom: 10 }}>
              <h4 style={{textAlign: 'center'}}>your obligations</h4>
            </div>
            <div style={{ marginBottom: 30, marginLeft: 5, lineHeight: '15px' }}>
              <p style={{ fontFamily: 'MajorMono', fontSize: 11, fontWeight: 800, textAlign: 'center' }}>you are solely responsible for your own conduct while accessing or using the site, and for any consequences thereof. you agree to use the site only for purposes that are legal, proper and in accordance with these terms and any applicable laws or regulations. by way of example, and not as a limitation, you may not, and may not allow any third party to:
              <br></br>
              <br></br>
              (i) send, upload, distribute or disseminate any unlawful, defamatory, harassing, abusive, fraudulent, hateful, violent, obscene, or otherwise objectionable content;
              <br></br>
              <br></br>
              (ii) distribute viruses, worms, defects, trojan horses, corrupted files, hoaxes, or any other items of a destructive or deceptive nature;
              <br></br>
              <br></br>
              (iii) impersonate another person;
              <br></br>
              <br></br>
              (iv) upload, post, transmit or otherwise make available through the site any content that infringes the intellectual property or proprietary rights of any party or otherwise violates the legal rights of others;
              <br></br>
              <br></br>
              (v) engage in, promote, or encourage illegal activity (including, without limitation, money laundering);
              <br></br>
              <br></br>
              (vi) interfere with other users&apos; use of the site;
              <br></br>
              <br></br>
              (vii) use the site for any unauthorized commercial purpose;
              <br></br>
              <br></br>
              (viii) modify, adapt, translate, or reverse engineer any portion of the site;
              <br></br>
              <br></br>
              (ix) remove any copyright, trademark or other proprietary rights notices contained in or on the site or any part of it;
              <br></br>
              <br></br>
              (x) use any technology to collect information about the site’s for any unauthorized purpose;
              <br></br>
              <br></br>
              (xi) access or use the site for the purpose of creating a product or service that is competitive with any of our products or services. if you engage in any of the activities prohibited by this section, we may, at our sole and absolute discretion, without notice to you, and without limiting any of our other rights or remedies at law or in equity, immediately suspend or terminate your user account.
              </p>
            </div>
            <div style={{ marginBottom: 10 }}>
              <h4 style={{textAlign: 'center'}}>fees & payment</h4>
            </div>
            <div style={{ marginBottom: 30, marginLeft: 5, lineHeight: '15px' }}>
              <p style={{ fontFamily: 'MajorMono', fontSize: 11, fontWeight: 800, textAlign: 'center' }}>a. if you elect to purchase a subdomain/nft through the site, any financial transactions that you engage in will be conducted solely through the ethereum network. we will have no control over these payments or transactions, nor do we have the ability to reverse any transactions. we will have no liability to you or to any third party for any claims or damages that may arise as a result of any transactions that you engage or any other transactions that you conduct via the ethereum network.
              <br></br>
              <br></br>
              b. ethereum requires the payment of a transaction fee (a &apos;gas fee&apos;) for every transaction that occurs on the ethereum network. the gas fee funds the network of computers that run the decentralized ethereum network. this means that you will need to pay a gas fee for each transaction.
              </p>
            </div>
            <div style={{ marginBottom: 10 }}>
              <h4 style={{textAlign: 'center'}}>disclaimers</h4>
            </div>
            <div style={{ marginBottom: 30, marginLeft: 5, lineHeight: '15px' }}>
              <p style={{ fontFamily: 'MajorMono', fontSize: 11, fontWeight: 800, textAlign: 'center' }}>a. you expressly understand and agree that your access to and use of the site is at your sole risk, and that the site is provided &apos;as is&apos; and &apos;as available&apos; without warranties of any kind, whether express or implied. to the fullest extent permissible pursuant to applicable law, we make no express warranties and hereby disclaim all implied warranties regarding the site and any part of it (including, without limitation, the site, any smart contract, or any external websites), including the implied warranties of merchantability, fitness for a particular purpose, non-infringement, correctness, accuracy, or reliability. without limiting the generality of the foregoing, we, our subsidiaries, affiliates, and licensors do not represent or warrant to you that: (i) your access to or use of the site will meet your requirements, (ii) your access to or use of the site will be uninterrupted, timely, secure or free from error, (iii) usage data provided through the site will be accurate, (iii) the site or any content, services, or features made available on or through the site are free of viruses or other harmful components, or (iv) that any data that you disclose when you use the site will be secure. some jurisdictions do not allow the exclusion of implied warranties in contracts with consumers, so some or all of the above exclusions may not apply to you.
              <br></br>
              <br></br>
              b. you accept the inherent security risks of providing information and dealing online over the internet, and agree that we have no liability or responsibility for any breach of security unless it is due to our willfull misconduct.
              <br></br>
              <br></br>
              c. we will not be responsible or liable to you for any losses you incur as the result of your use of the ethereum network nor do we have no control over and make no guarantees regarding any smart contracts.
              </p>
            </div>
            <div style={{ marginBottom: 10 }}>
              <h4 style={{textAlign: 'center'}}>limitation of liability</h4>
            </div>
            <div style={{ marginBottom: 30, marginLeft: 5, lineHeight: '15px' }}>
              <p style={{ fontFamily: 'MajorMono', fontSize: 11, fontWeight: 800, textAlign: 'center' }}>a. you understand and agree that we will not be liable to you or to any third party for any indirect, incidental, special, consequential, or exemplary damages which you may incur, howsoever caused and under any theory of liability, including, without limitation, any loss of profits (whether incurred directly or indirectly), loss of goodwill or business reputation, loss of data, cost of procurement of substitute goods or services, or any other intangible loss, even if we have been advised of the possibility of such damages.
              <br></br>
              <br></br>
              b. you agree that our total, aggregate liability to you for any and all claims arising out of or relating to these terms or your access to or use of (or your inability to access or use) any portion of the site, whether in contract, tort, strict liability, or any other legal theory, is limited to the greater of (a) the amounts you actually paid us under these terms in the 12 month period preceding the date the claim arose, or (b) $500.
              <br></br>
              <br></br>
              c. you acknowledge and agree that we have made the site available to you and entered into these terms in reliance upon the warranty disclaimers and limitations of liability set forth herein. we would not be able to provide the site to you without these limitations.
              </p>
            </div>
            <div style={{ marginBottom: 10 }}>
              <h4 style={{textAlign: 'center'}}>risk assumption</h4>
            </div>
            <div style={{ marginBottom: 30, marginLeft: 5, lineHeight: '15px' }}>
              <p style={{ fontFamily: 'MajorMono', fontSize: 11, fontWeight: 800, textAlign: 'center' }}>you accept and acknowledge each of the following:
              <br></br>
              <br></br>
              a. to the extent that you sell your subdomain/nft, please be aware that the prices of nfts are extremely volatile and fluctuations may impact the price of your subdomain/nft both positively and negatively. given the volatility, 100kcat.eth subdomains/nfts should not be considered an investment. you assume all risks in that connection.
              <br></br>
              <br></br>
              b. ownership of a 100kcat.eth subdomain/nft ownership of digital collectibles only. accordingly, no information on this site (or any other documents mentioned therein) is or may be considered to be advice or an invitation to enter into an agreement for any investment purpose. further, nothing on this site qualifies or is intended to be an offering of securities in any jurisdiction nor does it constitute an offer or an invitation to purchase shares, securities or other financial products.  due to the artistic nature of subdomains and the project, 100kcat.eth has not been registered with or approved by any regulator in any jurisdiction. it remains your sole responsibility to assure that the purchase of the subdomain/nft is in compliance with laws and regulations in your jurisdiction.
              <br></br>
              <br></br>
              c. you assume all risks associated with using an internet-based currency, including, but not limited to, the risk of hardware, software and internet connections, the risk of malicious software introduction, and the risk that third parties may obtain unauthorized access to information stored within your wallet.
              <br></br>
              <br></br>
              d. ens domains, nfts, cryptocurrencies and blockchain technology are relatively new and the regulatory landscape is unsettled.  new regulations could negatively impact such technologies impacting the value for your 100kcat.eth subdomain/nft. you understand and accept all risk in that regard.
              <br></br>
              <br></br>
              e. you assume all responsibility for any adverse effects of disruptions or other issues impacting ethereum or the ethereum platform.
              </p>
            </div>
            <div style={{ marginBottom: 10 }}>
              <h4 style={{textAlign: 'center'}}>indemnification</h4>
            </div>
            <div style={{ marginBottom: 30, marginLeft: 5, lineHeight: '15px' }}>
              <p style={{ fontFamily: 'MajorMono', fontSize: 11, fontWeight: 800, textAlign: 'center' }}>you agree to hold harmless and indemnify 100kcat.eth and its developers, artists, multi-sigs, wallets, subsidiaries, affiliates, officers, agents, employees, advertisers, licensors, suppliers or partners from and against any claim, liability, loss, damage (actual and consequential) of any kind or nature, suit, judgment, litigation cost, and reasonable attorneys&apos; fees arising out of or in any way related to (i) your breach of these terms, (ii) your misuse of the site, or (iii) your violation of applicable laws, rules or regulations in connection with your access to or use of the site.
              </p>
            </div>
            <div style={{ marginBottom: 10 }}>
              <h4 style={{textAlign: 'center'}}>changes to the terms and conditions</h4>
            </div>
            <div style={{ marginBottom: 30, marginLeft: 5, lineHeight: '15px' }}>
              <p style={{ fontFamily: 'MajorMono', fontSize: 11, fontWeight: 800, textAlign: 'center' }}>we may make changes to the terms at our discretion. please check these terms periodically for changes. any changes to the terms will apply on the date that they are made, and your continued access to or use after the terms have been updated will constitute your binding acceptance of the updates. if you do not agree to any revised terms, you may not access or use the site.
              </p>
            </div>
            <div style={{ marginBottom: 10 }}>
              <h4 style={{textAlign: 'center'}}>children</h4>
            </div>
            <div style={{ marginBottom: 30, marginLeft: 5, lineHeight: '15px' }}>
              <p style={{ fontFamily: 'MajorMono', fontSize: 11, fontWeight: 800, textAlign: 'center' }}>our site is not intended for children.  you must be at least 18 years old to access this site or purchase a 100kcat.eth subdomain/ngy. if you are under 18 years old you are not permitted to use this site for any reason. by accessing the site, you represent and warrant that you are at least 18 years of age.
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
  background-size: contain;
`;

export default Terms;
