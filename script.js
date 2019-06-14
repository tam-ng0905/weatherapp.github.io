window.addEventListener('load', function() {
	var long;
	var lat;
	let temperatureDescription = document.querySelector('.temp-discription');
	let temperatureDegree = document.querySelector('.temp-degree');
	let timeZone = document.querySelector('.location-timezone');
	let tempSection = document.querySelector('.degree-section');
	let temperatureSpan = document.querySelector('.degree-section span');
	
	if(navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(position => {
			long = position.coords.longitude;
			lat = position.coords.latitude;
			console.log(position);
		
		const proxy = "http://cors-anywhere.herokuapp.com/";
		const api = `${proxy}https://api.darksky.net/forecast/22ac17c31b01e599cdbd2446367bae03/${lat},${long}`;
		
		fetch(api)
			.then(data =>{
			return data.json();
			
		})
			.then(response => {
			console.log(response);
			const {temperature, summary, timezone, icon} = response.currently;
			//Set DOM element from the API
			
			temperatureDegree.innerHTML= temperature;
			temperatureDescription.innerHTML = summary;
			timeZone.textContent = response.timezone;
			//Set Icon
			setIcons(icon, document.querySelector('.icon'));
			
			//Formula for the degree
			let celcius = Math.round((temperature - 32)* (5/9));
			
			//Set Celcius
			tempSection.addEventListener('click', () =>{
				if(temperatureSpan.innerHTML === "F"){
					temperatureSpan.innerHTML = "C";
					temperatureDegree.innerHTML = celcius;
				} else {
					temperatureSpan.innerHTML = "F";
					temperatureDegree.innerHTML = temperature;
				}
			})
			
		})
		
		});
		
		
	}else {
		alert("hey, please enable us to track your location so that we can tell you what is the location where you are from");
	}
	function setIcons(icon, iconID){
		const skycons = new Skycons({color: "white" });
		const currentIcon = icon.replace(/-/g, "_").toUpperCase();
		skycons.play();
		return skycons.set(iconID, Skycons[currentIcon]);
	}
	
						});