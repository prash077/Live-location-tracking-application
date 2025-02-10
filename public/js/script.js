const socket = io();

if (navigator.geolocation) {
    navigator.geolocation.watchPosition(
        (position) => {
            const { latitude, longitude } = position.coords;
            console.log("Sending location:", latitude, longitude); 

            socket.emit("send-location", { latitude, longitude });
        },
        (error) => {
            console.error("Geolocation error:", error);
        },
        {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
        }
    );
}


const map = L.map("map").setView([0,0],10);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{
    attribution:"@Track-live-location"
}).addTo(map);

const marker = {};


socket.on("receive-location", (data) => {
    console.log("Received location data:", data); 

    const { id, latitude, longitude } = data;

    if (!latitude || !longitude) {
        console.error("Invalid location received:", data);
        return; 
    }

    map.setView([latitude, longitude], 16);

    if (marker[id]) {
        marker[id].setLatLng([latitude, longitude]);
    } else {
        marker[id] = L.marker([latitude, longitude]).addTo(map);
    }
});

