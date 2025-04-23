import React, { useState, useEffect } from "react";
import Typography from "@mui/joy/Typography";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Button from "@mui/joy/Button";
import CheckinList from "./CheckinList/CheckinList";
import Select, { selectClasses } from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import AddLog from "./AddLog/AddLog";
import { useData } from "../../../service/DataContext";

export default function Dashboard() {
  const { logs, fetchLogs } = useData();
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [availableMonths, setAvailableMonths] = useState([]);
  const [openAddLogModal, setopenAddLogModal] = useState(false);

  // Extract months from logs when logs update
  useEffect(() => {
    if (!logs.length) return;
    setFilteredLogs(logs);
  
    const uniqueMonths = Array.from(
      new Set(
        logs.map((item) => {
          const date = new Date(item.date);
          const monthNumber = date.getMonth();
          const monthName = date.toLocaleString("default", { month: "long" });
          return JSON.stringify({ monthNumber, monthName });
        })
      )
    ).map((month) => JSON.parse(month));
  
    uniqueMonths.push({ monthNumber: 0, monthName: "All" });
    setAvailableMonths(uniqueMonths);
  }, [logs]);
  

  const handleMonthFilterChange = (event, selectedMonth) => {
    if (selectedMonth !== 0) {
      const filtered = logs.filter(
        (log) => new Date(log.date).getMonth() === selectedMonth
      );
      setFilteredLogs(filtered);
    } else {
      setFilteredLogs(logs);
    }
  };

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="p-[20px]">
      <Typography level="h3">Dashboard</Typography>
      <div className="flex mt-[6px] justify-between">
        <Typography level="body-xs" variant="plain">{today}</Typography>
        <div>
          <Typography level="title-sm">Filter Month</Typography>
          <Select
            placeholder="Select a month"
            indicator={<i className="bi bi-caret-down"></i>}
            onChange={handleMonthFilterChange}
            sx={{
              width: 240,
              [`& .${selectClasses.indicator}`]: {
                transition: "0.2s",
                [`&.${selectClasses.expanded}`]: {
                  transform: "rotate(-180deg)",
                },
              },
            }}
          >
            {availableMonths.map((month, index) => (
              <Option key={index} value={month.monthNumber}>
                {month.monthName}
              </Option>
            ))}
          </Select>
        </div>
      </div>

      <div className="flex flex-col md:flex-row">
        <div className="mt-5 md:mt-[20px] md:w-1/2">
          <Card size="md" variant="outlined">
            <CardContent>
              <Typography level="title-md">Welcome Back</Typography>
              <Button onClick={() => setopenAddLogModal(true)}>Log Absence</Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-5 md:mt-[20px] md:ml-[20px] md:w-1/2">
          <CheckinList logs={filteredLogs} fetchLogs={fetchLogs} length = {5} />
        </div>
      </div>

      <AddLog
        openAddLogModal={openAddLogModal}
        setopenAddLogModal={setopenAddLogModal}
        logs={filteredLogs}
        fetchLogs={fetchLogs}
      />
    </div>
  );
}
