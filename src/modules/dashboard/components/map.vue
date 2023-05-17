<script lang="ts" setup>
import mapboxgl from "mapbox-gl"; // or "const mapboxgl = require('mapbox-gl');"
import { onMounted } from "vue";
import { ref } from "vue";

mapboxgl.accessToken =
  "pk.eyJ1IjoiamVhbmxlZS0xMCIsImEiOiJjbGhyNmtoeHIwZnA5M3BtcmJjbXduNHdzIn0.YOKG1QSgr6_0onDDv51t_g";

const mapContainer = ref<HTMLElement | null>(null);

onMounted(() => {
  const map = new mapboxgl.Map({
    container: mapContainer.value!,
    style: "mapbox://styles/mapbox/navigation-night-v1", // style URL
    center: [-77.02, -12.13], // starting position [lng, lat]
    zoom: 12, // starting zoom
  });
  map.on("styñe.load", () => {
    map.setFog({});
  });
});
</script>

<template>
  <div ref="mapContainer" class="w-full h-60 bg-white"></div>
</template>
