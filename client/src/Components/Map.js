import React, { useState, useEffect } from 'react'
import { Modal } from 'react-bootstrap'
import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import L from 'leaflet'
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

// const LeafletGeocoder = () => {
//     const map = useMap();
//     useEffect(() => {
//         L.Control.geocoder({
//             defaultMarkGeocode: false,
//         })
//             .on("markgeocode", function (e) {
//                 var latlng = e.geocode.center;
//                 L.marker(latlng).addTo(map).bindPopup(e.geocode.name).openPopup();
//                 map.fitBounds(e.geocode.bbox);
//             })
//             .addTo(map);
//     }, []);
//     return null;
// };

const LeafletRoutingMachine = () => {

    // console.log(latitudeStarter, longitudeStarter)
    // const position = [latitudeNow, longitudeNow];

    const map = useMap();
    let DefaultIcon = L.icon({
        iconUrl: "https://raw.githubusercontent.com/youssef-of-web/leaflet-map/master/public/marche.gif",
        iconSize: [90, 90],
    });
    useEffect(() => {
        var marker1 = L.marker([-6.3817941, 106.749596], { icon: DefaultIcon }).addTo(
            map
        );
        map.on("click", function (e) {
            L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);
            L.Routing.control({
                waypoints: [
                    L.latLng(-6.3817941, 106.749596),
                    L.latLng(e.latlng.lat, e.latlng.lng),
                ],
                lineOptions: {
                    styles: [
                        {
                            color: "blue",
                            weight: 4,
                            opacity: 0.7,
                        },
                    ],
                },
                routeWhileDragging: false,
                geocoder: L.Control.Geocoder.nominatim(),
                addWaypoints: false,
                draggableWaypoints: false,
                fitSelectedRoutes: true,
                showAlternatives: true,
            })
                .on("routesfound", function (e) {
                    e.routes[0].coordinates.forEach((c, i) => {
                        setTimeout(() => {
                            marker1.setLatLng([c.lat, c.lng]);
                        }, 1000 * i);
                    });
                })
                .addTo(map);
        });
    }, []);
    return null;
};

function Map({ showMap, setShowMap }) {
    const [latitudeNow, setLatitudeNow] = useState('')
    const [longitudeNow, setLongitudeNow] = useState('')

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            setLatitudeNow(position.coords.latitude)
            setLongitudeNow(position.coords.longitude)
        })

    }, [])



    const position = [latitudeNow, longitudeNow];
    return (
        <>

            <div className='mapModal'>
                <Modal show={showMap} size='xl' centered onHide={() => setShowMap(false)}>
                    <Modal.Header closeButton>

                    </Modal.Header>
                    <Modal.Body>
                        <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            {/*  <LeafletGeocoder /> */}
                            <LeafletRoutingMachine />
                        </MapContainer>
                    </Modal.Body>
                </Modal>
            </div>
        </>
    )

}
let DefaultIcon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40],

});

L.Marker.prototype.options.icon = DefaultIcon;

export default Map