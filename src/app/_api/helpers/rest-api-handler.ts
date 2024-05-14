import { NextRequest } from "next/server";
import { ZodError } from "zod";
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "@/shared/utils/error";

type Fn = (request: NextRequest) => Promise<unknown>;

export const restApiHandler = (fn: Fn) => {
  return async (request: NextRequest) => {
    try {
      const data = await fn(request);
      return Response.json(data);
    } catch (error) {
      if (error instanceof ZodError) {
        console.error("ZOD validation error", error);
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
      if (error instanceof NotFoundError) {
        return Response.json({ error: error.message }, { status: 404 });
      }

      console.error("500 error", error);
      return Response.json({ error: "Server Error" }, { status: 500 });
    }
  };
};
