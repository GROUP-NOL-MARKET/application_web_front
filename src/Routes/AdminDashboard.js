import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "../Components/Dashboard_admin/scenes/global/Topbar";
import Sidebar1 from "../Components/Dashboard_admin/scenes/global/Sidebar1";
import Dashboard from "../Components/Dashboard_admin/scenes/dashboard";
import Team from "../Components/Dashboard_admin/scenes/team";
import Invoices from "../Components/Dashboard_admin/scenes/invoices";
import Contacts from "../Components/Dashboard_admin/scenes/contacts";
import Bar from "../Components/Dashboard_admin/scenes/bar";
import Form from "../Components/Dashboard_admin/scenes/form";
import Line from "../Components/Dashboard_admin/scenes/line";
import Pie from "../Components/Dashboard_admin/scenes/pie";
import FAQ from "../Components/Dashboard_admin/scenes/faq";
import Geography from "../Components/Dashboard_admin/scenes/geography";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "../theme";
import Calendar from "../Components/Dashboard_admin/scenes/calendar/calendar";
import "../Styles/Sidebar.css"

function AdminDashboard() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar1 isSidebar={isSidebar} className="sidebar"/>
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/team" element={<Team />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/form" element={<Form />} />
              <Route path="/bar" element={<Bar />} />
              <Route path="/pie" element={<Pie />} />
              <Route path="/line" element={<Line />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/geography" element={<Geography />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default AdminDashboard;
