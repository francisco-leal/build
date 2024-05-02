import type { NextRequest } from "next/server";
import { supabase } from "@/db";
import { setSession } from "@/services/authentication/cookie-session";
import { createProfile } from "./create";
import { SiweMessage } from "siwe";
import { getSession } from "@/services/authentication/cookie-session";

export async function GET(request: NextRequest) {
  // if it contains a query parameter wallet_address, we will search for the user by wallet_address
  const walletAddressSearch =
    request.nextUrl.searchParams.get("wallet_address");

  if (walletAddressSearch) {
    let { data: user_personal_stats, error } = await supabase
      .from("user_personal_stats")
      .select("*")
      .eq("wallet_address", walletAddressSearch)
      .single();

    if (error || !user_personal_stats) {
      return Response.json({ error }, { status: 404 });
    }

    return Response.json(user_personal_stats);
  }

  // otherwise we will return the user session

  const user = await getSession();

  if (!user) {
    return Response.json({ error: "user not connected!" }, { status: 401 });
  }

  return Response.json(user);
}

export async function POST(request: NextRequest) {
  const { siwe, wallet_address } = await request.json() as {
    siwe: {
      message: string;
      signature: string;
      nonce: string;
    };
    wallet_address: string;
  };

  const SIWEObject = new SiweMessage(siwe.message);

  const { data: message, error } = await SIWEObject.verify({
    signature: siwe.signature,
    nonce: siwe.nonce,
  });

  if (error) {
    return Response.json({ error }, { status: 404 });
  }

  let { data: app_user_and_stats, error: error_find } = await supabase
    .from("app_user_and_stats")
    .select("*")
    .eq("wallet_address", wallet_address);

  if (error_find) {
    return Response.json({ error: error_find }, { status: 404 });
  }

  if (!app_user_and_stats || app_user_and_stats.length === 0) {
    const { data, error: error_write } = await createProfile(wallet_address);

    if (error_write) {
      return Response.json({ error: error_write }, { status: 404 });
    }

    app_user_and_stats = data;
  }

  if (!app_user_and_stats || app_user_and_stats.length === 0) {
    return Response.json({ error: "user not found" }, { status: 404 });
  }

  await setSession({
    userId: app_user_and_stats[0].user_id!,
    userWalletAddress: app_user_and_stats[0].wallet_address!,
    siwe: {
      address: message.address,
      nonce: message.nonce,
      issuedAt: message.issuedAt,
      expirationTime: message.expirationTime,
    },
  });
  return Response.json(app_user_and_stats[0]);
}

export async function PUT(request: NextRequest) {
  const res = await request.json();
  return Response.json({ res });
}
