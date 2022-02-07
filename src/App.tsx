import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, PaletteMode } from '@mui/material';
import { onAuthStateChanged } from 'firebase/auth';

import Header from './Components/Header';
import { authentication } from './firebase';
import { useStoreActions } from './Store/StoreHooks';

export const ColorModeContext = React.createContext({ toggleColorMode: () => { } });

const Home = React.lazy(() => import('./Pages/Home/Home'));
const Auth = React.lazy(() => import('./Pages/Auth/Auth'));
const Profile = React.lazy(() => import('./Pages/Profile/Profile'));
const About = React.lazy(() => import('./Pages/About/About'));

function App() {
  const setUserInstance = useStoreActions(actions => actions.user.setUserInstance);

  React.useEffect(() => {
    const unsubsribe = onAuthStateChanged(authentication, (user) => {
      if (user) {
        console.log('user logged in');
        setUserInstance(user);
      } else {
        console.log('user logged out');
        setUserInstance(null);
      }
    });

    return () => {
      unsubsribe();
    }
  }, [setUserInstance]);

  const [mode, setMode] = React.useState('light' as PaletteMode);
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );

  return (
    <div className="App">
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Header></Header>

          <React.Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<Auth />} />
              <Route path="home" element={<Home />} />
              <Route path="profile" element={<Profile />} />
              <Route path="about" element={<About />} />
            </Routes>
          </React.Suspense>

        </ThemeProvider>
      </ColorModeContext.Provider>
    </div>
  );
}

export default App;
