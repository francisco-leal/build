import { BadRequestError, UnauthorizedError } from "@/shared/utils/error";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

type Fn = (request: NextRequest) => Promise<unknown>;

export const restApiHandler = (fn: Fn) => {
  return async (request: NextRequest) => {
    try {
      const data = await fn(request);
      return Response.json(data);
    } catch (error) {
      if (error instanceof ZodError) {
        console.error(error);
        return Response.json(
          { error: "Invalid request data" },
          { status: 400 },
        );
      }
      if (error instanceof BadRequestError) {
        return Response.json({ error: error.message }, { status: 400 });
      }
      if (error instanceof UnauthorizedError) {
        return Response.json({ error: error.message }, { status: 401 });
      }

      console.error(error);
      return Response.json({ error: "Server Error" }, { status: 500 });
    }
  };
};
