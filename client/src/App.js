import { ColorModeContext } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route, Navigate } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import SignIn from "./login/index";

import Reports from "./scenes/reports";
import { useMode } from "./theme";
import { useUserAuth } from "./auth";

import "./login/index";

function App() {
  const auth = useUserAuth();
  console.log("Auth: " + JSON.stringify(auth));
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <div className="app">
          {/* {auth.isLoggedIn === true ? <Sidebar /> : null} */}
          <Sidebar />
          <main className="content">
            {/* {auth.isLoggedIn === true ? <Topbar /> : null} */}
            <Topbar />
            <Routes>
              {/* {auth.isLoggedIn === true ? ( */}
              <>
                <Route path="/" element={<SignIn />} />
                {/* <Route path="signup" element={<NewSignUp />} /> */}
              </>
              {/* ) : (
                <Route path="/" element={<Login />} />
              )} */}
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
