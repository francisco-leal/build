import { unsealData, sealData } from "iron-session";
import { cookies } from "next/headers";

const sessionPassword = process.env.SESSION_PASSWORD as string;
if (!sessionPassword) throw new Error("SESSION_PASSWORD is not set");

export type SessionUser = {
  userId: number;
  userWalletAddress: string;
  siwe?: {
    nonce: string;
    address: string;
    issuedAt?: string;
    expirationTime?: string;
  };
};

export async function getSession(): Promise<SessionUser | null> {
  const encryptedSession = cookies().get("auth_session")?.value;

  const session = encryptedSession
    ? ((await unsealData(encryptedSession, {
        password: sessionPassword,
      })) as string)
    : null;

  return session ? (JSON.parse(session) as SessionUser) : null;
}

export async function setSession(user: SessionUser): Promise<void> {
  const encryptedSession = await sealData(JSON.stringify(user), {
    password: sessionPassword,
  });

  cookies().set("auth_session", encryptedSession, {
    sameSite: "strict",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 365, // One year
    path: "/",
  });
}

export async function clearSession(): Promise<void> {
  cookies().delete("auth_session");
}
