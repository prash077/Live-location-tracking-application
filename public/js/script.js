const socket = io();

if(navigator.geolocation)
{
    navigator.geolocation.watchPosition(
        (position)=>{
            const { latitude, longtitude } = position.coords;
        },
        (error)=>{
            console.log(error);
        },
        {
            enableHighAccuracy:true,
            timeout:5000,
            maximumAge:0,
        }
    );
}

const map = L.map("map").setView([0,0],10);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{
    attribution:"@Track-live-location"
}).addTo(map);