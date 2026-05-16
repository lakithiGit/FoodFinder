const stallsContainer = document.getElementById("stalls-container");

const searchStalls = document.getElementById("search-stalls");

searchStalls.addEventListener("click", () => {
    navigator.geolocation.getCurrentPosition(async position => {
        const lat = position.coords.latitude;
        
        const lng = position.coords.longitude;

        const response = await fetch(`http://localhost:3000/api/stalls?lat=${lat}&lng=${lng}`)
    })
})