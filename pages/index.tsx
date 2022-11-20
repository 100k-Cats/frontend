import React from 'react';
import { useCallback } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import { Alchemy, Network } from "alchemy-sdk";
import {
  useConnect,
  useAccount,
  useFeeData,
  useContractRead,
  useContractWrite,
  useWaitForTransaction
} from 'wagmi';
import contractInterface from '../contract-abi.json';
import { ethers } from 'ethers';
import { isMobile } from 'react-device-detect';
import Modal from '../components/Modal';
import Terms from '../components/Terms';
import Preview from '../components/Preview';
import Faq from '../components/Faq';
import { Statistic } from 'antd';
const { Countdown } = Statistic;

const contractConfig = {
  addressOrName: '0xD13eCfFE6C2b28ABfa1587496b4FEcc87BFB932C',
  contractInterface: contractInterface,
};

const ensRegistrar = "0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85";

const alchemyConfig = {
  apiKey: process.env.NEXT_PUBLIC_ALCHEMY_ID,
  network: Network.ETH_GOERLI,
};
const alchemy = new Alchemy(alchemyConfig);

const Home: NextPage = () => {
  const { data: accountData } = useAccount();
  const { connectors, isConnected } = useConnect();
  const [totalMinted, setTotalMinted] = React.useState(0);
  const [batchSize, setBatchSize] = React.useState(0);
  const [hashCount, setHashCount] = React.useState(0);
  const [hash, setHash] = React.useState('');
  const [count, setCount] = React.useState(0);
  const [isPinning, setPinning] = React.useState(false);
  const { data: gasData, isError, isLoading } = useFeeData();
  const [termsModal, setTermsModal] = React.useState(false);
  const [faqModal, setFaqModal] = React.useState(false);
  const [previewModal, setPreviewModal] = React.useState(false);
  const [startMint, setStartMint] = React.useState(true);
  const [wallet, setWallet] = React.useState('');
  const [digits, setDigits] = React.useState<string[]>([]);
  const [subs, setSubs] = React.useState<string[]>([]);
  const [mintDigits, setMintDigits] = React.useState<string[]>([]);
  const [empty, setEmpty] = React.useState(false);
  const [check, setCheck] = React.useState(false);
  const [show, setShow] = React.useState('0');
  const [tokenID, setTokenID] = React.useState('');
  const [traits, setTraits] = React.useState<any[]>([]);
  const [meta, setMeta] = React.useState<any[]>([]);

  // gas estimates
  const gasEstimate = 185000;
  let gasFee = 0;
  if (gasData != undefined && gasData.formatted.maxFeePerGas != undefined && gasData.formatted.maxFeePerGas != null) {
    gasFee = parseInt(gasData.formatted.maxFeePerGas);
  }

  // device-type settings
  let widthPage = '100%'; let widthContainer = '100%';
  let edgeMargin = 20; let screen = 'desktop'; let fontSizeFAQ = '12px';
  if (isMobile) {
    widthPage = '400px'; widthContainer = '90%'; screen = 'mobile';
    edgeMargin = 0; fontSizeFAQ = '11px';
  }

  const logToken = useCallback(async () => {
    const nfts = await alchemy.nft.getNftsForOwner(wallet);
    const allTokens = nfts.ownedNfts;
    var allENS : string[] = [];
    var allSub : string[] = [];
    for (var i = 0; i < allTokens.length; i++) {
      if (allTokens[i].contract.address === ensRegistrar
        && /^\d+$/.test(allTokens[i].title.split('.')[0])
        && allTokens[i].title.split('.eth')[0].length === 5) {
          fetch(`https://ipfs.io/ipfs/${process.env.NEXT_PUBLIC_IPFS_JSON}/${allTokens[i].title.split('.eth')[0]}.json`)
            .then(function(response) {
              if (response.ok) {
                return response.json();
              } else {
                return { attributes: []};
              }
            })
            .then(function(json) {
              if (json) {
                allENS.push(allTokens[i].title.split('.eth')[0]);
                let attr = traits;
                if (attr.filter(item => item.name === allTokens[i].title.split('.eth')[0]).length === 0) {
                  attr.push({ name: allTokens[i].title.split('.eth')[0], traits: json.attributes});
                  setTraits(attr);
                }
              }
            });
      } else if (allTokens[i].contract.address === contractConfig.addressOrName.toLowerCase()) {
          fetch(allTokens[i].tokenUri!.gateway)
            .then(function(response) {
              if (response.ok) {
                return response.json();
              } else {
                setCheck(false);
              }
            })
            .then(function(json) {
              if ( json && json?.metadataError !== 'IPFS gateway timed out' ) {
                if ( /^\d+$/.test(json.name.split('.')[0] )
                  && json.name.split('.')[1] === '100kCat'
                  && json.name.split('.')[0].length === 5) {
                    allSub.push(json.name.split('.')[0]);
                }
                setCheck(true);
              }
            });
       }
    }
    setSubs(allSub);
    if (allENS.length == 0) {
      setEmpty(true);
      setCheck(true);
    }
    setDigits(allENS);
  }, [wallet, traits]);

  React.useEffect(() => {
    if (traits) {
      let ens = traits.filter(item => item.name === show);
      setMeta(ens[0]?.traits);
    }
  }, [show, traits]);

  const findToken = useCallback(async () => {
    if (wallet) {
      try {
        setCheck(false);
        await logToken();
      } catch (error) {
        console.log(error);
      }
    }
  }, [wallet, logToken]);

  const { data: totalSupply } = useContractRead(
    contractConfig,
    'totalSupply',
    { watch: false }
  );

  const bigBatch = [5, 3, 3];
  const { data: phase } = useContractRead(
    contractConfig,
    'phase',
    { watch: false }
  );

  const { data: namehash2ID } = useContractRead(
    contractConfig,
    'Namehash2ID',
    {
      args: ethers.utils.keccak256(ethers.utils.defaultAbiCoder.encode([ "string", "string", "string" ], [ "eth", "100kcat", show ]))
    }
  )

  React.useEffect(() => {
    if (totalSupply) {
      setTotalMinted(totalSupply.toNumber());
    }
  }, [totalSupply]);

  React.useEffect(() => {
    if (accountData) {
      setDigits([]); setMintDigits([]); setBatchSize(0);
      setWallet(accountData.address ? accountData.address : '');
    } else {
      setDigits([]); setMintDigits([]);
    }
  }, [accountData]);

  React.useEffect(() => {
    findToken();
  }, [wallet, isConnected, findToken]);

  React.useEffect(() => {
    setTokenID(namehash2ID);
  }, [show]);

  const startOn = 'November 4, 2022 12:00:00 UTC'
  const deadline = new Date(startOn).getTime();

  React.useEffect(() => {
    setStartMint(Date.now() > deadline);
  }, [deadline]);

  var value = 0;
  if (batchSize == 1) {
    value = 0.001;
  } else if (batchSize > 1) {
    value = batchSize * 0.001;
  } else {
    value = 0;
  }

  const {
    data: mintData,
    write: mint,
    isLoading: isMintLoading,
    isSuccess: isMintStarted,
  } = useContractWrite(
    contractConfig,
    'mint',
    {
      args: mintDigits[0],
      overrides: {
        value: ethers.utils.parseEther(value.toString())
      }
    }
  );

  const {
    data: batchMintData,
    write: batchMint,
    isLoading: isBatchMintLoading,
    isSuccess: isBatchMintStarted,
  } = useContractWrite(
    contractConfig,
    'batchMint',
    {
      args: [mintDigits],
      overrides: {
        value: ethers.utils.parseEther(value.toString())
      }
    }
  );

  const { isSuccess: txSuccess } = useWaitForTransaction({
    hash: mintData?.hash,
  });
  const { isSuccess: txBatchSuccess } = useWaitForTransaction({
    hash: batchMintData?.hash,
  });

  const isMinted = txSuccess;
  const isBatchMinted = txBatchSuccess;

  const pinToMint = async () => {
      const jsonFiles: string[] = [];
      const htmlFiles: string[] = [];
      setPinning(true);
      setHashCount(batchSize);
    }

  var array = mintDigits;
  const handleChange = (e) => {
    let isChecked = e.target.checked;
    let index = array.indexOf(e.target.id);
    if (isChecked && !isMinted && !isBatchMinted) {
      array.push(e.target.id);
      if (array.length > bigBatch[Number(phase) - 1]) {
        array.splice(index, 1);
        const ele = document.getElementById(e.target.id) as HTMLInputElement;
        ele!.checked = false;
        window.alert(`Maximum ${bigBatch[Number(phase) - 1]} per transaction allowed ❗❗❗`);
      }
    } else {
      if (index > -1 && !isMinted && !isBatchMinted) {
        array.splice(index, 1);
      }
    }
    setMintDigits(array);
    setBatchSize(mintDigits.length);
    setHashCount(0);
    setPinning(false);
  };

  const modalItem = [
    'phase <span style="color: white">1</span> starts <span style="color: white; font-size: 25px;">december 15 2022 12:00 utc</span>',
    'if you are a <span style="color: white">5-digit ens holder</span>, please connect with your wallet to mint a cat',
    '<span style="color: white">only 5-digit holders</span> can claim their cat in <span style="color: white">phase 1</span>',
    'you must connect with the <span style="color: white">wallet that owns</span> the 5-digit ens',
    'if you own multiple 5-digit ens, then you can mint up to <span style="color: white">50</span> per transaction'
  ];

  return (
    <div className="page" style = {{ maxWidth: `${widthPage}` }}>
      <div style={{ display: 'none' }}>
        {screen}
      </div>
      <Head>
        <title>100k ENS Cats</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width, user-scalable=no" />
        <link rel="shortcut icon" href="logo.png" />
      </Head>
      {/* Container */}
      <div className="container" style = {{ maxWidth: `${widthContainer}` }} >
        {/* Detect Device */}
        {!isMobile && startMint && (
          <div style={{ marginLeft: `${edgeMargin}px`, marginBottom: '15px', marginTop: '15px' }}>
            <ConnectButton label="connect wallet" />
          </div>
        )}
        {isMobile && startMint && (
          <div style={{ alignItems: 'center', justifyContent: 'center', display: 'flex', marginBottom: '15px', marginTop: '15px' }}>
            <ConnectButton label="connect" />
          </div>
        )}
        <br></br>
        {/* Avatar */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
          <img className="avatar" alt="sample" src="avatar.gif" width="250" height="250"/>
        </div>
        <br></br>
        {/* Content */}
        <div style={{ flex: '1 1 auto' }}>
          <div style={{ marginTop: '5px' }}>
            <div style={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
              {!isMobile && (
                  <h1 style={{ fontSize: 50 }}>100k ENS Cats</h1>
              )}
              { isMobile && (
                  <h1 style={{ fontSize: 32 }}>100k ENS Cats</h1>
              )}
            </div>

            {/* Init */}
            {startMint && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
                  <p className="head" style={{ marginTop: '10px', marginBottom: '30px' }}>
                    minted <span style= {{ fontFamily: 'RobotoMono', color: 'white', fontWeight: '600' }}>{totalMinted}</span> so far<span style= {{ fontFamily: 'MajorMono', color: 'blue', fontWeight: '600' }}>{' '}</span>
                  </p>
                </div>
              </div>
            )}

            {startMint && !isConnected && (
              <div style={{ marginBottom: '-30px' }}>
                <div className="content-slider"><div className="slider">
                  <div className="mask">
                       <ul>
                         {modalItem.map((item, index) => (
                           <li className={`anim${index + 1}`} key={index}>
                             <div className="home-modal-item">
                               <div dangerouslySetInnerHTML={{ __html: item }} />
                             </div>
                           </li>
                         ))}
                       </ul>
                  </div>
                </div></div>
              </div>
            )}

            {isConnected && !check && digits.length === 0 && (
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button
                  className="button"
                  data-mint-started
                  >
                  {'searching ⌛'}
                </button>
              </div>
            )}

            {isConnected && check && empty && digits.length === 0 && (
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button
                  disabled
                  className="button"
                  data-mint-loading
                  >
                  {'no digits found ❗'}
                </button>
              </div>
            )}
            {/* Show ENS */}
            {isConnected && digits.length > 0 && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
                  <p style={{ marginTop: '5px' }}>
                    ↓ select ens to mint ↓
                  </p>
                </div>
                <br></br>
                <div style={{ height: 'auto', position: 'relative' }}>
                  <section className="form-wrapper" style={{ paddingTop: '30px', paddingBottom: '20px' }}>
                    {digits.filter(x => !subs.includes(x)).map((digit) => (
                      <div key={digit}>
                        <label className="ccontainer" key={digit}>
                          <span>{digit}</span>
                          .
                          <span style={{ fontSize: '16px', fontFamily: 'Bioliquid' }}>ETH</span>
                          <input
                            type="checkbox"
                            id={digit}
                            key={digit}
                            onChange={(event) => {handleChange(event)}}
                            disabled={isMinted || isBatchMinted}
                          />
                          <span className="checkmark"></span>
                          <button
                            data-title="click to view"
                            className="small"
                            onClick={() => {window.scrollTo(0,0); setShow(digit); setPreviewModal(true)}}
                            style={{ marginRight: 0 }}
                            >
                            {'🔍'}
                          </button>
                          <Preview
                            onClose={() => setPreviewModal(false)}
                            show={previewModal && show}
                            title={show}
                            json={meta}
                            minted={"false"}
                            png={`https://ipfs.io/ipfs/${process.env.NEXT_PUBLIC_IPFS_PNG}/${show}.png`}
                          >{show}
                          </Preview>
                        </label>
                      </div>
                    ))}
                    {digits.filter(x => subs.includes(x)).map((digit) => (
                      <div key={digit}>
                        <label className="ccontainer" key={digit} style={{ color: 'rgba(255,255,255,0.7)' }}>
                          <span style={{ textDecoration: 'line-through' }}>{digit}</span>
                          .
                          <span style={{ textDecoration: 'none', fontSize: '16px', fontFamily: 'Bioliquid' }}>ETH</span>
                          <input
                            type="checkbox"
                            id={digit}
                            key={digit}
                            disabled
                          />
                          <span className="xheckmark"></span>
                          <button
                            data-title="click to view"
                            className="small"
                            onClick={() => {window.scrollTo(0,0); setShow(digit); setPreviewModal(true)}}
                            style={{ marginRight: 0 }}
                            >
                            {'✅'}
                          </button>
                          <Preview
                            onClose={() => setPreviewModal(false)}
                            show={previewModal && show}
                            title={show}
                            json={meta}
                            minted={`${contractConfig.addressOrName}/${tokenID}`}
                            png={`https://ipfs.io/ipfs/${process.env.NEXT_PUBLIC_IPFS_PNG}/${show}.png`}
                          >{show}
                          </Preview>
                        </label>
                      </div>
                    ))}
                  </section>
                </div>
              </div>
            )}
            {/* Countdown to Mint */}
            {!startMint && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
                  <p style={{ marginTop: '20px', marginBottom: '10px' }}>
                    mint starts
                  </p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
                  <span style= {{ fontFamily: 'SFMono', color: 'yellow' }}>{startOn}</span>
                </div>
                <br></br>
                <div style={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
                  <Countdown title="" value={deadline} format="D:H:mm:ss" style={{ marginTop: 20, marginBottom: -100, color:'orange', fontSize:30, fontFamily: 'RobotoMono' }}/>
                </div>
              </div>
            )}
            <br></br>

            {/* Gas Data */}
            {isConnected && value > 0 && gasData && (batchSize > 0 && batchSize <= bigBatch[Number(phase) - 1]) && !isError && !isLoading && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
                  <p
                    style={{ fontSize: 14 }}
                  >
                    net: <span style={{ color: 'yellow', fontFamily: 'SFMono' }}>{(value + gasFee * 0.000000001 * gasEstimate * batchSize * 0.000000001).toFixed(5)}</span> eth
                  </p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
                  <p
                    style={{ fontSize: 12 }}
                  >
                    to mint: <span style={{ color: 'yellow', fontFamily: 'SFMono' }}>{value}</span> eth
                  </p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
                  <p
                    style={{ fontSize: 12 }}
                  >
                    gas fee: <span style={{ color: 'yellow', fontFamily: 'SFMono' }}>{(gasFee * 0.000000001 * gasEstimate * batchSize * 0.000000001).toFixed(5)}</span> eth
                  </p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
                  <p
                    style={{ fontSize: 12 }}
                  >
                    current gas: <span style={{ color: 'yellow', fontFamily: 'SFMono' }}>{(gasFee * 0.000000001).toFixed(1)}</span> gwei
                  </p>
                </div>
              </div>
            )}
            <br></br>

            {/* Single Mint */}
            {isConnected && hashCount === 0 && !isMinted && batchSize == 1 && (
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button
                  disabled={isPinning}
                  className="button"
                  data-mint-loading={isPinning}
                  onClick={() => {
                    pinToMint();
                  }}
                >
                  {!isPinning && 'request 🎁'}
                  {isPinning && 'preparing ⌛'}
                </button>
              </div>
            )}

            {isConnected && hashCount === 1 && !isMinted && batchSize == 1 && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <button
                    disabled={isMintLoading || isMintStarted}
                    className="button"
                    data-mint-loading={isMintLoading}
                    data-mint-started={isMintStarted}
                    onClick={() => {
                      mint();
                    }}
                  >
                    {isMintLoading && 'waiting for approval ⌛'}
                    {isMintStarted && 'minting ⌛'}
                    {!isMintLoading && !isMintStarted && 'mint 🎁'}
                  </button>
                </div>
                {isPinning && (
                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                    <button
                      className="button"
                      onClick={() => window.location.reload()}
                      >
                      {'refresh'}
                    </button>
                  </div>
                )}
                {isPinning && !isMintLoading && !isMintStarted && (
                  <div style={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
                    <p
                      style={{ fontSize: 14, marginTop: 10 }}
                    >
                      ✅ ready to mint <span style={{ color: 'yellow', fontFamily: 'SFMono' }}>{hashCount}</span> subdomain
                    </p>
                  </div>
                )}
                {isPinning && isMintLoading && (
                  <div style={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
                    <p
                      style={{ fontSize: 14, marginTop: 10 }}
                    >
                      ⌛ waiting for approval in wallet
                    </p>
                  </div>
                )}
                {isPinning && isMintStarted && (
                  <div style={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
                    <p
                      style={{ fontSize: 14, marginTop: 10 }}
                    >
                      ⌛ minting subdomain
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Batch Mint */}
            {isConnected && hashCount === 0 && !isBatchMinted && bigBatch[Number(phase) - 1] >= batchSize && batchSize >= 2 && (
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button
                  disabled={isPinning}
                  className="button"
                  data-mint-loading={isPinning}
                  onClick={() => {
                    pinToMint();
                  }}
                >
                {!isPinning && `request 🎁`}
                {isPinning && `preparing ⌛`}
                </button>
              </div>
            )}

            {isConnected && hashCount === batchSize && !isBatchMinted && bigBatch[Number(phase) - 1] >= batchSize && batchSize >= 2 && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <button
                    disabled={isBatchMintLoading || isBatchMintStarted}
                    className="button"
                    data-mint-loading={isBatchMintLoading}
                    data-mint-started={isBatchMintStarted}
                    onClick={() => {
                      batchMint();
                    }}
                  >
                    {isBatchMintLoading && 'waiting for approval ⌛'}
                    {isBatchMintStarted && 'batch minting ⌛'}
                    {!isBatchMintLoading && !isBatchMintStarted && `mint 🎁`}
                  </button>
                </div>
                {isPinning && (
                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                    <button
                      className="button"
                      onClick={() => window.location.reload()}
                      >
                      {'refresh'}
                    </button>
                  </div>
                )}
                {isPinning && !isBatchMintLoading && !isBatchMintStarted && (
                  <div style={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
                    <p
                      style={{ fontSize: 14, marginTop: 10 }}
                    >
                      ✅ ready to mint <span style={{ color: 'yellow', fontFamily: 'SFMono' }}>{hashCount}</span> subdomains
                    </p>
                  </div>
                )}
                {isPinning && isBatchMintLoading && (
                  <div style={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
                    <p
                      style={{ fontSize: 14, marginTop: 10 }}
                    >
                      ⌛ waiting for approval in wallet
                    </p>
                  </div>
                )}
                {isPinning && isBatchMintStarted && (
                  <div style={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
                    <p
                      style={{ fontSize: 14, marginTop: 10 }}
                    >
                      ⌛ batch minting <span style={{ color: 'yellow', fontFamily: 'SFMono' }}>{hashCount}</span> subdomains
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Single Mint Result */}
          {isMinted && batchSize == 1 && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
                <p
                  style={{ fontSize: 14, marginTop: 10 }}
                >
                  ✅ minted subdomain: <span style={{ color: 'yellow', fontFamily: 'SFMono' }}><a rel="noreferrer" target='_blank' href={``} style={{ textDecoration: 'none' }}>{mintDigits[0]}</a></span> .100kcat.eth
                </p>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
                <p
                  style={{ fontSize: 14, marginTop: 10 }}
                >
                  OpenSea: <a rel="noreferrer" target='_blank' href={`https://testnets.opensea.io/assets/goerli/${mintData?.to}/${totalMinted - 1}`} style={{ fontFamily: 'SFMono' }}>Link</a>
                </p>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
                <p
                  style={{ fontSize: 14, marginTop: 10 }}
                >
                  EtherScan: <a rel="noreferrer" target='_blank' href={`https://goerli.etherscan.io/tx/${mintData?.hash}`} style={{ fontFamily: 'SFMono' }}>Link</a>
                </p>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
                <button
                  className="button"
                  style={{ marginTop: 20 }}
                  onClick={() => window.location.reload()}
                  >
                  {'mint again'}
                </button>
              </div>
            </div>
          )}

          {/* Batch Mint Result */}
          {isBatchMinted && bigBatch[Number(phase) - 1] >= batchSize && batchSize >= 2 && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
                <p
                  style={{ fontSize: 14, marginTop: 10 }}
                >
                  ✅ minted subdomains: <span style={{ color: 'yellow', fontFamily: 'SFMono' }}><a rel="noreferrer" target='_blank' href={``} style={{ textDecoration: 'none' }}>{mintDigits[0]}-{mintDigits[mintDigits.length - 1]}</a></span> .100kcat.eth
                </p>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
                <p
                  style={{ fontSize: 14, marginTop: 10 }}
                >
                  OpenSea: <a rel="noreferrer" target='_blank' href={`https://testnets.opensea.io/assets/goerli/${batchMintData?.to}/${totalMinted - 1}`} style={{ fontFamily: 'SFMono' }}>Link</a>
                </p>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
                <p
                  style={{ fontSize: 14, marginTop: 10 }}
                >
                  EtherScan: <a rel="noreferrer" target='_blank' href={`https://goerli.etherscan.io/tx/${batchMintData?.hash}`} style={{ fontFamily: 'SFMono' }}>Link</a>
                </p>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
                <button
                  className="button"
                  style={{ marginTop: 20 }}
                  onClick={() => window.location.reload()}
                  >
                  {'mint again'}
                </button>
              </div>
            </div>
          )}
          <br></br><br></br>
          {/* Footer */}
          <div style={{ marginTop: -10, marginBottom: 20, alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
            <button
              className={screen}
              onClick={() => {window.scrollTo(0,0); setTermsModal(true)}}
              style={{ marginRight: 10 }}
              >
              {'terms'}
            </button>
            <button
              className={screen}
              onClick={() => {window.scrollTo(0,0); setFaqModal(true)}}
              style={{ marginRight: 10 }}
              >
              {'faq'}
            </button>
            <button
              className={screen}
              onClick={() => window.open('https://twitter.com/100kENSCats')}
              style={{ marginRight: 10 }}
              >
              {'twitter'}
            </button>
          </div>

          {/* Modals */}
          <Terms
            onClose={() => setTermsModal(false)}
            show={termsModal}
          />
          <Faq
            onClose={() => setFaqModal(false)}
            show={faqModal}
            fontsize={fontSizeFAQ}
          />
          <div id="modal"></div>
        </div>
      </div>
    </div>
  );
};

export default Home;
