import * as React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { PieChart } from "@mui/x-charts/PieChart";
import { platforms } from "./webUsageStats";


export default function PieColor() {
  return (
    <Stack direction="row" width="100%" textAlign="center" spacing={2}>
      <Box flexGrow={1}>
        <PieChart
          series={[
            {
              data: platforms,
            },
          ]}
          {...pieParams}
        />
      </Box>
    </Stack>
  );
}

const pieParams = {
  height: 200,
  margin: { right: 5 },
  hideLegend: true,
};
