import axios from "axios";


export const productdata=async ()=>{
    const products= await axios.get("product.json")
    return products
}