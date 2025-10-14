import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import WeatherCard from "../components/WeatherCard";
import "../styles/Dashboard.css";

export default function Dashboard() {
    const navigate = useNavigate();
    const [weather, setWeather] = useState([]);
    const [loading, setLoading] = useState(true);
    const [city, setCity] = useState("");
    const [error, setError] = useState("");

    const handleLogout = () => {
        navigate("/");
    };
    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const res = await fetch(
                    "https://api.weatherapi.com/v1/forecast.json?key=2839b13ab85f452c9f3193220251410&q=Kyiv&days=5&lang=uk"
                );

                const data = await res.json();

                if (!data.forecast || !data.forecast.forecastday) {
                    throw new Error("Не вдалося отримати дані");
                }


                setCity(data.location.name);

                const weekdays = ["Нд", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];

                const formatted = data.forecast.forecastday.map((day, i) => {
                    let dayLabel;
                    if (i === 0) dayLabel = "Сьогодні";
                    else if (i === 1) dayLabel = "Завтра";
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
                setError("Помилка при завантаженні погоди");
            } finally {
                setLoading(false);
            }
        };

        fetchWeather();
    }, []);



    return (
        <div className="dashboard">
            <header className="dashboard-header">
                <h2>WeatherApp</h2>
                <div className="city-name">{city}</div>

                <button onClick={handleLogout}>Вийти</button>
            </header>

            <main className="weather-container">
                {loading && <p className="loader">Завантаження...</p>}
                {error && <p className="error">{error}</p>}
                {!loading &&
                    !error &&
                    weather.map((item, index) => (
                        <WeatherCard
                            key={index}
                            dayName={item.dayName}
                            icon={item.icon}
                            condition={item.condition}
                            temp_max={item.temp_max}
                            temp_min={item.temp_min}
                            humidity={item.humidity}
                            wind={item.wind}
                            chance_of_rain={item.chance_of_rain}
                            chance_of_snow={item.chance_of_snow}
                            uv={item.uv}
                            sunrise={item.sunrise}
                            sunset={item.sunset}
                        />
                    ))
                }

            </main>
        </div>
    );
}
