import React from "react";
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { CCarousel, CCarouselItem, CImage } from '@coreui/react';

const Preview = ({ show, onClose, title, json, minted, png, children }) => {
  const [browser, setBrowser] = React.useState(false);
  const [traits, setTraits] = React.useState<any[]>([]);

  React.useEffect(() => {
    setBrowser(true);
    setTraits(json);
  }, [json]);

  const handleCloseClick = (e) => {
    e.preventDefault();
    onClose();
  };

  let opensea = '';
  let looksrare = '';
  if (minted != 'false') {
    opensea = `https://testnets.opensea.io/assets/goerli/${minted}`;
    looksrare = `https://looksrare.org/collections/${minted}`;
  }

  const modalContent = show ? (
    <StyledModalOverlay>
      <StyledModal>
        <StyledModalHeader>
          <div>
            <a href="#" onClick={handleCloseClick} style={{ width: '100%', marginLeft: '94%' }} >
              x
            </a>
          </div>
        </StyledModalHeader>
        {title &&
          <StyledModalTitle>
            <span style={{ fontFamily: 'RobotoMono', fontSize: '26px', margin: '-7.75px 1px', fontWeight: '800', letterSpacing: '0.5px' }}>{title}</span>
            <span>.100kcat.eth</span>&nbsp;
          </StyledModalTitle>}
        <StyledModalBody>
          <div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <img
                  style={{
                    borderRadius: '3px',
                    border: 'solid 1px #fff',
                    borderWidth: '1px',
                    marginTop: '5px',
                    marginRight: '10px',
                    marginBottom: '20px',
                    background: "url('./loading.png') no-repeat center",
                    backgroundSize: '40%'
                  }}
                  alt="preview"
                  onError={({ currentTarget }) => {
                    setTraits([]);
                    currentTarget.onerror = null;
                    currentTarget.src = "322.svg";
                  }}
                  src={png}
                  width="150"
                  height="150"
                  placeholder="blur"
                  />
                <div style={{ paddingLeft: '15px', height: '150px', marginTop: '-5px' }}>
                  {traits && traits.map((trait, index) => (
                    <div key={index}>
                        {trait.trait_type && (
                          <p>
                          <span style={{ color: 'white', fontSize: '12px' }}>{trait.value}</span>
                          </p>
                        )}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                {traits && traits.map((trait, index) => (
                  <div key={index}>
                    {trait.trait_type && (
                      <p>
                        <span style={{ color: 'white', fontSize: '14px' }}>{trait.trait_type}: </span>
                        <span style={{ color: 'black', fontSize: '14px' }}>{trait.value}</span>
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div style={{ transform: 'rotate(90deg)', position: 'relative', display: 'flex', margin: '0 -100px 0 200px' }}>
              <span style={{ fontFamily: 'RobotoMono', fontSize: '38px', margin: '-3.75px 1px', fontWeight: '1200', letterSpacing: '0.5px', color: 'rgba(255, 255, 255, 0.3)' }}>{title}</span>
            </div>
          </div>
        </StyledModalBody>
        {minted != 'false' && (
          <div style={{ marginTop: '-107px', marginLeft: '-10x', marginBottom: '0px' }}>
            <a rel="noreferrer" target='_blank' href={opensea} data-title="opensea" style={{ background: 'none' }}>
              <img
                alt="opensea"
                src="opensea.png"
                width="27"
                height="27"
              />
            </a>
            <a rel="noreferrer" target='_blank' href={looksrare} data-title="looksrare" style={{ background: 'none', marginLeft: '-5px' }}>
              <img
                alt="looksrare"
                src="looksrare.png"
                width="27"
                height="27"
              />
            </a>
          </div>
        )}
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
  padding-top: 30px;
  padding-left: 0px;
  padding-right: 0px;
  padding-bottom: 0px;
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
  font-weight: 1200;
  margin-bottom: 0px;
  color: rgba(255, 255, 255, 0.7);
`;

const StyledModalHeader = styled.div`
  font-size: 20px;
`;

const StyledModal = styled.div`
  background: linear-gradient(45deg, rgba(238,119,82,1) 0%, rgba(231,60,126,1) 20%, rgba(35,166,213,1) 40%, rgba(35,213,171,1) 60%, rgba(213,213,35,1) 80%, rgba(60,255,44,1) 100%);
  animation: gradient 10s ease infinite;
  background-size: 400% 400%;
  width: 400px;
  height: 500px;
  border-radius: 6px;
  padding-top: 9px;
  padding-left: 0px;
  padding-right: 8px;
  padding-bottom: 0px;
  overflow-y: initial !important
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
  background-color: rgba(0, 0, 0, 0.15);
`;

export default Preview;
