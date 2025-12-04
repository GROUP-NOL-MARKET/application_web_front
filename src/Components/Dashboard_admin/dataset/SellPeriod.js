import React from "react";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";

const SellPeriod = ({ text, setDateRange }) => {
  const [value, setValue] = React.useState([null, null]);

  const handleChange = (newValue) => {
    setValue(newValue);

    // 🔥 On transmet directement au parent Transactions
    if (newValue[0] && newValue[1]) {
      setDateRange(newValue);
    }
  };

  return (
    <div className="d-flex flex-column">
      <h3 className="taux_moyen mb-0 pb-0">{text}</h3>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DateRangePicker"]}>
          <DemoItem component="DateRangePicker">
            <DateRangePicker
              value={value}
              onChange={handleChange}
              slotProps={{ textField: { size: "small" } }}
            />
          </DemoItem>
        </DemoContainer>
      </LocalizationProvider>
    </div>
  );
};

export default SellPeriod;
