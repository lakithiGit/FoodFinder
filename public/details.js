const stallDetails = document.getElementById("stall-details");
const stallName = document.getElementById("stall-name");

// Get the stall id from the URL
const params = new URLSearchParams(window.location.search);
const stallId = params.get("id");



async function loadStall() {

    const menuResponse = await fetch(
    `/api/stalls/${stallId}/menu`
);

    const menuItems = await menuResponse.json();

    const menuGallery = document.getElementById("menu-gallery");

    menuGallery.innerHTML = menuItems.map(item => `
        <div class="menu-card">
            <img src="${item.image_url}" alt="${item.dish_name}">
            <h3>${item.dish_name}</h3>
            <p>R${item.price}</p>
        </div>`).join("");

    const response = await fetch(`/api/stalls/${stallId}`);
    // need api on server.js that returns the stall details matching the stall id

    const stall = await response.json();
    
    stallName.innerHTML = `
        <h2>${stall.name}</h2>
    `

    stallDetails.innerHTML = `

        <p>${stall.description}</p>

        <p><strong>Category:</strong> ${stall.category}</p>

        <p><strong>Address:</strong> ${stall.address}</p>

        <p><strong>Phone:</strong> ${stall.phone}</p>

        <p><strong>Email:</strong> ${stall.email}</p>

        <button class="directions-button" data-lat="${stall.latitude}" data-lng="${stall.longitude}">
            Get Directions
        </button>
`;

document.querySelectorAll(".directions-button").forEach(button => {

        button.addEventListener("click", () => {
            console.log("Directions button clicked");

            const stallLat = button.dataset.lat;
            const stallLng = button.dataset.lng;

            navigator.geolocation.getCurrentPosition(position => {

                const userLat = position.coords.latitude;
                const userLng = position.coords.longitude;

                window.open(
                    `https://www.google.com/maps/dir/${userLat},${userLng}/${stallLat},${stallLng}`
                );

            });

        });

    });

}
    

loadStall();


