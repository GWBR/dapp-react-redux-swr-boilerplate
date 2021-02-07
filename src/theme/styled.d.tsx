export type Color = string
export interface Colors {
  // base
  white: Color
  black: Color

  bgPrimary: Color
  bgSecondary: Color
  bgTiertiary: Color
  bgQuaternary: Color

  textPrimary: Color
  textSecondary: Color
  textTiertiary: Color
  textQuaternary: Color

  bgNeutralPrimary: Color
  bgNeutralSecondary: Color
  bgNeutralTiertiary: Color

  textNeutralPrimary: Color
  textNeutralSecondary: Color
  textNeutralTiertiary: Color

  // other
  textError: Color
}

export interface Grids {
  sm: number
  md: number
  lg: number
}

declare module "styled-components" {
  export interface DefaultTheme extends Colors {
    grids: Grids

    // shadows
    shadowPrimary: string

    // media queries
    mediaWidth: {
      upToExtraSmall: ThemedCssFunction<DefaultTheme>
      upToSmall: ThemedCssFunction<DefaultTheme>
      upToMedium: ThemedCssFunction<DefaultTheme>
      upToLarge: ThemedCssFunction<DefaultTheme>
    }

    // css snippets
    flexColumnNoWrap: FlattenSimpleInterpolation
    flexRowNoWrap: FlattenSimpleInterpolation
  }
}
