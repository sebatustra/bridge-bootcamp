import { Connection, Keypair, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { Program, Wallet, AnchorProvider } from "@coral-xyz/anchor";
import { IDL, WbaPrereq } from "../programs/wba_prereq";
import wallet from "../dev-wallet.json";

(async () => {

    const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));
    const connection = new Connection(clusterApiUrl("devnet"));

    const github = Buffer.from("sebatustra", "utf8");

    const provider = new AnchorProvider(connection, new Wallet(keypair), {
        commitment: "confirmed"
    });

    const program: Program<WbaPrereq> = new Program(IDL, provider);

    const pdaSeeds = [
        Buffer.from("prereq"),
        keypair.publicKey.toBuffer()
    ];

    const [pda, _bump] = 
        PublicKey.findProgramAddressSync(pdaSeeds, program.programId);

    try {
        const tx = await program.methods
            .complete(github)
            .accounts({
                signer: keypair.publicKey
            })
            .signers([
                keypair
            ])
            .rpc()

        console.log(`Success! Check out your TX here:
            https://explorer.solana.com/tx/${tx}?cluster=devnet`);
        
    } catch(error) {
        console.error("error: ", error);
    }

})()