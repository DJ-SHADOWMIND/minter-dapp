require('dotenv').config();
const basePath = process.cwd();
const fs = require("fs");
const { MODE } = require(`${basePath}/constants/blend_mode.js`);
const { NETWORK } = require(`${basePath}/constants/network.js`);

const network = NETWORK.eth;

// General metadata for Ethereum
const namePrefix = "Alien Grunts";
const description = "Now that DJ SHADOWMIND has revealed the 'Alien Agents' around the globe, two factions have emerged. The United Earth (UE) Faction, and The United Mars (UM) Faction. DJ SHADOWMIND has given you, Guardian, the power to control them with your mind. Group up with your team at https://djshadowmindnft.com (LFG!) Become a SUPER-FAN of DJ SHADOWMIND at https://djshadowmind.com";
const baseUri = "ipfs://NewUriToReplace"; // This will be replaced automatically

const layerConfigurations = [
{
    growEditionSizeTo: 10000,
    layersOrder: [
      { name: "Background" },
      { name: "Scene" },
      { name: "Capes" },
      { name: "Armor" },
      { name: "Pant Accessory" },
      { name: "Pant Decal" },
      { name: "Neck" },
      { name: "Arm Decal" },
      { name: "Torso Decal" },
      { name: "Head" },
      { name: "Mouth" },
      { name: "Face Options" },
      { name: "Eyes" },
      { name: "Face Extra" },
      { name: "Head Accessory" },
      { name: "Left Hand" },
      { name: "Extra Item" },
    ],
  },
];

const shuffleLayerConfigurations = true;

const debugLogs = false;

const format = {
  width: 2400,
  height: 2400,
  smoothing: false,
};

const extraMetadata = {
  external_url: "https://djshadowmindnft.com", // Replace with your website or remove this line if you do not have one.
};

// NFTPort Info

// ** REQUIRED **
const AUTH = process.env.NFTPORT_API_KEY; // Set this in the .env file to prevent exposing your API key when pushing to Github
const LIMIT = 2; // Your API key rate limit
const CHAIN = 'rinkeby'; // only rinkeby or polygon or ethereum

// REQUIRED CONTRACT DETAILS THAT CANNOT BE UPDATED LATER!
const CONTRACT_NAME = 'Alien Grunts';
const CONTRACT_SYMBOL = 'AG';
const METADATA_UPDATABLE = true; // set to false if you don't want to allow metadata updates after minting
const OWNER_ADDRESS = '0x8667b3350dedaE8Dd1fE602428Ac17BF65929535';
const TREASURY_ADDRESS = '0x8667b3350dedaE8Dd1fE602428Ac17BF65929535';
const MAX_SUPPLY = 10000; // The maximum number of NFTs that can be minted. CANNOT BE UPDATED!
const MINT_PRICE = 0.024; // Minting price per NFT. Rinkeby = ETH, Ethereum = ETH, Polygon = MATIC. CANNOT BE UPDATED!
const TOKENS_PER_MINT = 10; // maximum number of NFTs a user can mint in a single transaction. CANNOT BE UPDATED!

// REQUIRED CONTRACT DETAILS THAT CAN BE UPDATED LATER.
const PUBLIC_MINT_START_DATE = "2022-07-03T11:30:48+00:00"; // This is required. Eg: 2022-02-08T11:30:48+00:00

// OPTIONAL CONTRACT DETAILS THAT CAN BE UPDATED LATER.
const PRESALE_MINT_START_DATE = "2022-07-02T11:30:48+00:00"; // Optional. Eg: 2022-02-08T11:30:48+00:00
const ROYALTY_SHARE = 906; // Percentage of the token price that goes to the royalty address. 100 bps = 1%
const ROYALTY_ADDRESS = "0x8667b3350dedaE8Dd1fE602428Ac17BF65929535"; // Address that will receive the royalty
const BASE_URI = null; // only update if you want to manually set the base uri
const PREREVEAL_TOKEN_URI = null; // only update if you want to manually set the prereveal token uri
const PRESALE_WHITELISTED_ADDRESSES = ["0xBd4A7B92768df3888cD7fa3EdEED326dbf606373","0x8667b3350dedaE8Dd1fE602428Ac17BF65929535","0xA5c8f856962A13f2B9Ad497d988a0d92b0907A09","0x2Da4640CD97DfEeE1E21B6A538703aB3e7F49A68","0x8Dc83aC77fBd8A05A2Ef91578349955F5a707990","0xf977C6AaeA17b1fa15698ad13a0236349092149E","0x305A012916054C51407D3cd1e7C7321495078E4d","0xfE627D675Cc3DbaBA38CaBb6fE9fB2A34b8206a9","0x6178048B2E0bE0597b9A3A1A6a26e2d0FDEF04eb","0x0Efa51c337e752Df2c0f67b904CF2023ed8b1713","0x8E2ECB9098bB8784371452933F198aF59Cc26E35","0x7D3dc2547f507Df0cfe704e6D17E6A8541e6f36d","0x1E489fE531DEf2d4437E9C7E5076F9c0f1eDFbb5","0x82d0Ca2EDf47355Fd1A3E65B59105ce70C192B21","0x1eCb4D455aa1562E3F1c1ba8F9e38a3859032961","0xAEBE07dB22EF3E812f435b671eaC99F101aCE850","0xE0036fb4B5A3B232aCfC01fEc3bD1D787a93da75","0xA6D3a33a1C66083859765b9D6E407D095a908193","0x7A77D5AC60E0d105dB2524b93a3a578bA06BE4BF"]; // only update if you want to manually set the whitelisted addresses

