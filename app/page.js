import { redirect } from "next/navigation";

export default function page() {
  redirect("/signup");
  return null;
}
