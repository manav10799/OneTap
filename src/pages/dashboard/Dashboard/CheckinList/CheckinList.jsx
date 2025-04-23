import { Card, List, ListItem, Typography } from "@mui/joy";
import React, { useState } from "react";
import AddLog from "../AddLog/AddLog";

export default function CheckinList({ logs, fetchLogs, length }) {
  const [openAddLogModal, setopenAddLogModal] = useState(false);
  const [selectedLog, setSelectedLog] = useState();

  const handleSelected = function(log) {
    setSelectedLog(log);
    setopenAddLogModal(true);
  }
  return (
    <>
      <Card>
        <Typography level="title-md">{length ? `Last ${length} logs` : 'All Logs'} </Typography>
        <List>
          {logs
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, length || logs.length)
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
                  <AddLog
                    openAddLogModal={openAddLogModal}
                    setopenAddLogModal={setopenAddLogModal}
                    fetchLogs = {fetchLogs}
                    isEditMode={true}
                    currentLog={selectedLog}
                  ></AddLog>
                </div>
              );
            })}
        </List>
      </Card>
    </>
  );
}
