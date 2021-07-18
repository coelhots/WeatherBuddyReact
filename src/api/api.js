export const getCityWeather = async (city) => {
    const res = await fetch(`http://127.0.0.1:5000/weather?city=${city}`)
    return res
}