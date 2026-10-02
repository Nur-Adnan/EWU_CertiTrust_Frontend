# CertiTrust (frontend)

CertiTrust is a blockchain-based system for issuing and verifying academic certificates. It was built by team Ledger Legends and was a finalist project at the EWU National Hackathon 2024.

This repository is the web client. The API lives in [EWU_CertiTrust_Backend](https://github.com/Nur-Adnan/EWU_CertiTrust_Backend).

## What it does

- Separate dashboards for students, faculty, exam controllers and admins
- Course creation and course assignment
- Grade submission by faculty, followed by an approval step
- Grade records and grade history
- Certificate generation once grades are approved
- Wallet connection through a `useWallet` hook, talking to the CertiTrust smart contract with ethers.js (ABI in `src/utils/CertiTrust.json`)

## Stack

React, TypeScript, Vite, Tailwind CSS, shadcn/ui and ethers.js.

## Getting started

```bash
git clone https://github.com/Nur-Adnan/EWU_CertiTrust_Frontend.git
cd EWU_CertiTrust_Frontend
npm install
npm run dev
```

Run the backend alongside it so the client has an API to talk to.
