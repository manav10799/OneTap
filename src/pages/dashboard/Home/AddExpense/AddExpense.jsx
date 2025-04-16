import React from "react";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import Button from "@mui/joy/Button";
import Box from "@mui/joy/Box";
import ToggleButtonGroup from '@mui/joy/ToggleButtonGroup';
import axios from "axios";

export default function AddExpenseModal({
  openAddExpenseModal,
  setopenAddExpenseModal,
  logs,
  fetchLogs,
  isEditMode,
  currentLog
}) {
  const [timeOffValue, setTimeOffValue] = React.useState("M");
  const apiUrl = "https://backend-five-bay-57.vercel.app/logs";

  const addLog = async () => {
    const now = new Date();
    const formattedDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const timeLabel = timeOffValue === "F" ? "Full Day" : (timeOffValue === "M" ? "Morning": "Evening"); 
    const existingIndex = logs.findIndex(
      (log) => new Date(log.date).getTime() === formattedDate.getTime()
    );

    if (existingIndex !== -1) {
      const existingLog = logs[existingIndex];
      if (!existingLog.status.includes(timeLabel)) {
        const updatedStatus = `${existingLog.status} and in ${timeLabel}`;
        try {
          await axios.put(`${apiUrl}/${existingLog._id}`, { status: updatedStatus });
          setopenAddExpenseModal(false);
          fetchLogs();
        } catch (error) {
          console.error("Error updating log:", error);
        }
      } else {
        alert(`Cook has already been logged for ${timeLabel} today!`);
      }
    } else {
      const newStatus = `Cook did not check-in on ${formattedDate.toLocaleDateString("en-US")} in ${timeLabel}`;
      try {
        await axios.post(apiUrl, { status: newStatus, date: formattedDate, timeoff:timeOffValue  });
        fetchLogs();
        setopenAddExpenseModal(false);
      } catch (error) {
        console.error("Error creating log:", error);
      }
    }
  };

  const confirmChange = async (currentLog) => {
    if (!currentLog?._id) return;
    try {
      await axios.delete(`${apiUrl}/${currentLog._id}`);
      await fetchLogs();
      setopenAddExpenseModal(false);
    } catch (error) {
      console.error("Error deleting log:", error);
    }
  };

  return (
    <>
      <Modal
        layout="center"
        size="md"
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
        open={openAddExpenseModal}
        onClose={() => setopenAddExpenseModal(false)}
      >
        <Sheet
          variant="outlined"
          sx={{ maxWidth: 500, borderRadius: "md", p: 3, boxShadow: "lg" }}
        >
          <Typography id="modal-title" className="pr-4">{!isEditMode? "Add logs" : "Advance Edit"}</Typography>
          <ModalClose />
          {
            !isEditMode ? <div>
            <Box
              sx={{ display: "flex", gap: 2, flexWrap: "wrap", marginTop: 2 }}
            >
              <ToggleButtonGroup
                spacing={2}
                value={timeOffValue}
                onChange={(event, newValue) => {
                  setTimeOffValue(newValue);
                }}
              >
                <Button value="M">Morning</Button>
                <Button value="E">Evening</Button>
                <Button value="F">Full Day</Button>
              </ToggleButtonGroup>
            </Box>
            <div className="flex justify-end mt-4">
              <Button variant="solid" onClick={addLog}>Add Log</Button>
            </div>
          </div>
          : 
          <div className="p-4">
            <Button variant="outlined" onClick={() => confirmChange(currentLog)}>Delete</Button>
          </div>
          }
        </Sheet>
      </Modal>
    </>
  );
}
