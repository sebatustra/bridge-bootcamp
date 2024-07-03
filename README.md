https://explorer.solana.com/tx/4jGEAa4hijgwT36q6w2Mto5wGwp7PMWLXJxY6TSpa3sF2NRTUScqovcgcuHoXkFBoxTJZm3VWppXbzjJpnRoPy5p?cluster=devnet

## Description

This repo contains the homeworks and final project of Bridge To Turbin3 bootcamp.

## Installation

Clone this repo and run "yarn install" in the root directory to install the dependencies.

## Files explanations

- src/keygen.ts
  - This script simply generates a keypair using the @solana/web3.js library.
  - Run it with the command "yarn keygen".
    
- src/airdrop.ts
  - This script loads a keypair from a JSON file containing a secret key.
  - Then it initializes a connection to devnet.
  - Finally, it requests an airdrop of 0.5 SOL using the previosuly initialized connection, to the loaded keypair, with the connection method "requestAirdrop".
  - Run it with the command "yarn airdrop".

- src/transfer.ts
  - This script loads again the keypair from the JSON file, initializes a new keypair to send SOL to, and initializes a connection to devnet.
  - Then it creates a new transaction and adds a transfer instruction to that transaction. This instruction includes the sender pubkey, the receiver pubkey, and the amount to be transfered (in lamports).
  - After creating the transaction, it adds the most recent blockhash and the fee payer pubkey to the transaction.
  - Finally, the transaction is sent and confirmed using the @solana/web3.js function "sendAndConfirmTransaction", sending 0.1 SOL from the loaded keypair to the newly initialized publickey.
  - Run it with the command "yarn transfer".

- src/enroll.ts
  - This script loads the keypair from the JSON file and initializes a connection to devnet.
  - Then it initializes an AnchorProvider, which is later used to interact with the IDL of the Anchor Program we will be interacting with.
  - Then it creates an instance of the Anchor Program, using the anchor provider and the IDL found in programs/wba_prereq.ts . This allows us to interact more easily with the solana program, improving the developer experience.
  - Then it creates the PDA seeds, using Buffer in order to get an array of bytes of the string "prereq" and my developer pubkey.
  - A PDA address and bump are derived using Publickey.findProgramAddressSync(), but are not used later (maybe seeds inference from Anchor is helping here?).
  - Finally, using the Anchor Program previously created (with the IDL and the anchor provivder), it sends a transaction to the "complete" method. This methods takes as an argument a Buffer from my github account. We also pass the accounts (the signer) and the array of signers, which in this case is my developer keypair.
  - Run it with the command "yarn enroll".

- programs/wba_prereq.ts
  - This file contains the IDL of the program we are interacting with. As explained above, this allows us to create an instance of an anchor program (from "@coral-xyz/anchor"), drastically siplifying the interaction with the solana program.






