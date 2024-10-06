# DwCA Router

Find an occurrence, no matter where it lives. 

[![Vercel](https://img.shields.io/badge/Vercel-%23000000.svg?logo=vercel&logoColor=white)](#)
[![Cloudflare](https://img.shields.io/badge/Cloudflare-F38020?logo=Cloudflare&logoColor=white)](#)
[![Next.js](https://img.shields.io/badge/Next.js-black?logo=next.js&logoColor=white)](#)
[![TailwindCSS](https://img.shields.io/badge/Tailwind%20CSS-%2338B2AC.svg?logo=tailwind-css&logoColor=white)](#)
[![npm](https://img.shields.io/badge/npm-CB3837?logo=npm&logoColor=fff)](#)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff)](#)

## Introduction

This application resolves various url structures used by aggregators and collection mangaement systems so you don't have to. Rather, you encode a *single* piece of information into a QR code and place it next to the specimen. Instead of having to worry about whether a given URL is going to stand the test of time, you pick a resolver that you would like to use.

### What is the purpose of the resolver?

The resolver is simply a domain name that you are designating to be the router. It takes in an dwc::occurrenceId and routes it to the appropriate place. There is a public router you can use at <https://dwca.net>, however the application really shines when it is forked and configured for a particular institution. The `dwca.net` resolver needs to ask for various inputs that can be configured as the defaults to speed up the progress greatly if you know what they are.

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





