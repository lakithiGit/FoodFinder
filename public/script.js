const stallsContainer = document.getElementById("stalls-container");

const searchStalls = document.getElementById("search-stalls");

searchStalls.addEventListener("click", () => {
    navigator.geolocation.getCurrentPosition(async position => {
        const lat = position.coords.latitude;
        
        const lng = position.coords.longitude;

        const response = await fetch(`http://localhost:3000/api/stalls?lat=${lat}&lng=${lng}`);

    const stalls = await response.json();

    stallsContainer.innerHTML = "";
    
    if (stalls.length === 0) {
    stallsContainer.innerHTML = "<p>No nearby stalls found.</p>";
}

    stalls.forEach(stall => {
        const stallDiv = document.createElement("div");

        stallDiv.classList.add("stall-card");

        stallDiv.innerHTML = `
        <img src="http://localhost:3000${stall.image_url}"
            alt="${stall.name}"
            class="stall-image">

        <div class="stall-info">
            <h2>${stall.name}</h2>
            <p class="distance">📍${stall.distance} km away</p>
        </div>

        <button class="view-more-button" data-id="${stall.id}">
            View Details 
        </button>
        `;

        stallsContainer.appendChild(stallDiv);
        });

        //add event listener
       document.querySelectorAll(".view-more-button").forEach(button => {
            button.addEventListener("click", () => {
                const id = button.dataset.id;
                window.location.href = `details.html?id=${id}`;
            });
    });
});
});