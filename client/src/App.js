import { ColorModeContext } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
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
import Entries from "./scenes/entries/Entries";
import Reports from "./scenes/reports";
import NewSidebar from "./scenes/global/NewSidebar";
import NewReports from "./scenes/reports/NewReports";
import Navbar from "./scenes/global/Navbar";
import Home from "./scenes/global/Home";
import About from "./scenes/global/About";
import ECardForm from "./scenes/ecard";
import Services from "./scenes/global/Services";
import NewTestimonal from "./scenes/global/Testimonal/Testimonal";
import Footer from "./scenes/global/Footer";
import NewHomePage from "./newdashboard/home";
import NewEvents from "./newdashboard/events";
import NewEventPage from "./newdashboard/events/EventPage";
import NewProfile from "./newdashboard/profile";
import NewEventsList from "./newdashboard/home/NewEventsList";

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
          {auth.user ? <NewSidebar /> : null}

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
                  <Route path="/entriesList" element={<Entries />} />
                  <Route path="/reports" element={<Reports />} />
                  <Route path="/newreports" element={<NewReports />} />
                  <Route path="/newhome" element={<NewHomePage />} />
                  {/* <Route path="/neweventslist" element={<NewEventsList />} /> */}
                  <Route path="/newevent" element={<NewEvents />} />
                  <Route path="/eventpage" element={<NewEventPage />} />
                  <Route path="/newprofile" element={<NewProfile />} />
                </>
              ) : (
                <>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<SignIn />} />
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="/ecard" element={<ECardForm />} />
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
