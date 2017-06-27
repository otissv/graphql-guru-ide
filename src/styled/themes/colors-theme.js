const foreground = '#f1f1f1';
const background = '#000000';

const primary = '#E10098';
const secondary = '#515151';

const danger = '##f0506e';
const dangerSecondary = '#fef4f6';
const info = '#1e87f0';
const infoSecondary = '#d8eafc';
const success = '#32d296';
const successSecondary = '#edfbf6';
const warning = '##faa05a';
const warningSecondary = '#fff6ee';

export default function colors () {
  return {
    // Default
    foreground,
    background,
    primary,
    secondary,

    border: foreground,
    borderSecondary: secondary,
    borderPrimary: primary,

    activeBackground: secondary,
    activeForeground: background,
    focusBackground: secondary,
    focusForeground: background,
    hoverBackground: secondary,
    hoverForeground: background,
    visitedBackground: secondary,
    visitedForeground: background,

    // Danger
    danger,
    dangerSecondary,
    borderDanger: danger,
    activeBackgroundDanger: dangerSecondary,
    activeForegroundDanger: danger,
    focusBackgroundDanger: dangerSecondary,
    focusForegroundDanger: danger,
    hoverBackgroundDanger: dangerSecondary,
    hoverForegroundDanger: danger,
    visitedBackgroundDanger: dangerSecondary,
    visitedForegroundDanger: danger,

    // Info
    info,
    infoSecondary,
    borderInfo: info,
    activeBackgroundInfo: infoSecondary,
    activeForegroundInfo: info,
    focusBackgroundInfo: infoSecondary,
    focusForegroundInfo: info,
    hoverBackgroundInfo: infoSecondary,
    hoverForegroundInfo: info,
    visitedBackgroundInfo: infoSecondary,
    visitedForegroundInfo: info,

    // Success
    success,
    successSecondary,
    borderSuccess: success,
    activeBackgroundSuccess: successSecondary,
    activeForegroundSuccess: success,
    focusBackgroundSuccess: successSecondary,
    focusForegroundSuccess: success,
    hoverBackgroundSuccess: successSecondary,
    hoverForegroundSuccess: success,
    visitedBackgroundSuccess: successSecondary,
    visitedForegroundSuccess: success,

    // Warning
    warning,
    warningSecondary,
    borderWarning: warning,
    activeBackgroundWarning: warningSecondary,
    activeForegroundWarning: warning,
    focusBackgroundWarning: warningSecondary,
    focusForegroundWarning: warning,
    hoverBackgroundWarning: warningSecondary,
    hoverForegroundWarning: warning,
    visitedBackgroundWarning: warningSecondary,
    visitedForegroundWarning: warning
  };
}
