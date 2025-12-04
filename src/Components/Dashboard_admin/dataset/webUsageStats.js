// Data derived from https://gs.statcounter.com/os-market-share/desktop/worldwide/2023
// And https://gs.statcounter.com/os-market-share/mobile/worldwide/2023
// And https://gs.statcounter.com/platform-market-share/desktop-mobile-tablet/worldwide/2023
// For the month of December 2023

export const desktopOS = [
  {
    label: "Nouveaux clients",
    value: 72.72,
  },
  {
    label: "Clients fréquents",
    value: 16.38,
  },
  {
    label: "Clients inactifs",
    value: 3.83,
  },
  {
    label: "Panier abandonné",
    value: 2.42,
  },
  {
    label: "Other",
    value: 4.65,
  },
];

export const mobileOS = [
  {
    label: "Nouveaux clients",
    value: 70.48,
  },
  {
    label: "Clients fréquents",
    value: 28.8,
  },
  {
    label: "Panier abandonné",
    value: 0.71,
  },
];

export const platforms = [
  {
    label: "Nouveaux clients",
    value: 59.12,
  },
  {
    label: "Clients fréquents",
    value: 40.88,
  },
];

const normalize = (v, v2) => Number.parseFloat(((v * v2) / 100).toFixed(2));

export const mobileAndDesktopOS = [
  ...mobileOS.map((v) => ({
    ...v,
    label: v.label === "Other" ? "Other (Mobile)" : v.label,
    value: normalize(v.value, platforms[0].value),
  })),
  ...desktopOS.map((v) => ({
    ...v,
    label: v.label === "Other" ? "Other (Desktop)" : v.label,
    value: normalize(v.value, platforms[1].value),
  })),
];

export const valueFormatter = (item) => `${item.value}%`;
