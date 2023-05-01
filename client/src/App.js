import { ColorModeContext } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";

import Dashboard from "./scenes/dashboard";
import { useMode } from "./theme";
import { useUserAuth } from "./auth";
import { useEffect } from "react";

import SignIn from "./signin";
import SignUp from "./signup";
import EventsList from "./scenes/events";
import CreateEvent from "./scenes/events/CreateNewEvent";
import EntriesList from "./scenes/entries";
import Profile from "./scenes/profile";
import NewEntryList from "./scenes/entries/NewEntryList";

function App() {
  const auth = useUserAuth();

  useEffect(() => {
    console.log("Auth-User useEffect : " + JSON.stringify(auth.user));
  }, [auth.user]);

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
              {auth.user ? (
                <>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/events" element={<EventsList />} />
                  <Route path="/events/new" element={<CreateEvent />} />
                  <Route path="/entries" element={<EntriesList />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/entriesList" element={<NewEntryList />} />
                </>
              ) : (
                <>
                  <Route path="/" element={<SignIn />} />
                  <Route path="/signup" element={<SignUp />} />
                </>
              )}
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
