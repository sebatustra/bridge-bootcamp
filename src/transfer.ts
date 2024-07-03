import { Transaction, SystemProgram, Connection, Keypair, LAMPORTS_PER_SOL, sendAndConfirmTransaction, PublicKey, clusterApiUrl } from "@solana/web3.js";
import wallet from "../dev-wallet.json"

const sender = Keypair.fromSecretKey(new Uint8Array(wallet));

const receiver = new PublicKey("9KvUj5Haf3GkAnpcVHb18TS8L8MCpymuaJaXh9rWAthq");

const connection = new Connection(clusterApiUrl("devnet"));

(async () => {
    try {
        const transaction = new Transaction().add(
            SystemProgram.transfer({
                fromPubkey: sender.publicKey,
                toPubkey: receiver,
                lamports: 0.1 * LAMPORTS_PER_SOL
            })
        );
        transaction.recentBlockhash = (await connection.getLatestBlockhash("confirmed")).blockhash;
        transaction.feePayer = sender.publicKey;

        const txSig = await sendAndConfirmTransaction(
            connection,
            transaction,
            [sender]
        )

        console.log(`https://explorer.solana.com/tx/${txSig}?cluster=devnet`);

    } catch(e) {
        console.error("error: ", e)
    }
})()