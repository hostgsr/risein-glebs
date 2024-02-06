# RiseIn Competition | Student Dashboard DApp - README

Here is link:
https://risein-glebs.vercel.app/

All works on devnet

1) just click on "start here" enjoy animation:)
2) connect phantom wallet
3) create account/ mint nft
4) solve quiz

Welcome to the Student Dashboard DApp project repository! This is just a very small portion of what's possible and how we can use blockchain technology. The main goal for me was to think about how I can implement my front-end and design knowledge from the web2 world. I tried to mix some well-known crypto functions like NFT minting with well-known activities on the internet like account creation. So, as a result, we have this dashboard where new users can create an account as an NFT. If you hold your NFT, then you can access your account. All user-specific data are inside of this NFT, so the user is the only person who holds and has control over this data. The sky is the limit, and quality and complexity require time. This is just a quick workaround (1 weekend) of basic concepts.

As a front-end developer mainly working with web2 clients but being a crypto enthusiast, I created this dashboard where I tried to play around and try some design concepts. One of them was wallet balance. I decided not to show the balance, as we all know, but just to display a red or green light, which means:

🟢 There are enough funds, and the user can participate in activities.
🔴 There are not enough funds, and the user has to add some funds.

Since I see this dashboard where transactions cost almost nothing, it doesn't matter how many SOLs the user has exactly.

Also, I implemented a bento box structure so the design can be easily adopted and expanded. For example, it will be important to have an interface where the user can send transactions, see the publicKey, and see the exact amount of SOL. It can be easily integrated.

For the first time, the main focus was on the first onboarding model where the user can connect  wallet and create an account (mint NFT with personal data).

Also, there is a dashboard model where the user can solve a quiz. In this project, I haven't implemented the whole logic of changing NFT metadata or giving the user Points as tokens. But it's all possible, so the user can earn points and solve other quizzes or open other modules. With this project, I just wanted to play around with some Metaplex/Solana functions.

Check out my portfolio website:
glebsavelev.com

I am open for any kind of cooperation, conversations and work specialy on web3 projects! Lets get in touch!



## Table of Contents

- [Overview](#overview)
- [Getting Started](#getting-started)
- [Frontend](#frontend)


## Overview


Long story short:

1)Connect your wallet (Phantom Wallet).
2)Sign up by entering data about yourself and create an NFT with this data as a URI.
3)Next time you refresh the page and connect with the same wallet, you will be recognized as a registered user, so you will be able to participate in the dashboard quizzes.
4)As I mentioned, the sky is the limit. It's possible to adjust this dashboard with new quizzes, give users some points, etc., all on the blockchain where the user holds their data, and login is based on NFT authentication.


## Getting Started

Everything is already in production here:
https://risein-glebs.vercel.app/

First click on "Start here" button to see nice animation and expand dashboard :)
,


if you want to play around with my code locally just:

npm i
npm run dev 



## Frontend

The DApp frontend is built using modern web technologies including NEXT JS, Metaplex, Web3.js.


