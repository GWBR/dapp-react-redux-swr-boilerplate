import { useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { USER__UPDATE_DARK_MODE } from "../redux/actions/UserActions"
import { RootSate } from "../redux/types/RootTypes"

export const useIsDarkMode = () => {
  const userState = useSelector((state: RootSate) => state.user)

  return userState.darkMode
}

export const useDarkModeManager = () => {
  const dispatch = useDispatch()

  const darkMode = useIsDarkMode()

  const toggleDarkMode = useCallback(() => {
    dispatch(USER__UPDATE_DARK_MODE(!darkMode))
  }, [darkMode, dispatch])

  return { toggleDarkMode, darkMode }
}
