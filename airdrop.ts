import { clusterApiUrl, Connection, Keypair, LAMPORTS_PER_SOL } from "@solana/web3.js";
import wallet from "./dev-wallet.json";

const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));
const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

(async () => {
    try {
        console.log("airdropping to wallet: ", keypair.publicKey.toString())

        const txSig = await connection.requestAirdrop(keypair.publicKey, 1 * LAMPORTS_PER_SOL);
        const latestBlockHash = await connection.getLatestBlockhash();

        await connection.confirmTransaction({
            blockhash: latestBlockHash.blockhash,
            lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
            signature: txSig
        });

        console.log(`https://explorer.solana.com/tx/${txSig}?cluster=devnet`)
    } catch(e) {
        console.error("error: ", e)
    }
})();