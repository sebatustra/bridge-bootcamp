import { Keypair } from "@solana/web3.js";

const keypair = Keypair.generate();

console.log(`You've generated a new Solana wallet: ${keypair.publicKey.toBase58()}`);
console.log(`Solana Wallet Secret Key: [${keypair.secretKey}]`);