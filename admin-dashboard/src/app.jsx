// import { useRoutes } from 'react-router-dom';
// import { CssBaseline, ThemeProvider } from '@mui/material';
// import { routes } from './routes';
// import { createTheme } from './theme';
// import 'simplebar-react/dist/simplebar.min.css';

// export const App = () => {
//   const element = useRoutes(routes);
//   const theme = createTheme({
//     colorPreset: 'green',
//     contrast: 'high'
//   });

//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       {element}
//     </ThemeProvider>
//   );
// };
import { useRoutes } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme as muiCreateTheme } from '@mui/material';
import { routes } from './routes';
import 'simplebar-react/dist/simplebar.min.css';
import { color } from 'framer-motion';

// ─── BLACK + GOLD MUI THEME ──────────────────────────────────────
const GOLD = "#C9A84C";
const GOLD_LIGHT = "#E8D5A3";
const GOLD_DARK = "#9A7B2E";
const BLACK = "#0A0A0A";
const BLACK_CARD = "#111111";
const BLACK_INPUT = "#1A1A1A";

const premiumTheme = muiCreateTheme({
  palette: {
    mode: 'dark',
    background: {
      default: BLACK,
      paper: BLACK_CARD,
    },
    primary: {
      main: GOLD,
      light: GOLD_LIGHT,
      dark: GOLD_DARK,
      contrastText: BLACK,
    },
    secondary: {
      main: GOLD_LIGHT,
      contrastText: BLACK,
    },
    text: {
      primary: '#ffffff',
      secondary: '#B0B0B0',
    },
    error: {
      main: '#FF6B6B',
    },
    divider: 'rgba(201,168,76,0.12)',
  },
  typography: {
    fontFamily: "'Poppins', 'Segoe UI', sans-serif",
    h1: { fontFamily: "'Playfair Display', serif", fontStyle: 'italic' },
    h2: { fontFamily: "'Playfair Display', serif", fontStyle: 'italic' },
    h3: { fontFamily: "'Playfair Display', serif", fontStyle: 'italic' },
    h4: { fontFamily: "'Playfair Display', serif", fontStyle: 'italic' },
    h5: { fontFamily: "'Playfair Display', serif", fontStyle: 'italic' },
    h6: { fontFamily: "'Playfair Display', serif", fontStyle: 'italic' },
    button: {
      textTransform: 'uppercase',
      letterSpacing: '1.5px',
      fontWeight: 700,
    },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&family=Poppins:wght@300;400;500;600;700;800;900&display=swap');

        body {
          background: ${BLACK};
          color: #ffffff;
        }

        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        ::-webkit-scrollbar-track {
          background: ${BLACK};
        }
        ::-webkit-scrollbar-thumb {
          background: rgba(201,168,76,0.2);
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(201,168,76,0.4);
        }

        ::selection {
          background: rgba(201,168,76,0.3);
          color: #fff;
        }
      `,
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: 'uppercase',
          letterSpacing: '1.5px',
          fontWeight: 700,
        },
        contained: {
          background: `linear-gradient(135deg, ${GOLD_LIGHT}, ${GOLD})`,
          color: BLACK,
          boxShadow: '0 4px 20px rgba(201,168,76,0.2)',
          '&:hover': {
            background: `linear-gradient(135deg, ${GOLD}, ${GOLD_DARK})`,
            boxShadow: '0 8px 30px rgba(201,168,76,0.35)',
            transform: 'translateY(-2px)',
          },
        },
        outlined: {
          borderColor: 'rgba(201,168,76,0.3)',
          color: GOLD,
          '&:hover': {
            borderColor: GOLD,
            background: 'rgba(201,168,76,0.1)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          background: 'rgba(17,17,17,0.85)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(201,168,76,0.12)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.03)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            background: BLACK_INPUT,
            color: '#fff',
            '& fieldset': {
              borderColor: 'rgba(255,255,255,0.08)',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(201,168,76,0.4)',
            },
            '&.Mui-focused fieldset': {
              borderColor: GOLD,
              borderWidth: '2px',
              boxShadow: '0 0 20px rgba(201,168,76,0.1)',
            },
          },
          '& .MuiInputLabel-root': {
            // color: GRAY_TEXT,
            color : '#B0B0B0',
            '&.Mui-focused': {
              color: GOLD,
            },
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: '1px solid rgba(255,255,255,0.03)',
          color: '#B0B0B0',
        },
        head: {
          color: GOLD,
          fontWeight: 800,
          letterSpacing: '2px',
          textTransform: 'uppercase',
          fontSize: '0.7rem',
          borderBottom: '1px solid rgba(201,168,76,0.1)',
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: 'rgba(201,168,76,0.04)',
          },
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          border: '1px solid rgba(201,168,76,0.2)',
          background: BLACK_CARD,
        },
        standardSuccess: {
          color: GOLD,
          borderColor: 'rgba(201,168,76,0.3)',
        },
        standardError: {
          color: '#FF6B6B',
          borderColor: 'rgba(255,107,107,0.3)',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          background: BLACK_CARD,
          border: '1px solid rgba(201,168,76,0.15)',
          borderRadius: 24,
          boxShadow: '0 25px 50px rgba(0,0,0,0.6)',
        },
      },
    },
    MuiCircularProgress: {
      styleOverrides: {
        root: {
          color: GOLD,
        },
      },
    },
  },
});

export const App = () => {
  const element = useRoutes(routes);

  return (
    <ThemeProvider theme={premiumTheme}>
      <CssBaseline />
      {element}
    </ThemeProvider>
  );
};