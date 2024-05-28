import { NextRequest } from "next/server";
import { ZodError } from "zod";
import { rollbarError, rollbarWarn } from "@/services/rollbar";
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "@/shared/utils/error";

type Params = Record<string, string>;
type Fn = (request: NextRequest, params?: Params) => Promise<unknown>;

export const restApiHandler = (fn: Fn) => {
  return async (request: NextRequest, context: { params: Params }) => {
    try {
      const data = await fn(request, context.params ?? {});
      return Response.json(data);
    } catch (error) {
      if (error instanceof ZodError) {
        rollbarWarn("ZOD validation error", error);
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

      rollbarError("500 error", error as Error);
      return Response.json({ error: "Server Error" }, { status: 500 });
    }
  };
};
