// import { alpha } from '@mui/material/styles';

// const withAlphas = (color) => {
//   return {
//     ...color,
//     alpha4: alpha(color.main, 0.04),
//     alpha8: alpha(color.main, 0.08),
//     alpha12: alpha(color.main, 0.12),
//     alpha30: alpha(color.main, 0.30),
//     alpha50: alpha(color.main, 0.50),
//   };
// };

// export const neutral = {
//   50: '#F9FAFB',
//   100: '#F2F4F7',
//   200: '#EAECF0',
//   300: '#D0D5DD',
//   400: '#98A2B3',
//   500: '#667085',
//   600: '#475467',
//   700: '#344054',
//   800: '#1D2939',
//   900: '#101828',
// };

// // ✅ Updated Blue (matches your navbar)
// export const blue = withAlphas({
//   light: '#1976d2',   // lighter end of gradient
//   main: '#0d47a1',    // darker start of gradient
//   dark: '#002171',    // deeper tone for dark mode
//   contrastText: '#FFFFFF',
// });

// export const green = withAlphas({
//   light: '#6CE9A6',
//   main: '#0d47a1', // (you had this set here earlier — optional)
//   dark: '#027A48',
//   contrastText: '#FFFFFF',
// });

// export const indigo = withAlphas({
//   light: '#EBEEFE',
//   main: '#635dff',
//   dark: '#4338CA',
//   contrastText: '#FFFFFF',
// });

// export const purple = withAlphas({
//   light: '#F4EBFF',
//   main: '#9E77ED',
//   dark: '#6941C6',
//   contrastText: '#FFFFFF',
// });

// export const success = withAlphas({
//   light: '#3FC79A',
//   main: '#10B981',
//   dark: '#0B815A',
//   contrastText: '#FFFFFF',
// });

// export const info = withAlphas({
//   light: '#CFF9FE',
//   main: '#06AED4',
//   dark: '#0E7090',
//   contrastText: '#FFFFFF',
// });

// export const warning = withAlphas({
//   light: '#FEF0C7',
//   main: '#F79009',
//   dark: '#B54708',
//   contrastText: '#FFFFFF',
// });

// export const error = withAlphas({
//   light: '#FEE4E2',
//   main: '#F04438',
//   dark: '#B42318',
//   contrastText: '#FFFFFF',
// });
import { alpha } from '@mui/material/styles';

const withAlphas = (color) => {
  return {
    ...color,
    alpha4: alpha(color.main, 0.04),
    alpha8: alpha(color.main, 0.08),
    alpha12: alpha(color.main, 0.12),
    alpha30: alpha(color.main, 0.30),
    alpha50: alpha(color.main, 0.50),
  };
};

// ─── BLACK + GOLD PREMIUM PALETTE ──────────────────────────────────

export const neutral = {
  50: '#1A1A1A',
  100: '#222222',
  200: '#2A2A2A',
  300: '#3A3A3A',
  400: '#666666',
  500: '#888888',
  600: '#A0A0A0',
  700: '#B0B0B0',
  800: '#D0D0D0',
  900: '#F0F0F0',
};

// ✅ Gold — Primary Brand Color
export const gold = withAlphas({
  light: '#E8D5A3',
  main: '#C9A84C',
  dark: '#9A7B2E',
  contrastText: '#0A0A0A',
});

// ✅ Gold variants for different uses
export const goldSoft = withAlphas({
  light: '#F0E8D0',
  main: '#D4BC6A',
  dark: '#A68A3C',
  contrastText: '#0A0A0A',
});

// ✅ Dark backgrounds
export const dark = withAlphas({
  light: '#1A1A1A',
  main: '#111111',
  dark: '#0A0A0A',
  contrastText: '#FFFFFF',
});

// ✅ Success (Green → Gold-tinted)
export const success = withAlphas({
  light: '#C9A84C',
  main: '#C9A84C',
  dark: '#9A7B2E',
  contrastText: '#0A0A0A',
});

// ✅ Info (Cyan → Gold-tinted)
export const info = withAlphas({
  light: '#E8D5A3',
  main: '#C9A84C',
  dark: '#9A7B2E',
  contrastText: '#0A0A0A',
});

// ✅ Warning (Amber → Gold)
export const warning = withAlphas({
  light: '#E8D5A3',
  main: '#C9A84C',
  dark: '#9A7B2E',
  contrastText: '#0A0A0A',
});

// ✅ Error (Red kept for visibility)
export const error = withAlphas({
  light: '#FF9999',
  main: '#FF6B6B',
  dark: '#CC4444',
  contrastText: '#FFFFFF',
});

// ─── LEGACY EXPORTS (for backward compatibility) ────────────────────
// These map old names to the new gold palette

export const blue = gold;
export const green = gold;
export const indigo = goldSoft;
export const purple = g