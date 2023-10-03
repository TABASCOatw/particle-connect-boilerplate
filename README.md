<div align="center">
  <a href="https://particle.network/">
    <img src="https://i.imgur.com/xmdzXU4.png" />
  </a>
  <h3>
    Particle Connect Boilerplate
  </h3>
</div>

⚡️ Boilerplate for a Particle Connect implementation with Google, phone, and email [Particle Auth](https://docs.particle.network/developers/auth-service) integration alongside various **EVM** and **Solana** wallet providers.

Built using **Particle Connect**, **TypeScript**, and **Web3.js**

## 🔌 Particle Connect
Particle Connect is a simple collection of wallet adapters and components capable of facilitating connection with Particle Auth (Web2 logins), and various third-party wallet providers (Web3 logins).

## 🔑 Particle Auth
Particle Auth, a component of Particle Network's Wallet-as-a-Service, enables seamless onboarding to an application-embedded MPC-TSS/AA wallet facilitated by social login, such as Google, GitHub, email, phone number, etc.

👉 Try the demo: https://web-demo.particle.network/connectKit

👉 Learn more about Particle Network: https://particle.network

![Particle Auth Example](https://i.imgur.com/Ksr30kd.png)

## 🛠️ Quickstart

### Clone this repository
```
git clone https://github.com/TABASCOatw/particle-rainbowkit.git
```

### Install dependencies
```
yarn install
```
OR
```
npm install
```

### Set environment variables
This project requires a number of keys from Particle Network and WalletConnect to be defined in `.env`. The following should be defined:
- `REACT_APP_APP_ID`, the ID of the corresponding application in your [Particle Network dashboard](https://dashboard.particle.network/#/applications).
- `REACT_APP_PROJECT_ID`, the ID of the corresponding project in your [Particle Network dashboard](https://dashboard.particle.network/#/applications).
-  `REACT_APP_CLIENT_KEY`, the client key of the corresponding project in your [Particle Network dashboard](https://dashboard.particle.network/#/applications).
-  `REACT_APP_WALLETCONNECT_PROJECT_ID`, the project ID of the corresponding project in your [WalletConnect dashboard](https://cloud.walletconnect.com/app)

### Start the project
```
npm run dev
```
OR
```
yarn dev
```

##
Originally featured in "[Supercharging UX in 3, 2, and 6 minutes](https://twitter.com/TABASCOweb3/status/1707969225229529288)"
