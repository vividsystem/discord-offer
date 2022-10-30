import { Offer } from "./offer"
import { Client } from "discord.js"

interface InitializeConfig {
  client: Client,
  storageFile: string
}



interface Storage<T> {
  getAll(): Map<number, T>
  getByID(id: number): T | undefined
  add(object: T): T
  set(id: number, object: T): T
  remove(id: number): T | null
}

interface AddOfferConfig {
  id: -1
  item: string
  price: string
  duration: number
  creator: string
}

interface AddSellOfferConfig extends AddOfferConfig {
  auctioned: boolean
}

class OfferHandler {
  storage: Storage<Offer>
  file: string
  client: Client

  constructor(config: InitializeConfig, storage: Storage<Offer>) {
    this.file = config.storageFile
    this.client = config.client
    this.storage = storage
  }

  start() {
    setInterval(() => {
      this.storage.getAll().forEach((v,k) => {
        if(v.end >= Date.now()) {
          //message
          this.storage.remove(v.id)
        }
      })
    }, 1000)
  }


  addOffer(cfg: AddOfferConfig | AddSellOfferConfig) {
    return this.storage.add({...cfg, end: Date.now()+cfg.duration}).id
  }

  endOffer(id: string) {
    if(id.match(/\d+/) == null) throw new Error("id is not a number")
    
    return this.storage.remove(Number(id))
  }
}


export { OfferHandler }