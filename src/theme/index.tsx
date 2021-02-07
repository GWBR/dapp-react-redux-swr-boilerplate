import React, { useMemo } from "react"
import styled, { ThemeProvider as StyledComponentsThemeProvider, createGlobalStyle, css, DefaultTheme } from "styled-components"
import { useIsDarkMode } from "../hooks/useUser"
import { Text, TextProps } from "rebass"
import { Colors } from "./styled.d"

const MEDIA_WIDTHS = {
  upToExtraSmall: 500,
  upToSmall: 720,
  upToMedium: 960,
  upToLarge: 1280,
}

const mediaWidthTemplates: { [width in keyof typeof MEDIA_WIDTHS]: typeof css } = Object.keys(MEDIA_WIDTHS).reduce((accumulator, size) => {
  ;(accumulator as any)[size] = (a: any, b: any, c: any) => css`
    @media (max-width: ${(MEDIA_WIDTHS as any)[size]}px) {
      ${css(a, b, c)}
    }
  `
  return accumulator
}, {}) as any

const white = "#FFFFFF"
const black = "#000000"

export function colors(darkMode: boolean): Colors {
  return {
    // base
    white,
    black,

    bgPrimary: darkMode ? "#2d3748" : "#f6f7fb",
    bgSecondary: darkMode ? "#1d2026" : "#ffffff",
    bgTiertiary: darkMode ? "#1c2f48" : "#fdeaf1",
    bgQuaternary: darkMode ? "#1f70e3" : "#fa0279",

    textPrimary: darkMode ? "#ffffff" : "#2d3748",
    textSecondary: darkMode ? "#c2c4cb" : "#4e5261",
    textTiertiary: darkMode ? "#6ea9ff" : "#fa0279",
    textQuaternary: darkMode ? "#ffffff" : "#ffffff",

    bgNeutralPrimary: darkMode ? "#4e5261" : "#e3e5ed",
    bgNeutralSecondary: darkMode ? "#64697c" : "#c2c4cb",
    bgNeutralTiertiary: darkMode ? "#e5eaf2" : "#f0f0f0",

    textNeutralPrimary: darkMode ? "#f6f6f6" : "#2d3748",
    textNeutralSecondary: darkMode ? "#c2c4cb" : "#4e5261",
    textNeutralTiertiary: darkMode ? "#b1b6bf" : "#c4c4c4",

    // other
    textError: "#FD4040",
  }
}

export function theme(darkMode: boolean): DefaultTheme {
  return {
    ...colors(darkMode),

    grids: {
      sm: 8,
      md: 12,
      lg: 24,
    },

    //shadows
    shadowPrimary: darkMode ? "rgba(0,0,0,0.4)" : "rgba(150,170,180,0.5)",

    // media queries
    mediaWidth: mediaWidthTemplates,

    // css snippets
    flexColumnNoWrap: css`
      display: flex;
      flex-flow: column nowrap;
    `,
    flexRowNoWrap: css`
      display: flex;
      flex-flow: row nowrap;
    `,
  }
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const darkMode = useIsDarkMode()

  const themeObject = useMemo(() => theme(darkMode), [darkMode])

  return <StyledComponentsThemeProvider theme={themeObject}>{children}</StyledComponentsThemeProvider>
}

const TextWrapper = styled(Text)<{ color: keyof Colors }>`
  color: ${({ color, theme }) => (theme as any)[color]};
`

export const TYPE = {
  main(props: TextProps) {
    return <TextWrapper fontWeight={500} color={"textNeutralSecondary"} {...props} />
  },
  link(props: TextProps) {
    return <TextWrapper fontWeight={500} color={"textTiertiary"} {...props} />
  },
  black(props: TextProps) {
    return <TextWrapper fontWeight={500} color={"textPrimary"} {...props} />
  },
  white(props: TextProps) {
    return <TextWrapper fontWeight={500} color={"white"} {...props} />
  },
  body(props: TextProps) {
    return <TextWrapper fontWeight={400} fontSize={16} color={"textPrimary"} {...props} />
  },
  largeHeader(props: TextProps) {
    return <TextWrapper fontWeight={600} fontSize={24} {...props} />
  },
  mediumHeader(props: TextProps) {
    return <TextWrapper fontWeight={500} fontSize={20} {...props} />
  },
  subHeader(props: TextProps) {
    return <TextWrapper fontWeight={400} fontSize={14} {...props} />
  },
  small(props: TextProps) {
    return <TextWrapper fontWeight={500} fontSize={11} {...props} />
  },
  amount(props: TextProps) {
    return <TextWrapper fontWeight={700} fontSize={17} color={"textNeutralTiertiary"} {...props} />
  },
  amountSmall(props: TextProps) {
    return <TextWrapper fontWeight={500} fontSize={14} color={"textNeutralTiertiary"} {...props} />
  },
  error({ error, ...props }: { error: boolean } & TextProps) {
    return <TextWrapper fontWeight={500} color={error ? "textError" : "textNeutralSecondary"} {...props} />
  },
}

export const FixedGlobalStyle = createGlobalStyle`
html, input, textarea, button {
  font-family: 'Montserrat', sans-serif;
}
html,
body {
  margin: 0;
  padding: 0;
}
 a {
   color: ${colors(false).textTiertiary}; 
 }
* {
  box-sizing: border-box;
}
button {
  user-select: none;
}
html {
  font-size: 16px;
  font-variant: none;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);  
}
`

export const ThemedGlobalStyle = createGlobalStyle`
html {
  color: ${({ theme }) => theme.textPrimary};
  background-color: ${({ theme }) => theme.bgPrimary};
}
body {
  min-height: 100vh;
}
`
