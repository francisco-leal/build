import { cookies } from "next/headers";
import { unsealData } from "iron-session";
import { rollbarError, rollbarWarn } from "../rollbar";

const sessionPassword = process.env.SESSION_PASSWORD as string;
if (!sessionPassword) throw new Error("SESSION_PASSWORD is not set");

export type SessionUser = {
  wallet: string;
  userId: string;
  siwe?: {
    nonce: string;
    address: string;
    issuedAt?: string;
    expirationTime?: string;
  };
};

export async function getSession(): Promise<SessionUser | null> {
  try {
    const encryptedSession = cookies().get("auth_session")?.value;

    const session = encryptedSession
      ? ((await unsealData(encryptedSession, {
          password: sessionPassword,
        })) as string)
      : null;

    return session ? (JSON.parse(session) as SessionUser) : null;
  } catch (e) {
    rollbarWarn("Unable to retrieve existing user session", e as Error);
    return null;
  }
}
