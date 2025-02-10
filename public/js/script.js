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