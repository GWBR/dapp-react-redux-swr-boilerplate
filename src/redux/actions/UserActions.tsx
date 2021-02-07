import { UserActionTypes} from "../types/UserTypes"

export const USER__UPDATE_DARK_MODE = (darkMode: boolean ) => ({ type: UserActionTypes.USER__UPDATE_DARK_MODE, darkMode })