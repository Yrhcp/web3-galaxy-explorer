import { PlanetLevel } from "./types";

export const levels: PlanetLevel[] = [
  {
    id: 1,
    name: "Neptune",
    englishName: "Neptune",
    colorPalette: {
      primary: "bg-blue-950",
      accent: "text-blue-400",
    },
    threeConcepts: [
      {
        id: "blockchain-basics",
        title: "What is a Blockchain?",
        content:
          "A distributed public database updated and shared across many computers (nodes). Instead of a central server, data is stored in blocks cryptographically linked together, creating an immutable timeline.",
      },
      {
        id: "decentralization",
        title: "The Power of Decentralization",
        content:
          'The transfer of control from a centralized entity (like a bank) to a distributed network. It eliminates the "single point of failure" and ensures no single authority can censor transactions.',
      },
      {
        id: "hashing",
        title: "Cryptographic Hashing",
        content:
          "The foundation of blockchain security. Hashing takes input data and produces a fixed-length output. Changing even one character in the original data completely changes the hash, instantly alerting the network to tampering.",
      },
    ],
    finalQuest: {
      question: "What best describes a blockchain?",
      options: [
        "A central database controlled by a single tech company.",
        "A physical hardware device used to store digital currencies.",
        "A distributed digital ledger shared across a network of computers.",
      ],
      correctOptionIndex: 2,
    },
  },
  {
    id: 2,
    name: "Uranus",
    englishName: "Uranus",
    colorPalette: {
      primary: "bg-teal-950",
      accent: "text-teal-400",
    },
    threeConcepts: [
      {
        id: "public-private-keys",
        title: "Public & Private Keys",
        content:
          "A crypto wallet uses a pair of cryptographic keys. Your Public Key is like a bank account number that you can share to receive funds. Your Private Key is like your ATM PIN—it gives full control over the funds and must never be shared.",
      },
      {
        id: "seed-phrase",
        title: "The Seed Phrase",
        content:
          "A Seed Phrase (or Recovery Phrase) is a human-readable list of 12 to 24 words that acts as the ultimate master backup for your Private Keys. If you lose your device, this phrase is the ONLY way to recover your assets.",
      },
      {
        id: "custodial-vs-noncustodial",
        title: "Custodial vs. Non-Custodial",
        content:
          'In a "Custodial" wallet (like on a centralized exchange), a company holds your private keys. In a "Non-Custodial" wallet (like MetaMask or a hardware wallet), only YOU hold the keys, meaning you have true ownership, but also total responsibility.',
      },
    ],
    finalQuest: {
      question:
        "What should you do if a website or customer support agent asks for your 12-word Seed Phrase?",
      options: [
        "Never share it under any circumstances, as it gives full access to your funds.",
        "Share it immediately to verify your account identity.",
        "Take a screenshot of it and email it to the support team.",
      ],
      correctOptionIndex: 0,
    },
  },
  {
    id: 3,
    name: "Saturn",
    englishName: "Saturn",
    colorPalette: {
      primary: "bg-amber-950",
      accent: "text-amber-400",
    },
    threeConcepts: [
      {
        id: "consensus-mechanisms",
        title: "Consensus Mechanisms",
        content:
          'Blockchains use "Consensus Mechanisms" to agree on truth. Proof of Work (Bitcoin) uses computing power, while Proof of Stake (Ethereum) uses staked assets to secure the network.',
      },
      {
        id: "gas-fees",
        title: "Gas & Network Fees",
        content:
          'To process transactions, you pay "Gas" fees. These compensate validators for the computing power used to secure your request.',
      },
      {
        id: "mempool",
        title: "The Mempool",
        content:
          'Transactions wait in a "Mempool" (waiting room). Validators pick those with the highest gas fees first during high traffic.',
      },
    ],
    finalQuest: {
      question:
        "Why do gas fees spike during major NFT drops or high network traffic?",
      options: [
        "Central banks increase the blockchain interest rate.",
        "Limited block space creates competition where users offer higher fees to be processed first.",
        "Validators stop working to manipulate prices.",
      ],
      correctOptionIndex: 1,
    },
  },
  {
    id: 4,
    name: "Jupiter",
    englishName: "Jupiter",
    colorPalette: {
      primary: "bg-orange-950",
      accent: "text-orange-400",
    },
    threeConcepts: [
      {
        id: "smart-contracts",
        title: "Smart Contracts",
        content:
          "Digital contracts stored on a blockchain that automatically execute when predetermined conditions are met. No middleman (like a lawyer or bank) is needed.",
      },
      {
        id: "dapps",
        title: "DApps",
        content:
          "Decentralized Applications. These are apps (like Uniswap or Aave) that run on a blockchain instead of a central server, making them permissionless and censorship-resistant.",
      },
      {
        id: "evm",
        title: "The EVM",
        content:
          'The Ethereum Virtual Machine. Think of it as a giant, global computer that executes all smart contracts. It\'s the "brain" of the Ethereum network.',
      },
    ],
    finalQuest: {
      question: "What is the main advantage of a Smart Contract?",
      options: [
        "It can be easily changed by the bank at any time.",
        "It requires a physical signature from a notary to work.",
        "It executes automatically based on code, removing the need for a trusted third party.",
      ],
      correctOptionIndex: 2,
    },
  },
  {
    id: 5,
    name: "Mars",
    englishName: "Mars",
    colorPalette: {
      primary: "bg-red-950",
      accent: "text-red-400",
    },
    threeConcepts: [
      {
        id: "nfts",
        title: "NFTs",
        content:
          "Non-Fungible Tokens. Unlike Bitcoin (which is fungible—one BTC is the same as another), each NFT is unique and cannot be replaced. It proves ownership of a specific digital item.",
      },
      {
        id: "metadata",
        title: "Metadata",
        content:
          'Since storing large images on a blockchain is expensive, NFTs usually store "Metadata"—a link or description that points to the actual artwork or file.',
      },
      {
        id: "royalties",
        title: "Royalties",
        content:
          "Smart contracts allow creators to automatically receive a percentage of every future resale of their NFT, ensuring artists get paid forever.",
      },
    ],
    finalQuest: {
      question: 'Why is an NFT "Non-Fungible"?',
      options: [
        "Because it is unique and cannot be exchanged on a one-to-one basis with something identical.",
        "Because it can be used as a currency to buy coffee.",
        "Because it is controlled by a central digital art gallery.",
      ],
      correctOptionIndex: 0,
    },
  },
  {
    id: 6,
    name: "Venus",
    englishName: "Venus",
    colorPalette: {
      primary: "bg-yellow-900",
      accent: "text-yellow-400",
    },
    threeConcepts: [
      {
        id: "defi",
        title: "DeFi",
        content:
          "Decentralized Finance. It's a financial system built on public blockchains that doesn't rely on central intermediaries like banks or brokerages.",
      },
      {
        id: "liquidity-pools",
        title: "Liquidity Pools",
        content:
          "Instead of a central book-keeper, DeFi uses smart contracts filled with crypto (Liquidity Pools) to allow users to trade tokens automatically.",
      },
      {
        id: "yield-farming",
        title: "Yield Farming",
        content:
          "A way to earn rewards by providing your crypto to these liquidity pools. It's like earning interest, but powered by smart contract fees.",
      },
    ],
    finalQuest: {
      question: "What is a Liquidity Pool?",
      options: [
        "A physical vault in a Swiss bank.",
        "A smart contract containing a pair of tokens that allows decentralized trading.",
        "A community of DeFi traders who meet in person.",
      ],
      correctOptionIndex: 1,
    },
  },
  {
    id: 7,
    name: "Earth",
    englishName: "Earth",
    colorPalette: {
      primary: "bg-green-950",
      accent: "text-green-400",
    },
    threeConcepts: [
      {
        id: "dao",
        title: "DAO",
        content:
          "Decentralized Autonomous Organization. It's a community-led entity with no central leader. Decisions are made via proposals and voting.",
      },
      {
        id: "governance-tokens",
        title: "Governance Tokens",
        content:
          'To vote in a DAO, you usually hold "Governance Tokens". The more tokens you have, the more weight your vote carries in the organization\'s future.',
      },
      {
        id: "treasury",
        title: "Treasury",
        content:
          'DAOs often manage a shared "Treasury" (fund), which is spent based on the collective vote of the community to build new features or fund projects.',
      },
    ],
    finalQuest: {
      question: "How are decisions made in a DAO?",
      options: [
        "By a Board of Directors appointed by a CEO.",
        "By the government agency that issued the governance tokens.",
        "Through community proposals and voting by token holders.",
      ],
      correctOptionIndex: 2,
    },
  },
  {
    id: 8,
    name: "Mercury",
    englishName: "Mercury",
    colorPalette: {
      primary: "bg-slate-900",
      accent: "text-slate-400",
    },
    threeConcepts: [
      {
        id: "onchain-identity",
        title: "Onchain Identity",
        content:
          "In Web3, your wallet address is your ID. It stores your reputation, your assets, and your history across all apps without needing a password.",
      },
      {
        id: "l2-base",
        title: "L2 Solutions & Base",
        content:
          "Layer 2 networks like Base sit on top of Ethereum to make transactions 10x faster and much cheaper while keeping the same security.",
      },
      {
        id: "social-graph",
        title: "Social Graph / Farcaster",
        content:
          "Web3 social networks allow you to own your content and followers. Your profile is not owned by a company, but by YOU on the blockchain.",
      },
    ],
    finalQuest: {
      question:
        "Why use a Layer 2 network like Base instead of the main Ethereum network?",
      options: [
        "To make transactions faster and significantly cheaper.",
        "Because the main Ethereum network is closing down soon.",
        "To hide your transactions from the public blockchain.",
      ],
      correctOptionIndex: 0,
    },
  },
  {
    id: 9,
    name: "The Sun",
    englishName: "The Sun",
    colorPalette: {
      primary: "bg-orange-500",
      accent: "text-yellow-100",
    },
    threeConcepts: [
      {
        id: "onchain-sun",
        title: "The Onchain Sun",
        content:
          "You have reached the center of the Web3 galaxy. Everything you've learned—keys, gas, smart contracts, and DAOs—converges here on Base.",
      },
      {
        id: "power-of-base",
        title: "The Power of Base",
        content:
          "Base is an L2 that brings the world onchain. It's fast, cheap, and secured by Ethereum. This is where your journey as a builder or user truly begins.",
      },
      {
        id: "your-future",
        title: "Your Future",
        content:
          "Web3 is about ownership. You now own your identity, your assets, and your data. Welcome to the new internet.",
      },
    ],
    finalQuest: {
      question:
        "You want to send an NFT to a friend on a Saturday night when the network is busy. You want it to be fast and cheap while keeping your identity secure. What is the best way?",
      options: [
        "Write a letter to a bank and ask them to verify the digital art transfer.",
        "Use a Non-Custodial wallet on a Layer 2 network like Base to sign a transaction with your Private Key.",
        "Share your 12-word Seed Phrase with a support bot to speed up the transaction.",
      ],
      correctOptionIndex: 1,
    },
  },
];
