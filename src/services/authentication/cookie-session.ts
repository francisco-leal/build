import { cookies } from "next/headers";
import { unsealData, sealData } from "iron-session";

const sessionPassword = process.env.SESSION_PASSWORD as string;
if (!sessionPassword) throw new Error("SESSION_PASSWORD is not set");

export type SessionUser = {
  wallet: string;
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
