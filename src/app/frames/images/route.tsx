/* eslint-disable @next/next/no-img-element */

/* eslint-disable jsx-a11y/alt-text */
import * as path from "node:path";
import { createImagesWorker } from "frames.js/middleware/images-worker/next";
import * as fs from "fs";
import satori from "satori";
import sharp from "sharp";

export const runtime = "nodejs";

const imagesWorker = createImagesWorker({
  secret: "MY_VERY_SECRET_SECRET",
  imageOptions: {
    sizes: {
      "1:1": {
        width: 1200,
        height: 1200,
      },
      "1.91:1": {
        width: 1200,
        height: 628,
      },
    },
  },
});

const frameLanding = fs.readFileSync(
  path.join(
    path.resolve(process.cwd(), "public", "images"),
    "frame-landing.png",
  ),
);

const frameDice = fs.readFileSync(
  path.join(path.resolve(process.cwd(), "public", "images"), "frame-dice.png"),
);

const frameDefaultUser = fs.readFileSync(
  path.join(
    path.resolve(process.cwd(), "public", "images"),
    "frame-default-user.png",
  ),
);

const regularFontPath = path.join(
  process.cwd(),
  "public/assets",
  "BricolageGrotesque-Regular.ttf",
);
const regularFontData = fs.readFileSync(regularFontPath);

const boldFontPath = path.join(
  process.cwd(),
  "public/assets",
  "BricolageGrotesque-Bold.ttf",
);
const boldFontData = fs.readFileSync(boldFontPath);

