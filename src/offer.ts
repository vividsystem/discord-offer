import { Client } from "discord.js"


interface Offer {
  id: number
  item: string
  price: string
  creator: string
  duration: number
  end: number
}

interface SellOffer extends Offer {
  auctioned: boolean
}

export { Offer, SellOffer }