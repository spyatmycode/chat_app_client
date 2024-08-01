
import { useEffect } from 'react'
import { AppRouter } from './router'
import { Toaster } from 'react-hot-toast'
import axios from 'axios'



const App = () => {


  useEffect(() => {
    axios.interceptors.request.use(
        (config) => {
            config.withCredentials = true
            return config
        },
        (error) => {
            return Promise.reject(error)
        }
    )
},[])
  return (
    <>
      <Toaster

        toastOptions={
          {
            position: "top-right"
          }
        }

      />
      <AppRouter />
    </>
  )
}

export default App