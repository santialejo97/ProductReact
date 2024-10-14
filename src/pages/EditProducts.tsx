import {
  Link,
  Form,
  useActionData,
  ActionFunctionArgs,
  redirect,
  useLocation,
  LoaderFunctionArgs,
  useLoaderData,
} from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import { getProductById, updateProductById } from "../services/ProductServices";
import { Product } from "../types";
import ProductForm from "../components/ProductForm";

export async function action({ request, params }: ActionFunctionArgs) {
  const data = Object.fromEntries(await request.formData());
  console.log(data);
  let error = "";
  if (Object.values(data).includes("")) {
    error = "todos los campos son obligatorios";
  }
  if (error.length) {
    return error;
  }
  if (params.id) {
    await updateProductById(+params.id, data);

    return redirect("/Products");
  }
}

export async function loader({ params }: LoaderFunctionArgs) {
  if (params.id) {
    const product = await getProductById(+params.id);
    if (!product) {
      // throw new Response("", {
      //   statusText: "no existe el producto",
      //   status: 404,
      // });
      return redirect("/Products");
    }
    return product;
  }
  return {};
}

const availabilityOptions = [
  { name: "Disponible", value: true },
  { name: "No Disponible", value: false },
];

export default function EditProducts() {
  const error = useActionData() as string;
  const { state } = useLocation();
  const product = state == null ? (useLoaderData() as Product) : state.product;
  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-4xl font-black text-slate-500 ">Editar Producto</h2>
        <Link
          to="/Products"
          className="rounded-md bg-indigo-600 p-3 text-sm text-white shadow-sm hover:bg-indigo-500 cursor-pointer"
        >
          Volver a Productos
        </Link>
      </div>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <Form className="mt-10" method="POST">
        <ProductForm product={product} />

        <div className="mb-4">
          <label className="text-gray-800" htmlFor="availability">
            Disponibilidad:
          </label>
          <select
            id="availability"
            className="mt-2 block w-full p-3 bg-gray-50"
            name="availability"
            defaultValue={product?.availability.toString()}
          >
            {availabilityOptions.map((option) => (
              <option key={option.name} value={option.value.toString()}>
                {option.name}
              </option>
            ))}
          </select>
        </div>

        <input
          type="submit"
          className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
          value="Actualizar Producto"
        />
      </Form>
    </>
  );
}