export const GET = imagesWorker(async (jsx) => {
  let pngBuffer;
  const page = jsx.props.children[0].props.children;
  if (page === "landing") {
    // landing frame
    pngBuffer = await sharp(frameLanding).toBuffer();
  } else if (page === "budget") {
    // budget frame
    const imgUrl = jsx.props.children[1].props.children;
    const username = jsx.props.children[2].props.children;
    const points = jsx.props.children[3].props.children;

    const svg = await satori(
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#0042F5",
          color: "#FFFFFF",
          justifyContent: "space-between",
          padding: "45px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <img
            src={imgUrl}
            alt="profile image"
            width={"72px"}
            height={"72px"}
            style={{ borderRadius: "100%", marginRight: "20px" }}
          />
          <p
            style={{
              fontSize: "60px",
              fontWeight: 600,
              fontFamily: "Bricolage-Bold",
            }}
          >
            {username}
          </p>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            marginTop: "-100px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              padding: "0px 20px",
              backgroundColor: "#fff",
              color: "#0042F5",
              width: "auto",
              border: "4px solid #000",
              borderBottom: "15px solid #000",
              borderRight: "15px solid #000",
            }}
          >
            <p
              style={{
                fontWeight: "700",
                fontFamily: "Bricolage-Bold",
                fontSize: "48px",
              }}
            >
              Daily Points budget
            </p>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              padding: "0px 20px",
              color: "#fff",
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#0042F5",
            }}
          >
            <img
              src={`data:image/png;base64,${frameDice.toString("base64")}`}
              height={"136px"}
              width={"132px"}
            />
            <p
              style={{
                fontWeight: "700",
                fontFamily: "Bricolage-Bold",
                fontSize: "188px",
                marginLeft: "50px",
              }}
            >
              {points}
            </p>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              padding: "0px 20px",
              width: "auto",
              color: "#fff",
            }}
          >
            <p
              style={{
                fontWeight: "600",
                fontFamily: "Bricolage-Bold",
                fontSize: "48px",
              }}
            >
              Increase budget 10x with Builder Score.
            </p>
          </div>
        </div>
      </div>,
      {
        width: 1080,
        height: 1080,
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
    );
    pngBuffer = await sharp(Buffer.from(svg)).toFormat("png").toBuffer();
  } else if (page === "nominate-builder-found") {
    // nominate builder
    let userImgUrl = "";
    let userUsername = "";
    if (
      !!jsx.props.children[1].props.children &&
      jsx.props.children[1].props.children.length > 0
    ) {
      userImgUrl = jsx.props.children[1].props.children;
    }
    if (
      !!jsx.props.children[2].props.children &&
      jsx.props.children[2].props.children.length > 0
    ) {
      userUsername = jsx.props.children[2].props.children;
    }
    const nominatedImgUrl = jsx.props.children[3].props.children;
    const nominatedUsername = jsx.props.children[4].props.children;
    const budget = jsx.props.children[5].props.children;
    const pointsSent = jsx.props.children[6].props.children;
    const pointsEarned = jsx.props.children[7].props.children;
    const dailyNominations = jsx.props.children[8].props.children;
    let nominationsErrorMsg = "";
    if (jsx.props.children.length === 10) {
      nominationsErrorMsg = jsx.props.children[9].props.children;
    }
    const marginTop = budget !== -1 ? "60px" : "200px";

    const svg = await satori(
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#0042F5",
          justifyContent: "flex-start",
          color: "#FFFFFF",
          padding: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {!!userImgUrl ? (
            <img
              src={userImgUrl}
              alt="profile image"
              width={"120px"}
              height={"120px"}
              style={{ borderRadius: "100%", marginRight: "20px" }}
            />
          ) : (
            <img
              src={`data:image/png;base64,${frameDefaultUser.toString("base64")}`}
              height={"120px"}
              width={"120px"}
            />
          )}
          <p
            style={{
              fontSize: "52px",
              fontWeight: 600,
              fontFamily: "Bricolage-Bold",
            }}
          >
            {userUsername}
          </p>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginTop: marginTop,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              padding: "0px 20px",
              backgroundColor: "#fff",
              color: "#0042F5",
              width: "auto",
              border: "4px solid #000",
              borderBottom: "15px solid #000",
              borderRight: "15px solid #000",
            }}
          >
            <p
              style={{
                fontWeight: "700",
                fontFamily: "Bricolage-Bold",
                fontSize: "48px",
              }}
            >
              Nominate
            </p>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              padding: "20px",
              width: "auto",
              color: "#fff",
            }}
          >
            <img
              src={nominatedImgUrl}
              alt="profile image"
              width={"120px"}
              height={"120px"}
              style={{ borderRadius: "100%", marginRight: "20px" }}
            />
            <p
              style={{
                fontWeight: "700",
                fontFamily: "Bricolage-Bold",
                fontSize: "78px",
              }}
            >
              {nominatedUsername}
            </p>
          </div>
          {budget !== -1 && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  padding: "0px 20px",
                  justifyContent: "space-between",
                  width: "100%",
                  borderTop: "3px solid #fff",
                }}
              >
                <p
                  style={{
                    fontWeight: "600",
                    fontFamily: "Bricolage-Bold",
                    fontSize: "48px",
                  }}
                >
                  My Daily Budget
                </p>
                <p
                  style={{
                    fontWeight: "600",
                    fontFamily: "Bricolage-Bold",
                    fontSize: "48px",
                  }}
                >
                  {budget !== -1 ? budget : "N/A"}
                </p>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  padding: "0px 20px",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <p
                  style={{
                    fontWeight: "600",
                    fontFamily: "Bricolage-Bold",
                    fontSize: "48px",
                  }}
                >
                  BUILD Points Sent
                </p>
                <p
                  style={{
                    fontWeight: "600",
                    fontFamily: "Bricolage-Bold",
                    fontSize: "48px",
                  }}
                >
                  {budget !== -1 ? pointsSent : "N/A"}
                </p>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  padding: "0px 20px",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <p
                  style={{
                    fontWeight: "600",
                    fontFamily: "Bricolage-Bold",
                    fontSize: "48px",
                  }}
                >
                  BUILD Points Earned
                </p>
                <p
                  style={{
                    fontWeight: "600",
                    fontFamily: "Bricolage-Bold",
                    fontSize: "48px",
                  }}
                >
                  {budget !== -1 ? pointsEarned : "N/A"}
                </p>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  padding: "0px 20px",
                  justifyContent: "space-between",
                  width: "100%",
                  borderTop: "3px solid #fff",
                }}
              >
                <p
                  style={{
                    fontWeight: "600",
                    fontFamily: "Bricolage-Bold",
                    fontSize: "48px",
                  }}
                >
                  Daily Nominations
                </p>
                <p
                  style={{
                    fontWeight: "600",
                    fontFamily: "Bricolage-Bold",
                    fontSize: "48px",
                  }}
                >
                  {budget !== -1 ? dailyNominations : "N/A"}
                </p>
              </div>
            </div>
          )}
          {nominationsErrorMsg && (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                padding: "0px 20px",
                backgroundColor: "#fff",
                color: "#0042F5",
                width: "auto",
                border: "4px solid #000",
                borderBottom: "15px solid #000",
                borderRight: "15px solid #000",
              }}
            >
              <p
                style={{
                  fontWeight: "700",
                  fontFamily: "Bricolage-Bold",
                  fontSize: "48px",
                }}
              >
                {nominationsErrorMsg}
              </p>
            </div>
          )}
        </div>
      </div>,
      {
        width: 1080,
        height: 1080,
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
    );
    pngBuffer = await sharp(Buffer.from(svg)).toFormat("png").toBuffer();
  } else if (page === "nominate-builder") {
    // search person to nominate
    let imgUrl = "";
    let username = "";
    if (jsx.props.children.length > 2) {
      if (
        !!jsx.props.children[1].props.children &&
        jsx.props.children[1].props.children.length > 0
      ) {
        imgUrl = jsx.props.children[1].props.children;
      }
      if (
        !!jsx.props.children[2].props.children &&
        jsx.props.children[2].props.children.length > 0
      ) {
        username = jsx.props.children[2].props.children;
      }
    }

    const svg = await satori(
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#0042F5",
          color: "#FFFFFF",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            padding: "0px 20px",
            width: "auto",
            color: "#fff",
            marginBottom: "50px",
          }}
        >
          {!!imgUrl ? (
            <img
              src={imgUrl}
              alt="profile image"
              width={"120px"}
              height={"120px"}
              style={{ borderRadius: "100%", marginRight: "20px" }}
            />
          ) : (
            <img
              src={`data:image/png;base64,${frameDefaultUser.toString("base64")}`}
              height={"120px"}
              width={"120px"}
            />
          )}
          <p
            style={{
              fontSize: "60px",
              fontWeight: 600,
              fontFamily: "Bricolage-Bold",
            }}
          >
            {!!username ? username : ""}
          </p>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            padding: "0px 20px",
            backgroundColor: "#fff",
            color: "#0042F5",
            width: "auto",
            border: "4px solid #000",
            borderBottom: "15px solid #000",
            borderRight: "15px solid #000",
          }}
        >
          <p
            style={{
              fontWeight: "700",
              fontFamily: "Bricolage-Bold",
              fontSize: "48px",
            }}
          >
            Search for builders👇
          </p>
        </div>
      </div>,
      {
        width: 1080,
        height: 1080,
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
    );
    pngBuffer = await sharp(Buffer.from(svg)).toFormat("png").toBuffer();
  } else if (page === "nominate-builder-not-found") {
    // not found person to nominate
    const username = jsx.props.children[1].props.children;

    const svg = await satori(
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#0042F5",
          color: "#FFFFFF",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            padding: "0px 20px",
            width: "auto",
            color: "#fff",
          }}
        >
          <p
            style={{
              fontWeight: "700",
              fontFamily: "Bricolage-Bold",
              fontSize: "78px",
            }}
          >
            {username}
          </p>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            padding: "0px 20px",
            backgroundColor: "#fff",
            color: "#0042F5",
            width: "auto",
            border: "4px solid #000",
            borderBottom: "15px solid #000",
            borderRight: "15px solid #000",
          }}
        >
          <p
            style={{
              fontWeight: "700",
              fontFamily: "Bricolage-Bold",
              fontSize: "48px",
            }}
          >
            Try again
          </p>
        </div>
      </div>,
      {
        width: 1080,
        height: 1080,
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
    );
    pngBuffer = await sharp(Buffer.from(svg)).toFormat("png").toBuffer();
  } else if (page === "builder-nominatation-completed") {
    // confirm nomination
    const imgUrl = jsx.props.children[1].props.children;
    const username = jsx.props.children[2].props.children;

    const svg = await satori(
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#0042F5",
          color: "#FFFFFF",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            padding: "0px 20px",
            width: "auto",
            color: "#fff",
            marginBottom: "50px",
          }}
        >
          <img
            src={imgUrl}
            alt="profile image"
            width={"120px"}
            height={"120px"}
            style={{ borderRadius: "100%", marginRight: "20px" }}
          />
          <p
            style={{
              fontWeight: "700",
              fontFamily: "Bricolage-Bold",
              fontSize: "78px",
            }}
          >
            {username}
          </p>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            padding: "0px 20px",
            backgroundColor: "#fff",
            color: "#0042F5",
            width: "auto",
            border: "4px solid #000",
            borderBottom: "15px solid #000",
            borderRight: "15px solid #000",
          }}
        >
          <p
            style={{
              fontWeight: "700",
              fontFamily: "Bricolage-Bold",
              fontSize: "48px",
            }}
          >
            Builder Nominated
          </p>
        </div>
      </div>,
      {
        width: 1080,
        height: 1080,
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
    );
    pngBuffer = await sharp(Buffer.from(svg)).toFormat("png").toBuffer();
  } else if (page === "builder-nomination-error") {
    // builder nomination error
    const username = jsx.props.children[1].props.children;
    const errorMsg = jsx.props.children[2].props.children;
    let imgUrl = "";
    if (jsx.props.children.length > 3) {
      imgUrl = jsx.props.children[3].props.children;
    }

    const svg = await satori(
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#0042F5",
          color: "#FFFFFF",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            padding: "0px 20px",
            width: "auto",
            color: "#fff",
            marginBottom: "50px",
          }}
        >
          {imgUrl ? (
            <img
              src={imgUrl}
              alt="profile image"
              width={"120px"}
              height={"120px"}
              style={{ borderRadius: "100%", marginRight: "20px" }}
            />
          ) : null}
          <p
            style={{
              fontWeight: "700",
              fontFamily: "Bricolage-Bold",
              fontSize: "78px",
            }}
          >
            {username
              ? username.length > 15
                ? `${username.slice(0, 15)}...`
                : username
              : ""}
          </p>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            padding: "0px 20px",
            backgroundColor: "#fff",
            color: "#0042F5",
            width: "auto",
            border: "4px solid #000",
            borderBottom: "15px solid #000",
            borderRight: "15px solid #000",
          }}
        >
          <p
            style={{
              fontWeight: "700",
              fontFamily: "Bricolage-Bold",
              fontSize: "48px",
            }}
          >
            Builder Nomination Error
          </p>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            padding: "0px 20px",
            width: "auto",
            color: "#fff",
            marginBottom: "50px",
            justifyItems: "center",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontWeight: "700",
              fontFamily: "Bricolage-Bold",
              fontSize: "78px",
            }}
          >
            {errorMsg}
          </p>
        </div>
      </div>,
      {
        width: 1080,
        height: 1080,
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
    );
    pngBuffer = await sharp(Buffer.from(svg)).toFormat("png").toBuffer();
  } else if (page === "builder-daily-nominations") {
    const currentUsername = jsx.props.children[1].props.children;
    const currentImgUrl = jsx.props.children[2].props.children;
    const firstUsername = jsx.props.children[3].props.children;
    const firstImgUrl = jsx.props.children[4].props.children;
    const secondUsername = jsx.props.children[5].props.children;
    const secondImgUrl = jsx.props.children[6].props.children;
    const thirdUsername = jsx.props.children[7].props.children;
    const thirdImgUrl = jsx.props.children[8].props.children;

    const svg = await satori(
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#0042F5",
          color: "#FFFFFF",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            padding: "0px 20px",
            width: "auto",
            color: "#fff",
            marginBottom: "50px",
          }}
        >
          <img
            src={currentImgUrl}
            alt="profile image"
            width={"120px"}
            height={"120px"}
            style={{ borderRadius: "100%", marginRight: "20px" }}
          />
          <p
            style={{
              fontWeight: "700",
              fontFamily: "Bricolage-Bold",
              fontSize: "78px",
            }}
          >
            {currentUsername}
          </p>
        </div>
      </div>,
      {
        width: 1080,
        height: 1080,
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
    );
    pngBuffer = await sharp(Buffer.from(svg)).toFormat("png").toBuffer();
  }

  return new Response(pngBuffer, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "max-age=0",
    },
  });
});
