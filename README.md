# React Octadground
[![NPM Download Stats](https://nodei.co/npm/react-octadground.png?downloads=true)](https://www.npmjs.com/package/react-octadground)

[![Dependency Status](https://david-dm.org/dechristopher/react-octadground.svg)](https://david-dm.org/dechristopher/react-octadground)
[![devDependencies Status](https://david-dm.org/dechristopher/react-octadground/dev-status.svg)](https://david-dm.org/dechristopher/react-octadground?type=dev)
[![Known Vulnerabilities](https://snyk.io/test/github/dechristopher/react-octadground/badge.svg?targetFile=package.json)](https://snyk.io/test/github/dechristopher/react-octadground?targetFile=package.json)

**react-octadground** is a React wrapper of [Octadground](https://github.com/dechristopher/octadground)


## Installation

```
npm install --save react-octadground
```

## Example

- An example implementation with free move is provided in [example](https://github.com/dechristopher/react-octadground/tree/master/example)

## Usage

```js
import Octadground from 'react-octadground'
import 'react-octadground/dist/styles/octadground.css'

const Demo: FC = props => {
  return <Octadground />;
}
```

## Documentation

Options of `Octadground` are mapped to properties of `react-octadground`

You can refer to documentation of `Octadground` for detailed configuration

- [Config documented types](https://github.com/dechristopher/octadground/tree/master/src/config.ts)
- [Config default values](https://github.com/dechristopher/octadground/tree/master/src/state.ts)

