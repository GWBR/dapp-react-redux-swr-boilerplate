import React, { FunctionComponent, useEffect } from "react"

import Header from "./components/Header"
import Stake from "./components/Stake/Stake"
import { useEthereum } from "./hooks/useEthereum"

const Main: FunctionComponent = () => {
  const { onConnect } = useEthereum()

  useEffect(() => {
    if (localStorage.getItem("IS_PROVIDER_CACHED") === "true") {
      onConnect()
      console.log("ici")
    }
  }, [])

  return (
    <div className="App">
      <Header />
      <Stake />
    </div>
  )
}

export default Main
