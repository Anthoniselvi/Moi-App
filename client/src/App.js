import { ColorModeContext } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route, Navigate } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Reports from "./scenes/reports";
import Dashboard from "./scenes/dashboard";
import { useMode } from "./theme";
import { useUserAuth } from "./auth";

import SignIn from "./signin";
import SignUp from "./signup";
import EventsList from "./scenes/events";

function App() {
  const auth = useUserAuth();
  console.log("Auth-User: " + JSON.stringify(auth.user));
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <div className="app">
          {auth.user ? <Sidebar /> : null}

          <main className="content">
            {auth.user ? <Topbar /> : null}

            <Routes>
              {/* {auth.user ? (
                <>
                  <Route
                    path="/"
                    element={!auth.user ? <SignIn /> : <Dashboard />}
                  />

                  <Route
                    path="/signup"
                    element={!auth.user ? <SignUp /> : <Dashboard />}
                  />
                </>
              ) : ( */}
              <Route path="/" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/events" element={<EventsList />} />
              {/* )} */}
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
