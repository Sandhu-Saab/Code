import React from 'react'
import Sidebar2 from "../../../layouts/Sidebar2";
import { Box } from "@mui/material";
import ChangeDataGrid from "../../../components/Change/ChangeDataGrid";

// Page for Request List

function RequestList() {
  document.title = "All Change Request " + "- PiXELL-River";

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <Sidebar2 content={<ChangeDataGrid />} />
        {/* <Sidebar2 content={<RequestDataGrid />} /> */}
      </Box>
    </div>
  )
}

export default RequestList