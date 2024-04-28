import { AddForm } from "@/app/add-form";
import { DeleteForm } from "@/app/delete-form";

export default function Page() {
  // let todos = await sql`SELECT * FROM todos`;
  let todos = new Map(Object.entries({"id": 1, "text": "demo"}))

  return (
    <main>
      <h1 className="sr-only">Products</h1>
      <AddForm />
      <ul>
        {todos.forEach((todo) => (
          <li key={todo.id}>
            {todo.text}
            <DeleteForm id={todo.id} todo={todo.text} />
          </li>
        ))}
      </ul>
    </main>
  );
}
