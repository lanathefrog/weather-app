import "../styles/WeatherCard.css";

export default function WeatherCard({
                                        dayName,
                                        icon,
                                        condition,
                                        temp_max,
                                        temp_min,
                                        humidity,
                                        wind,
                                        chance_of_rain,
                                        chance_of_snow,
                                        uv,
                                        sunrise,
                                        sunset,
                                    }) {


    return (

        <div className="weather-card">
            <h3>{dayName}</h3>
            <img src={icon} alt={condition} />
            <p className="condition">{condition}</p>
            <p className="temp">
                {Math.round(temp_max)}°C / {Math.round(temp_min)}°C
            </p>
            <p className="details"><strong>Вологість:</strong> {humidity}%</p>
            <p className="details"><strong>Вітер:</strong> {wind} км/год</p>
            <p className="details"><strong>Ймовірність дощу:</strong> {chance_of_rain}%</p>
            <p className="details"><strong>Ймовірність снігу:</strong> {chance_of_snow}%</p>
            <p className="details"><strong>Сонце:</strong> {sunrise} - {sunset}</p>
            <p className="details"><strong>UV індекс:</strong> {uv}</p>
        </div>
    );
}
