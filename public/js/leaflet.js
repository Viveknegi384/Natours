/* eslint-disable */
export const displayMap = locations => {
    const map = L.map('map', {
        scrollWheelZoom: false,
        TouchZoom: false,
        boxZoom: false,
        doubleClickZoom: false,
        zoomControl: false
    });

    // Add tile layer
    L.tileLayer(
        'https://cartodb-basemaps-a.global.ssl.fastly.net/light_all/{z}/{x}/{y}{r}.png',
        {
            attribution:
                '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            subdomains: 'abcd',
            maxZoom: 19,

        }
    ).addTo(map);

    // Create bounds to fit all markers
    const bounds = [];

    locations.forEach(loc => {
        const [lng, lat] = loc.coordinates; // GeoJSON format: [lng, lat]

        // Marker (Leaflet uses [lat, lng])
        L.marker([lat, lng])
            .addTo(map)
            .bindPopup(`<p>${loc.description}</p>`, { autoClose: false })
            .openPopup();

        bounds.push([lat, lng]);
    });

    map.fitBounds(bounds, {
        padding: [50, 50] // add space around markers
    });
}