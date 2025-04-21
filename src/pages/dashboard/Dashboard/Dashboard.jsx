import React, { useState, useEffect, useContext, useCallback } from "react";
import Typography from "@mui/joy/Typography";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Button from "@mui/joy/Button";
import ExpenseList from "./ExpenseList/ExpenseList";
import UserContext from "../../../service/UserContext";
import Select, { selectClasses } from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import AddExpenseModal from "./AddExpense/AddExpense";

export default function Dashboard() {
  const [logs, setLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [availableMonths, setAvailableMonths] = useState([]);
  const loggedInUser = useContext(UserContext);
  const apiUrl = import.meta.env.VITE_BACKEND_URL + "/logs";
  const [openAddExpenseModal, setopenAddExpenseModal] = useState(false);

  const fetchLogs = useCallback(async () => {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setLogs(data);
      setFilteredLogs(data);

      const uniqueMonths = Array.from(
        new Set(
          data.map((item) => {
            const date = new Date(item.date);
            const monthNumber = date.getMonth();
            const monthName = date.toLocaleString("default", { month: "long" });
            return JSON.stringify({ monthNumber, monthName });
          })
        )
      ).map((month) => JSON.parse(month));

      uniqueMonths.push({ monthNumber: 0, monthName: "All" });
      setAvailableMonths(uniqueMonths);
    } catch (error) {
      console.error("Error fetching logs:", error);
    }
  }, []);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

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
              <Typography level="title-md">
                Welcome Back
              </Typography>
              {/* <Button onClick={addLog}>Log Absence</Button> */}
              <Button onClick={() => setopenAddExpenseModal(true)}>Log Absence</Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-5 md:mt-[20px] md:ml-[20px] md:w-1/2">
          <ExpenseList logs={filteredLogs} fetchLogs = {fetchLogs} />
        </div>
      </div>
      <AddExpenseModal
        openAddExpenseModal={openAddExpenseModal}
        setopenAddExpenseModal={setopenAddExpenseModal}
        logs={filteredLogs}
        fetchLogs = {fetchLogs}
      ></AddExpenseModal>
    </div>
  );
}
