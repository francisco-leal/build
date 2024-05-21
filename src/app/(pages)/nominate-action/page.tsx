import { redirect } from "next/navigation";

export default function NominateAction() {
  redirect(
    "https://warpcast.com/~/add-cast-action?url=https://build.top/api/action",
  );
}
