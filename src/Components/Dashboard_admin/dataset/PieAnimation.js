import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import { PieChart } from '@mui/x-charts/PieChart';
import { mobileAndDesktopOS, valueFormatter } from './webUsageStats';

export default function PieAnimation() {
  const [radius, setRadius] = React.useState(50);
  const [itemNb, setItemNb] = React.useState(5);


  const handleItemNbChange = (event, newValue) => {
    if (typeof newValue !== 'number') {
      return;
    }
    setItemNb(newValue);
  };
  const handleRadius = (event, newValue) => {
    if (typeof newValue !== 'number') {
      return;
    }
    setRadius(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <PieChart
        height={300}
        width={300}
        series={[
          {
            data: mobileAndDesktopOS.slice(0, itemNb),
            innerRadius: radius,
            arcLabel: (params) => params.label ?? '',
            arcLabelMinAngle: 20,
            valueFormatter,
          },
        ]}
      />
     
      <Typography id="input-item-number" gutterBottom>
        Number of items
      </Typography>
      <Slider
        value={itemNb}
        onChange={handleItemNbChange}
        valueLabelDisplay="auto"
        min={1}
        max={8}
        aria-labelledby="input-item-number"
      />
      <Typography id="input-radius" gutterBottom>
        Radius
      </Typography>
      <Slider
        value={radius}
        onChange={handleRadius}
        valueLabelDisplay="auto"
        min={15}
        max={100}
        aria-labelledby="input-radius"
      />
    </Box>
  );
}