import { Typography, Stack, Sheet, Table } from "@mui/joy";
import { HeroSectionWithOverflow } from "@/shared/components/hero-section-with-overflow";

const grantsData = [
  {
    id: "1",
    description: "Waiting for proposals",
    status: "Vesting",
    supplyPercentage: 0,
  },
];

export const Section3 = () => {
  return (
    <HeroSectionWithOverflow>
      <Typography level="h2" className="no-overflow" textColor={"common.white"}>
        Ecosystem
      </Typography>

      <Typography
        className="no-overflow"
        level="title-lg"
        sx={{ color: "common.white" }}
      >
        2% of the funds have been distributed.
      </Typography>

      <Stack className="overflow">
        <Sheet variant="outlined">
          <Table>
            <thead>
              <tr>
                <th>Description</th>
                <th>Status</th>
                <th>Supply %</th>
              </tr>
            </thead>
            <tbody>
              {grantsData.map((item) => (
                <tr key={item.id}>
                  <td>{item.description}</td>
                  <td>{item.status}</td>
                  <td>{item.supplyPercentage.toFixed(2)}%</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Sheet>
      </Stack>
    </HeroSectionWithOverflow>
  );
};
