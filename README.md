# DwCA Router

Find an occurrence, no matter where it lives. 

## Introduction

This application resolves various URL structures used by aggregators and collection management systems so you don't have to. Rather, you encode a *single* piece of information into a QR code and place it next to the specimen. Instead of having to worry about whether a given URL is going to stand the test of time, you pick a router that you would like to use.

### What is the purpose of the router?

The router is simply a hostname that you are designating to be a long-term contact point for occurrence records to reach out to first. This could be through a QR code, or links could be embedded in some way with an occurrence record. It takes in an dwc::occurrenceId and routes it to the appropriate place. There is a public router you can use at <https://dwca.net>, however the application really shines when it is forked and configured for a particular institution. The `dwca.net` resolver needs to ask for various inputs that can be configured as the defaults to speed up the progress greatly if you know what they are.

### Configuration

The application is meant to be configurable with default values, so that the user has to input as few things as possible. For example, if your institution has a Specify instance, you would configure the domain of that instance so that the application does not need to ask. These configurations are placed in `config.ts`. 

```typescript
// The values in this file are what are used in dwca.net by default.
export const config = {
  resolverDomain: "https://dwca.net",
  specifyDomain: "https://sp7demofish.specifycloud.org",
  symbiotaDomain: "https://bryophyteportal.org",
  qrCodeSize: 150,
  qrErrorCorrection: M,
  qrCodeFormat: png,
};
```

### QR Code Generation

You can generate QR codes using any method, including through label making within an existing Collection Management System. Whichever method you choose for the generation, the code itself should point to the **root** of the router for that particular occurrence.


Template: `{router}/r/{occurrenceId}`
Example: `https://dwca.net/r/4c906ce8-a2bf-425f-8d50-82197e918028`

The `r` is important, and it separates the dynamic route from the root, which can cause increases in loading times if browsers reach out to `/favicon.ico` by default. Bots may also spam the root path for various things.

## Installation

### Clone the repository

```
git clone https://github.com/mark-pitblado/dwca-router
cd dwca-router
```

### Install packages

```
npm install
```

### Run development server

```
npm run dev
```




