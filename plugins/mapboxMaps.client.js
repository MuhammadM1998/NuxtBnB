import "mapbox-gl/dist/mapbox-gl.css";
const mapboxgl = require("mapbox-gl");
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

export default function (context, inject) {
  inject("mapboxMaps", { createMap, createGeocoder });

  // Mapbox Access Token
  mapboxgl.accessToken =
    "pk.eyJ1IjoibXVoYW1tYWRtMTk5OCIsImEiOiJjbDNmeWhiNXIwcXM1M2JucjVwMDJ6d2k5In0.5cYoPsAgo_YmkK_HVh4KPg";

  function createMap(mapContainerID, coords, markers) {
    // Creating a new map instance
    const map = new mapboxgl.Map({
      container: mapContainerID,
      style: "mapbox://styles/mapbox/streets-v11", // style URL
      center: coords, // starting position [lng, lat]
      zoom: 15, // starting zoom
      maxZoom: 18,
      attributionControl: false, // Hides the attribution text
      cooperativeGestures: true, // Forces using Ctrl + Scroll to zoom
    });
    addMarkers(coords, markers);
    addExtraControls();

    // Add Zoom, Rotation and Full Screen controls
    function addExtraControls() {
      // Add zoom and rotation controls to the map.
      map.addControl(new mapboxgl.NavigationControl());

      // Add Full Screen
      map.addControl(new mapboxgl.FullscreenControl(), "bottom-right");
    }

    // Add Markers
    function addMarkers(coords, markers) {
      if (!markers) {
        // Create a default Marker and add it to the map.
        const defaultMarker = new mapboxgl.Marker().setLngLat(coords);
        defaultMarker.addTo(map);
        return;
      }

      // Add Corresponding Markers with Prices on the map
      markers.forEach((home) => {
        const element = document.createElement("div");

        // Add the marker class to element to apply the styles
        element.classList.add("marker", `home-${home.id}`);

        element.textContent = `$${home.pricePerNight}`;

        // make a marker for each feature and add to the map
        const marker = new mapboxgl.Marker(element)
          .setLngLat([home.lng, home.lat])
          .addTo(map);
      });

      // Set the Map Bounds to adjust the zoom level and show all the added markers
      setMapBounds(markers);
    }

    function setMapBounds(markers) {
      if (markers.length) {
        // Getting all marker's longitudes and latitudes arrays
        const lngSet = [];
        const latSet = [];

        markers.forEach((marker) => {
          lngSet.push(marker.lng);
          latSet.push(marker.lat);
        });

        // Determining the Map's South West Bounds array [swLng (Smallest Longitude value in lngSet), swLat (Smallest Latitude value in lngSet)]
        const swLng = Math.min(...lngSet);
        const swLat = Math.min(...latSet);
        const swBounds = [swLng, swLat];

        // Determining the Map's South West Bounds array [neLng (Largest Longitude value in lngSet), neLat (Largest Latitude value in lngSet)]
        const neLng = Math.max(...lngSet);
        const neLat = Math.max(...latSet);
        const neBounds = [neLng, neLat];

        // Constructing the New Map Bounds array
        const boundsBox = [swBounds, neBounds];

        // Fitting the map view to the new bounds array with an acceptable padding
        map.fitBounds(boundsBox, {
          padding: { top: 100, bottom: 100, left: 100, right: 100 },
        });
      }
    }
  }

  function createGeocoder(containerID) {
    const geocoderContainer = document.getElementById(containerID);
    // Only add the search box if there's none (avoid duplications of boxes)
    if (geocoderContainer.querySelector(".mapboxgl-ctrl-geocoder")) return;

    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      enableEventLogging: false,
      mapboxgl: mapboxgl,
    });

    geocoder.addTo(geocoderContainer);

    // Emit an Event when a result is found
    geocoder.on("result", function (data) {
      const result = data.result;
      const resultFound = new CustomEvent("resultFound", { detail: result });
      geocoderContainer.dispatchEvent(resultFound);
    });
  }
}
