"use client";

import { useFormState, useFormStatus } from "react-dom";
import { createProduct } from "@/app/actions";

const initialState = {
  message: "",
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" aria-disabled={pending}>
      Add
    </button>
  );
}

export function AddForm() {
  const [state, formAction] = useFormState(createProduct, initialState);

  return (
    <form action={formAction}>
      <label htmlFor="product">Enter Product</label>
      <input type="text" id="product" name="product" required />
      <SubmitButton />
      <p aria-live="polite" className="sr-only" role="status">
        {state?.message}
      </p>
    </form>
  );
}