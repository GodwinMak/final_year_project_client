/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useMemo } from "react";
import DeckGl from "deck.gl";
import Map from "react-map-gl";
import { useAnimalContext } from "../../hooks/useAnimalContext";
import { useAnimalSummaryContext } from "../../hooks/useAnimalSummaryContext";
import {Context} from "../../Context"

import { ScatterplotLayer, PathLayer, IconLayer } from "@deck.gl/layers";

const MapComponent = () => {
  const { state, getAnimalData } = useAnimalContext();
  const animalData = useAnimalSummaryContext();

  const { state: select } = useContext(Context);

  React.useEffect(() => {
    getAnimalData();
  }, []);

  console.log(state.path);

  // Dynamically filter out layers for unchecked animals

  // Dynamically filter out layers for unchecked animals
  const filteredPathLayers = state.path
    ? state.path.filter((animal) =>
        select.selectedAnimals.includes(animal.animal_TagId)
      )
    : [];

  const filteredScatterplotLayers = state.animalData
    ? state.animalData.filter((animal) =>
        select.selectedAnimals.includes(animal.animal_TagId)
      )
    : [];

  const layer = [
    new PathLayer({
      id: "path-layer",
      data: filteredPathLayers,
      pickable: true,
      widthScale: 20,
      widthMinPixels: 2,
      parameters: {
        depthMask: false,
      },
      getPath: (d) => d.path,
      getColor: (d) => {
        const animalId = d.animal_TagId;

        const animal = animalData.animalSummary.find(
          (animalItem) => parseInt(animalItem.id) === animalId
        );

        if (animal) {
          return animal.color;
        } else {
          return [0, 0, 0];
        }
      },
      getWidth: (d) => 5,
    }),

    new ScatterplotLayer({
      id: "scatterplot-layer",
      data: filteredScatterplotLayers,
      pickable: true,
      opacity: 0.8,
      stroked: true,
      filled: true,
      radiusScale: 6,
      radiusMinPixels: 1,
      radiusMaxPixels: 100,
      lineWidthMinPixels: 1,
      getPosition: (d) => [
        d.animal_location.coordinates[0],
        d.animal_location.coordinates[1],
      ],
      getFillColor: (d) => {
        const animalId = d.animal_TagId;

        const animal = animalData.animalSummary.find(
          (animalItem) => parseInt(animalItem.id) === animalId
        );

        if (animal) {
          return animal.color;
        } else {
          return [0, 0, 0];
        }
      },
      getRadius: 20,
      getLineColor: (d) => [0, 0, 0],
    }),
  ];

  return (
    <DeckGl
      initialViewState={{
        longitude: 0,
        latitude: 0,
        zoom: 3,
      }}
      controller={true}
      style={{
        height: "calc(100vh - 48px)",
        width: "calc(100vw - 77px)",
        position: "relative",
      }}
      layers={state ? [layer] : []}
      // layers={[filteredPathLayers, filteredScatterplotLayers]}
      // layers={[filteredPathLayers]}
    >
      <Map
        mapboxAccessToken="pk.eyJ1IjoiZ29kd2luLW1ha3lhbyIsImEiOiJjbGcxdnBobTAxcHA0M25xeWRycWhldDRhIn0.K6dLSpAqVOmeX8X4205dVQ"
        mapStyle="mapbox://styles/mapbox/streets-v9"
      ></Map>
    </DeckGl>
  );
};

export default MapComponent;