// ** OPTIONAL **
let CONTRACT_ADDRESS = "YOUR CONTRACT ADDRESS"; // If you want to manually include it

// Generic Metadata is optional if you want to reveal your NFTs
const GENERIC = true; // Set to true if you want to upload generic metas and reveal the real NFTs in the future
const GENERIC_TITLE = CONTRACT_NAME; // Replace with what you want the generic titles to say if you want it to be different from the contract name.
const GENERIC_DESCRIPTION = "Congratulations, Guardian, on your super sleuthing prowess. You've helped DJ SHADOWMIND uncover the 'Alien Agents' from 'Alien America 2022'. Now, let's mind control their 'Alien Grunts.' Help DJ SHADOWMIND open a wormhole to the City of Secrets in the Alien Dimension and grab an 'Alien Grunt' with all of its gear. Then prepare for your adventures ahead! Looking for Group (LFG) at https://djshadowmindnft.com and become a SUPER-FAN of DJ SHADOWMIND at https://djshadowmind.com. Good luck, Guardian!"; // Replace with what you want the generic descriptions to say.
const GENERIC_IMAGE = "https://ipfs.io/ipfs/bafybeid6dogqpax36kebp4gt2qol72vlszmxooj4m25ynwujuppsodfmjm"; // Replace with your generic image that will display for all NFTs pre-reveal.

// Automatically set contract address if deployed using the deployContract.js script
try {
  const rawContractData = fs.readFileSync(
    `${basePath}/build/contract/_contract.json`
  );
  const contractData = JSON.parse(rawContractData);
  if (contractData.response === "OK") {
    CONTRACT_ADDRESS = contractData.contract_address;
  }
} catch (error) {
  // Do nothing, falling back to manual contract address
}
// END NFTPort Info

const solanaMetadata = {
  symbol: "AG",
  seller_fee_basis_points: 906, // Define how much % you want from secondary market sales 1000 = 10%
  external_url: "https://djshadowmindnft.com",
  creators: [
    {
      address: "0x8667b3350dedaE8Dd1fE602428Ac17BF65929535",
      share: 100,
    },
  ],
};

const gif = {
  export: false,
  repeat: 0,
  quality: 100,
  delay: 500,
};

const text = {
  only: false,
  color: "#ffffff",
  size: 20,
  xGap: 40,
  yGap: 40,
  align: "left",
  baseline: "top",
  weight: "regular",
  family: "Courier",
  spacer: " => ",
};

const pixelFormat = {
  ratio: 2 / 128,
};

const background = {
  generate: true,
  brightness: "80%",
  static: false,
  default: "#000000",
};

const rarityDelimiter = "#";

const uniqueDnaTorrance = 10000;

const preview = {
  thumbPerRow: 5,
  thumbWidth: 50,
  imageRatio: format.height / format.width,
  imageName: "preview.png",
};

const preview_gif = {
  numberOfImages: 5,
  order: "ASC", // ASC, DESC, MIXED
  repeat: 0,
  quality: 100,
  delay: 500,
  imageName: "preview.gif",
};

module.exports = {
  format,
  baseUri,
  description,
  background,
  uniqueDnaTorrance,
  layerConfigurations,
  rarityDelimiter,
  preview,
  shuffleLayerConfigurations,
  debugLogs,
  extraMetadata,
  pixelFormat,
  text,
  namePrefix,
  network,
  solanaMetadata,
  gif,
  preview_gif,
  AUTH,
  LIMIT,
  CONTRACT_ADDRESS,
  OWNER_ADDRESS,
  TREASURY_ADDRESS,
  CHAIN,
  GENERIC,
  GENERIC_TITLE,
  GENERIC_DESCRIPTION,
  GENERIC_IMAGE,
  CONTRACT_NAME,
  CONTRACT_SYMBOL,
  METADATA_UPDATABLE,
  ROYALTY_SHARE,
  ROYALTY_ADDRESS,
  MAX_SUPPLY,
  MINT_PRICE,
  TOKENS_PER_MINT,
  PRESALE_MINT_START_DATE,
  PUBLIC_MINT_START_DATE,
  BASE_URI,
  PREREVEAL_TOKEN_URI,
  PRESALE_WHITELISTED_ADDRESSES
};
