import { Products } from "./Model/productsSchema.js";
import { productsData } from "./constant/productsdata.js";

export const DefaultData = async () => {
  try {
    // Assuming productsData is an array of product objects
    await Products.deleteMany()
    const storeData = await Products.insertMany(productsData);
    // console.log(storeData);
  } catch (error) {
    console.log("Error", error.message);
  }
};
