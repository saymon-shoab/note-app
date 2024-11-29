"use client"

import { store } from "@/redux/store"
import { Provider } from "react-redux"
import StyleComponentsRegistry from "./AntdRegistry"

const Providers = ({children}) => {
  return (
    <Provider store={store}>
        <StyleComponentsRegistry>
        {children}
        </StyleComponentsRegistry>
    </Provider>
  )
}

export default Providers
