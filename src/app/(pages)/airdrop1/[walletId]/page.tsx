import { RedirectToHome } from "@/app/_components/redirect-to-home";

export default async function Page({
  params,
}: {
  params: { walletId: string };
}) {
  return (
    <div>
      <RedirectToHome />
    </div>
  );
}

export const maxDuration = 60;
export const dynamic = "force-dynamic";
