import { Reducer } from "redux"
import { UserActionTypes, UserState } from "../types/UserTypes"

const initialState: UserState = {
 darkMode: false
}

const userReducer: Reducer<UserState> = (state = initialState, action) => {
  switch (action.type) {
    case UserActionTypes.USER__UPDATE_DARK_MODE: {
      return { ...state, darkMode: action.darkMode }
    }
    default: {
      return state
    }
  }
}

export default userReducer
