import {
  DraftProductSchema,
  Product,
  ProductSchema,
  ProductsSchema,
} from "./../types/index";
import { safeParse, pipe, string, parse, transform } from "valibot";
import axios from "axios";

type productData = {
  [k: string]: FormDataEntryValue;
};

export async function addProduct(data: productData) {
  try {
    const result = safeParse(DraftProductSchema, {
      name: data.name,
      price: +data.price,
    });
    console.log(result);
    if (result.success) {
      const url = `${import.meta.env.VITE_API_URL}/api/products`;
      await axios.post(url, {
        name: result.output.name,
        price: result.output.price,
      });
    } else {
      throw new Error("Datos no validos");
    }
  } catch (error) {
    console.log(error);
  }
}

export async function getProducts() {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/products`;
    const { data } = await axios.get(url);
    const result = safeParse(ProductsSchema, data.data);
    if (result.success) {
      return result.output;
    } else {
      throw new Error("Hubo un error ");
    }
  } catch (error) {
    console.log(error);
  }
}

export async function getProductById(id: Product["id"]) {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
    const { data } = await axios.get(url);
    const result = safeParse(ProductSchema, data.data);
    if (result.success) {
      return result.output;
    } else {
      throw new Error("Hubo un error ");
    }
  } catch (error) {
    console.log(error);
  }
}

export async function updateProductById(id: Product["id"], data: productData) {
  console.log(id), console.log(data);
  try {
    const booleanSchema = pipe(
      string(),
      transform((input) => (input == "true" ? true : false))
    );

    const result = safeParse(ProductSchema, {
      id,
      name: data.name,
      price: +data.price,
      availability: parse(booleanSchema, data.availability),
    });

    const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
    await axios.put(url, result.output);
    if (result.success) {
      return result.output;
    } else {
      throw new Error("Hubo un error ");
    }
  } catch (error) {
    console.log(error);
  }
}

export async function deleteProductById(id: Product["id"]) {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
    await axios.delete(url);
  } catch (error) {
    console.log(error);
  }
}

export async function updateProductAvailability(id: Product["id"]) {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
    await axios.patch(url);
  } catch (error) {
    console.log(error);
  }
}
