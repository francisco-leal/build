import { openframes } from "frames.js/middleware";
import { createFrames } from "frames.js/next";

export const frames = createFrames({
  basePath: "/frames",
  middleware: [
    openframes({
      clientProtocol: {
        id: "anonymous",
        version: "2024-09-09",
      },
      handler: {
        isValidPayload: (body: JSON) => true,
        getFrameMessage: async (body: JSON) => {
          return { ...body };
        },
      },
    }),
  ],
});
