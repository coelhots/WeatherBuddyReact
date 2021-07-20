import './App.css';
import Card from './components/Card';
import {useEffect, useState} from 'react'
import {getCityWeather} from './api/api'

function App() {

  const [status, setStatus] = useState("initial")
  const [currentCityInfo, setCurrentCityInfo] = useState({}) 
  const [lastCitiesInfo, setLastCitiesInfo] = useState([])
  const [cityName, setCityName] = useState("")
  

  const getLastCitiesInfo = async (cities) => {
    const citiesData = []

    for(let i = 0; i < cities.length; i++){
      const resData = await getCityWeather(cities[i])
      citiesData.push(await resData.json())
    }
    setLastCitiesInfo(citiesData)
  }
  useEffect(()=> {
    const lastCitiesInfo = JSON.parse(localStorage.getItem("lastCitiesInfo"))
    getLastCitiesInfo(lastCitiesInfo)
  },[currentCityInfo])


  useEffect(() => {
    const nextCityIndex = localStorage.getItem("nextCityIndex")
    if (!nextCityIndex){
      localStorage.setItem("nextCityIndex",0)
    }

    const lastCitiesInfo = JSON.parse(localStorage.getItem("lastCitiesInfo"))
    if (lastCitiesInfo){
      getLastCitiesInfo (lastCitiesInfo)
      
      }else{
      localStorage.setItem("lastCitiesInfo", JSON.stringify([]))
    }

  }, [])

  const handleOnChange = (e) => {
    setCityName (e.target.value)
  }

  const handlePressEnter = async (e) => {
    if (e.key === "Enter"){
      setStatus("loading")
      const res = await getCityWeather(cityName);
      if (res.status !== 200) {
        setStatus("error")
      }else {
        const data = (await res.json())
        const nextCityIndex = Number(localStorage.getItem("nextCityIndex"))

        let lastCitiesInfo = JSON.parse(localStorage.getItem("lastCitiesInfo"))
        if (nextCityIndex < 6){
          lastCitiesInfo[nextCityIndex] = data.city
          localStorage.setItem("nextCityIndex",nextCityIndex + 1)
          localStorage.setItem("lastCitiesInfo", JSON.stringify(lastCitiesInfo))
        }else {
          lastCitiesInfo[0] = data.city
          localStorage.setItem("nextCityIndex",1)
          localStorage.setItem("lastCitiesInfo", JSON.stringify(lastCitiesInfo))

        }
        setCurrentCityInfo(data)
        
        

        setStatus("sucess")

        
      }
      
    }
  }
console.log(lastCitiesInfo)

  return (
    <div className="main">
      <div className="container">
        <h2>Weather Buddy</h2>
        <hr></hr>
      </div>
      <div className="weather">
        <p style={{marginRight:"8px"}} >How is the weather in</p>
        
        <input onChange={handleOnChange} onKeyDown={handlePressEnter} className="city-name-input" type="text" name="name" />
        <p style={{marginLeft:"8px"}}>now?</p>
      </div>


      {status === "error" &&(
        <div className='cityError'>
          <p>Sorry. We couldn't find the specified city.</p>
        </div>
      )}
      {status === "sucess" && (
        <div className='card-container'>
        <Card title = {currentCityInfo?.city + "-" + currentCityInfo?.country} icon={currentCityInfo?.icon_url} temp={currentCityInfo?.temp_c} desc={currentCityInfo?.temp_desc}/>
      </div>

      )}

      <div className='card-container'>
        {lastCitiesInfo.filter((c) => c.city !== currentCityInfo.city).map((c, index) => (
          <Card key = {c.city} title = {c.city + "-" + c.country} icon={c.icon_url} temp={c.temp_c} desc={c.temp_desc}/>
        ))}
      </div>

      
    </div>
  );
}

export default App;
