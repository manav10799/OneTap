import React from "react";
import CheckinList from "../Dashboard/CheckinList/CheckinList";
import { useData } from "../../../service/DataContext";

export default function RecentActivity() {

    const { logs, fetchLogs } = useData();

    return(
        <div className="p-[20px]">
            <CheckinList logs={logs} fetchLogs={fetchLogs}></CheckinList>
        </div>
    )
}