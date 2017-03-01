import { WINDOW } from './../constants/index';
import * as jsSHA from 'jssha'
type IdGenerator = () => string

const shaObj = new jsSHA('SHA-512', "ARRAYBUFFER")

export const genId: IdGenerator = () => {
  const getRandomValues: (size: number) => ArrayBufferView = (size: number) => WINDOW ?
    window.crypto.getRandomValues(new Uint8Array(size))
  : require('crypto').randomBytes(size)
  const arr: any = getRandomValues(256)

  shaObj.update(arr)
  return shaObj.getHash('HEX')
}