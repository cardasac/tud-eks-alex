"use server";

import { revalidatePath } from "next/cache";

// CREATE TABLE todos (
//   id SERIAL PRIMARY KEY,
//   text TEXT NOT NULL
// );

export async function createTodo(
  prevState,
  formData,
) {
  const data = {todo: formData.get("todo")};
  console.log(data)

  try {
    await sql`
      INSERT INTO todos (text)
      VALUES (${data.todo})
    `;

    revalidatePath("/");
    return { message: `Added todo ${data.todo}` };
  } catch (e) {
    return { message: "Failed to create todo" };
  }
}

export async function deleteTodo(
  prevState,
  formData,
) {
  const data = {
    id: formData.get("id"),
    todo: formData.get("todo"),
  };

  try {
    await sql`
      DELETE FROM todos
      WHERE id = ${data.id};
    `;

    revalidatePath("/");
    return { message: `Deleted todo ${data.todo}` };
  } catch (e) {
    return { message: "Failed to delete todo" };
  }
}