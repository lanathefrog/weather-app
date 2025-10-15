import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import WeatherCard from "../components/WeatherCard";
import "../styles/Dashboard.css";

export default function Dashboard() {
    const navigate = useNavigate();
    const [weather, setWeather] = useState([]);
    const [loading, setLoading] = useState(true);
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [error, setError] = useState("");


    useEffect(() => {
        const isLoggedIn = Cookies.get("loggedIn");

        if (!isLoggedIn) {
            toast.warn("You are not authorized. Please log in.", { autoClose: 2000 });
            setTimeout(() => navigate("/"), 800);
        }
    }, [navigate]);

    const handleLogout = () => {
        Cookies.remove("loggedIn");
        navigate("/");
    };

    useEffect(() => {
        const fetchWeather = async (lat, lon) => {
            try {
                const res = await fetch(
                    `https://api.weatherapi.com/v1/forecast.json?key=2839b13ab85f452c9f3193220251410&q=${lat},${lon}&days=5&lang=en`
                );

                const data = await res.json();

                if (!data.forecast || !data.forecast.forecastday) {
                    throw new Error("Failed to fetch weather data");
                }

                setCity(data.location.name);
                setCountry(data.location.country);

                const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

                const formatted = data.forecast.forecastday.map((day, i) => {
                    let dayLabel;
                    if (i === 0) dayLabel = "Today";
                    else if (i === 1) dayLabel = "Tomorrow";
                    else {
                        const d = new Date(day.date);
                        dayLabel = `${weekdays[d.getDay()]} (${d.getDate()}.${d.getMonth() + 1})`;
                    }

                    return {
                        date: day.date,
                        dayName: dayLabel,
                        temp_max: day.day.maxtemp_c,
                        temp_min: day.day.mintemp_c,
                        condition: day.day.condition.text,
                        icon: day.day.condition.icon,
                        humidity: day.day.avghumidity,
                        wind: day.day.maxwind_kph,
                        chance_of_rain: day.day.daily_chance_of_rain,
                        chance_of_snow: day.day.daily_chance_of_snow,
                        uv: day.day.uv,
                        sunrise: day.astro.sunrise,
                        sunset: day.astro.sunset,
                    };
                });

                setWeather(formatted);
            } catch (err) {
                console.error(err);
                setError("Error loading weather data");
            } finally {
                setLoading(false);
            }
        };

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    fetchWeather(latitude, longitude);
                },
                () => {
                    console.warn("Geolocation denied, showing Kyiv");
                    fetchWeather(50.4501, 30.5234);
                }
            );
        } else {
            console.warn("Browser does not support geolocation");
            fetchWeather(50.4501, 30.5234);
        }
    }, []);

    return (
        <div className="dashboard">
            <header className="dashboard-header">
                <h2>WeatherApp</h2>
                <div className="city-name">
                    {city && country ? `${city}, ${country}` : "Detecting location..."}
                </div>
                <button onClick={handleLogout}>Logout</button>
            </header>

            <main className="weather-container">
                {loading && <p className="loader">Loading...</p>}
                {error && <p className="error">{error}</p>}
                {!loading &&
                    !error &&
                    weather.map((item, index) => <WeatherCard key={index} {...item} />)}
            </main>
        </div>
    );
}
