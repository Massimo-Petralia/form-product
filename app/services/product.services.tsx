import { Product } from "../models/models"

const productsURL = 'http://192.168.1.102:3000/resources'

export class ProductServices {
    createProduct = (product: Product)=> {
        return fetch(productsURL, {
            method: 'POST',
            headers: {
                 "Content-Type": "application/json",
                 Accept: "application/json"
            },
            body: JSON.stringify(product)
        })
    }
}