import { Product } from "../types";
import {
  ActionFunctionArgs,
  Form,
  redirect,
  useFetcher,
  useNavigate,
} from "react-router-dom";
import { formatCurrency } from "../utils";
import { deleteProductById } from "../services/ProductServices";

type ProductDetailsProp = {
  product: Product;
};

export async function action({ params }: ActionFunctionArgs) {
  console.log(params);
  if (params.id) await deleteProductById(+params.id);
  return redirect("/Products");
}

export default function ProductDetails({ product }: ProductDetailsProp) {
  const isAvailable = product.availability;
  const fetcher = useFetcher();
  const navigate = useNavigate();

  return (
    <tr className="border-b ">
      <td className="p-3 text-lg text-gray-800">{product.name}</td>
      <td className="p-3 text-lg text-gray-800">
        {formatCurrency(product.price)}
      </td>
      <td className="p-3 text-lg text-gray-800">
        <fetcher.Form method="POST">
          <button
            type="submit"
            name="id"
            value={product.id.toString()}
            className={`${
              isAvailable ? "text-black" : "text-red-500"
            } rounded-lg p-2 text-xs uppercase font-bold w-full border border-black-100 cursor-pointer`}
          >
            {isAvailable ? "Disponible" : "No Disponible "}
          </button>
        </fetcher.Form>
      </td>
      <td className="p-3 text-lg text-gray-800 ">
        <div className="flex gap-2 items-center">
          <button
            onClick={() =>
              navigate(`/edit/${product.id}`, { state: { product } })
            }
            className="bg-indigo-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs"
          >
            Editar
          </button>

          <Form
            className="w-full"
            method="POST"
            action={`/delete/${product.id}`}
            onSubmit={(e) => {
              if (!confirm("¿ Eliminar el Producto ?")) {
                e.preventDefault();
              }
            }}
          >
            <input
              type="submit"
              value="Eliminar"
              className="bg-red-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs"
            />
          </Form>
        </div>
      </td>
    </tr>
  );
}
