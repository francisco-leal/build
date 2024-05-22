/* eslint-disable @next/next/no-img-element */

/* eslint-disable jsx-a11y/alt-text */
import fs from "node:fs";
import * as path from "node:path";
import { createImagesWorker } from "frames.js/middleware/images-worker/next";

export const runtime = "nodejs";

const regularFontData = fs.readFileSync(
  path.join(process.cwd(), "public/assets", "BricolageGrotesque-Regular.ttf"),
);

const boldFontData = fs.readFileSync(
  path.join(process.cwd(), "public/assets", "BricolageGrotesque-Bold.ttf"),
);

const imagesWorker = createImagesWorker({
  secret: "MY_VERY_SECRET_SECRET",
  imageOptions: {
    sizes: {
      "1:1": {
        width: 1200,
        height: 1200,
      },
      "1.91:1": {
        width: 955,
        height: 500,
      },
    },
    fonts: [
      {
        data: regularFontData,
        name: "Bricolage-Regular",
      },
      {
        data: boldFontData,
        name: "Bricolage-Bold",
      },
    ],
  },
});

export const GET = imagesWorker();
