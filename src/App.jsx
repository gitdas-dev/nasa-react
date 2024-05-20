import Main from "./components/Main"
import SideBar from "./components/SideBar"
import Footer from "./components/Footer"
import React, { useState, useEffect } from "react"

function App() {
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(null)
  const NASA_KEY = import.meta.env.VITE_NASA_API_KEY
  function handleToggleModal(){
    setShowModal(!showModal)
  }

  useEffect(() => {
    async function fetchAPIdata(){
      const url = 'https://api.nasa.gov/planetary/apod' + `?api_key=${NASA_KEY}`

      const today = (new Date()).toDateString()
      const localKey = `NASA-${today}`

      if(localStorage.getItem(localKey)){
        const apiData = JSON.parse(localStorage.getItem(localKey))
        setData(apiData);
        console.log('fetched from cache today');
        return;
      }

      localStorage.clear()

      try{
        const res = await fetch(url)
        const apiData = await res.json()
        localStorage.setItem(localKey, JSON.stringify(apiData))
        setData(apiData)
        console.log('fetched from api today');
        console.log("Data\n", apiData);
      }catch(err){
        console.log(err.message);
      }
    }

    fetchAPIdata()
  }, [])
  
  return (
    <>
      {data ? (<Main data={data}/>) : (<div className="loadingState">
        <i className="fa-solid fa-gear"></i>
      </div>)}
      {
        showModal && (<SideBar data={data} showModal={showModal} handleToggleModal={handleToggleModal}/>)
      }

      {data && (<Footer handleToggleModal={handleToggleModal} data={data}showModal={showModal}/>)
      }
    </>
  )
}

export default App
