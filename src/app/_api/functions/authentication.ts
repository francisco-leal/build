"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { sealData } from "iron-session";
import { SiweMessage, generateNonce } from "siwe";
import { SessionUser } from "@/services/authentication/cookie-session";
import {
  connectUserToWallets,
  createNewUserForWallet,
  getUserFromWallet,
} from "../data/users";

const sessionPassword = process.env.SESSION_PASSWORD as string;
if (!sessionPassword) throw new Error("SESSION_PASSWORD is not set");

export const getNonce = async () => {
  return generateNonce();
};

export const connectUser = async ({
  address,
  message,
  signature,
  nonce,
}: {
  address: string;
  message: string;
  signature: string;
  nonce: string;
}) => {
  const siweObject = new SiweMessage(message);

  const { data: siweMessage, error } = await siweObject.verify({
    signature: signature,
    nonce: nonce,
  });

  if (error) throw new Error("Error verifying message");

  const user =
    (await getUserFromWallet(address)) ??
    (await createNewUserForWallet(address));

  await connectUserToWallets(user, address);

  const sessionUser: SessionUser = {
    wallet: address,
    userId: user?.id,
    siwe: {
      address: siweMessage.address,
      nonce: siweMessage.nonce,
      issuedAt: siweMessage.issuedAt,
      expirationTime: siweMessage.expirationTime,
    },
  };

  const encryptedSession = await sealData(JSON.stringify(sessionUser), {
    password: sessionPassword,
  });

  cookies().set("auth_session", encryptedSession, {
    sameSite: "strict",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 365, // One year
    path: "/",
  });
};

export const disconnectUser = async () => {
  cookies().delete("auth_session");
};
