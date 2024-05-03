"use client";
import { Tab, TabList, TabPanel, Tabs, tabClasses } from "@mui/joy";
import { Header } from "@/shared/components/header";
import { Footer } from "@/shared/components/footer";
import { Stack } from "@mui/joy";

export default function AirdropPageLayout({
  myStats,
  nominations,
}: {
  myStats: React.ReactNode;
  nominations: React.ReactNode;
}) {
  return (
    <>
      <Header />

      <Tabs
        component={"main"}
        defaultValue={0}
        sx={{
          p: 0,
          mt: 1,
          backgroundColor: "transparent",
          "--Tab-indicatorThickness": "1px",

          [`& .${tabClasses.root}`]: {
            color: "common.white",
            backgroundColor: "transparent",
            "&::after": {
              color: "common.white",
            },
          },
          [`& .${tabClasses.selected}`]: {
            color: "primary.700",
          },
          [`& .${tabClasses.root}:hover`]: {
            backgroundColor: "transparent !important",
            color: "primary.700",
          },
        }}
      >
        <TabList sx={{ justifyContent: "center" }}>
          <Tab variant="plain">My Nominations</Tab>
          <Tab variant="plain">My Stats</Tab>
        </TabList>
        <TabPanel value={0} sx={{ p: 0 }}>
          {nominations}
        </TabPanel>
        <TabPanel value={1} sx={{ p: 0 }}>
          {myStats}
        </TabPanel>
      </Tabs>

      <Footer />
    </>
  );
}
