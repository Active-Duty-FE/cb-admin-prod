import { User } from '@/types/ResponseType'
import CryptoJS from 'crypto-js'

export class Crypto<T> {
  constructor() {
    this.encrypt = (data, privateKey) => {
      return CryptoJS.AES.encrypt(JSON.stringify(data), privateKey).toString()
    }
    this.decrypt = (encryptData, privateKey) => {
      const bytes = CryptoJS.AES.decrypt(encryptData, privateKey)
      return JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
    }
  }
  encrypt: (data: T, privateKey: string) => string
  decrypt: (encryptData: string, privateKey: string) => T
}

export const tokenCrypto = new Crypto<User & { time: number }>()
