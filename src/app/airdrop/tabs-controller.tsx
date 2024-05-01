import { Tab, TabList, TabPanel, Tabs } from "@mui/joy";
import { Section1 } from "./section-1";
import { Section2 } from "./section-2";
import { Section3 } from "./section-3";
import { Section4 } from "./section-4";
import { Section5 } from "./section-5";
import { Section6 } from "./section-6";

export const TabsController = () => {
  return (
    <Tabs defaultValue={0} sx={{ p: 0, backgroundColor: "transparent" }}>
      <TabList
        sx={{
          justifyContent: "center",
          borderBottom: "1px solid rgba(255, 255, 255, 0.3)",
          mt: 1,
        }}
      >
        <Tab
          variant="plain"
          sx={{
            color: "common.white",
            "&.Mui-selected": { backgroundColor: "transparent" },
            "&:hover": { backgroundColor: "transparent" },
          }}
        >
          My Nominations
        </Tab>
        <Tab
          variant="plain"
          sx={{
            color: "common.white",
            "&.Mui-selected": { backgroundColor: "transparent" },
            "&:hover": { backgroundColor: "transparent" },
          }}
        >
          My Stats
        </Tab>
      </TabList>
      <TabPanel value={0} sx={{ p: 0 }}>
        <Section1 />
        <Section2 />
        {/* hide section 3 for now */}
        {/* <Section3 /> */}
        <Section4 />
      </TabPanel>
      <TabPanel value={1} sx={{ p: 0 }}>
        <Section5 />
        {/* hide section 6 for now */}
        {/* <Section6 /> */}
        <Section4 />
      </TabPanel>
    </Tabs>
  );
};
