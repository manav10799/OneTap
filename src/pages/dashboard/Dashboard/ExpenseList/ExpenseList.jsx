import { Card, List, ListItem, Typography } from "@mui/joy";
import React, { useState } from "react";
import AddExpenseModal from "../AddExpense/AddExpense";

export default function ExpenseList({ logs, fetchLogs }) {
  const [openAddExpenseModal, setopenAddExpenseModal] = useState(false);
  const [selectedLog, setSelectedLog] = useState();

  const handleSelected = function(log) {
    setSelectedLog(log);
    setopenAddExpenseModal(true);
  }
  return (
    <>
      <Card>
        <Typography level="title-md">Last 5 logs</Typography>
        <List>
          {logs
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .map((log) => {
              return (
                <div key={log._id}>
                  <ListItem>
                    <Typography>
                      <Typography fontWeight="md">{log.status}</Typography>
                      <i
                        className="bi bi-feather cursor-pointer ml-2"
                        onClick={() => handleSelected(log)}
                      ></i>
                    </Typography>
                  </ListItem>
                  <AddExpenseModal
                    openAddExpenseModal={openAddExpenseModal}
                    setopenAddExpenseModal={setopenAddExpenseModal}
                    fetchLogs = {fetchLogs}
                    isEditMode={true}
                    currentLog={selectedLog}
                  ></AddExpenseModal>
                </div>
              );
            })}
        </List>
      </Card>
    </>
  );
}
