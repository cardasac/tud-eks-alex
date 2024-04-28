import { AddForm } from "@/app/add-form";
import { DeleteForm } from "@/app/delete-form";

export default async function Page() {
  const products = await getData();
  return (
    <main>
      <h1 className="sr-only">Products</h1>
      <AddForm />
      <ul>
        {products.map((product) => (
          <li key={product[0]}>
            {product[1]}
            <DeleteForm id={product[0]} text={product[1]} />
          </li>
        ))}
      </ul>
    </main>
  );
}

async function getData() {
  const res = await fetch(`http://localhost:8080`, {method: "GET"})

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}

