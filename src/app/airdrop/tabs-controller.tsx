import { Tab, TabList, TabPanel, Tabs } from '@mui/joy';
import { Section1 } from './section-1';
import { Section2 } from './section-2';
import { Section3 } from './section-3';
import { Section4 } from './section-4';
import { Section5 } from './section-5';

export const TabsController = () => {
    return (
        <Tabs aria-label="Basic tabs" defaultValue={0} sx={{ pt: 1, backgroundColor: "transparent" }}>
            <TabList sx={{ justifyContent: "center", borderBottom: '1px solid rgba(255, 255, 255, 0.3)' }}>
                <Tab sx={{ color: 'common.white' }}>My Nominations</Tab>
                <Tab sx={{ color: 'common.white' }}>My Stats</Tab>
            </TabList>
            <TabPanel value={0}>
                {/* <Section1 />
                <Section2 />
                <Section3 />
                <Section4 /> */}
                <Section5 />
            </TabPanel>
            <TabPanel value={1}>
            </TabPanel>
        </Tabs>
    );
}