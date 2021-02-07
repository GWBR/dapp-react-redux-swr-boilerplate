export interface User {
  darkMode: boolean
}

export enum UserActionTypes {
  USER__UPDATE_DARK_MODE = "USER__UPDATE_DARK_MODE",
}

// Declare state types with `readonly` modifier to get compile time immutability.
// https://github.com/piotrwitek/react-redux-typescript-guide#state-with-type-level-immutability
export interface UserState {
  readonly darkMode: boolean 
}
