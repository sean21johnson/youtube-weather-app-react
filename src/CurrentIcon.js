import React from "react";

function CurrentIcon({ weatherIcon }) {
	const imageSrc = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`;

	return weatherIcon ? (
		<div>
			<img src={imageSrc} alt="weather_icon" />
		</div>
	) : (
		""
	);
}

export default CurrentIcon;
