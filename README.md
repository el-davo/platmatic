# Platmatic

A desktop application written in electron and react for interacting with cloud foundry

## Features

* Search functionality (Search for apps or third party services)
* SSH into containers with one click
* Lists system wide events (I.e. app crashes)
* Tail app logs with one click
* Auto login and token refresh
* Works on MAC/Windows/Linux
* Live graphs of memory and CPU usage
* Able to create apps on cloud foundry through this tool
* Market

## Development

### Install

``
npm install
``

### Run in dev mode

```
npm run dev
```

### Tests

```
npm run test-watch
```

```
npm run lint
```

### Building

#### Windows

```
npm run package:win
```

#### MAC

This requires building on a mac

```
npm run package:mac
```
