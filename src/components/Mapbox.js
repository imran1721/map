import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';

import 'mapbox-gl/dist/mapbox-gl.css';
import { LeftSideBar } from './LeftSideBar';
import { RightSideBar } from './RightSideBar';
import apartmentData from "../../src/assets/data/apartment.json"
import localityData from "../../src/assets/data/locality.json"
import {ResizableDiv} from './Resize';

const token = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN

const LAYER_CONFIG = [
  {
    id: 0,
    name: "Apartment",
    value: "apartment",
    data: apartmentData,
    visibility: "visible",
    layers: [{
      type: "line",
      paint: {
        'line-color': '#097969',
        'line-width': 0.7
      }
    },
    {
      type: "fill",
      paint: {
        'fill-color': '#097969',
        'fill-opacity': 0.3
      }
    }

    ]
  },

  {
    id: 1,
    name: "Locality",
    value: "locality",
    data: localityData,
    visibility: "visible",
    layers: [{
      type: "line",
      paint: {
        'line-color': '#FF5733',
        'line-width': 0.7
      }
    },
    {
      type: "fill",
      paint: {
        'fill-color': '#FF5733',
        'fill-opacity': 0.3
      }
    }
    ]
  }
]

const Mapbox = () => {
  const [layers, setLayers] = useState(LAYER_CONFIG)
  const [selectedLayer, setSelectedLayer] = useState({})
  const [isMapLoading, setIsMapLoading] = useState(true);
  const mapContainerRef = useRef();
  const mapRef = useRef();

  useEffect(() => {
    mapboxgl.accessToken = token

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/outdoors-v12',
      center: [77.020643, 28.51346],
      zoom: 12
    });

    mapRef.current.on('load', () => {
      setIsMapLoading(false)

      LAYER_CONFIG.forEach(({ value, visibility, data, layers }) => {
        if (!mapRef.current.getSource(value)) {
          mapRef.current.addSource(value, {
            type: 'geojson',
            data: data
          })

          layers.forEach(({ type, paint }) => {
            mapRef.current.addLayer({
              id: `${value}${type}`,
              type,
              source: value,
              layout: {
                visibility,
              },
              paint
            })
          })
        }
      })
    });
  }, []);

  const handleLayerVisibility = (clickedLayer) => {
    const fillLayerVisibility = mapRef.current.getLayoutProperty(`${clickedLayer}fill`, 'visibility');
    const newVisibility = fillLayerVisibility === 'visible' ? 'none' : 'visible';
    setLayers(prev => prev.map(layer =>
      layer.value === clickedLayer ? { ...layer, visibility: newVisibility } : layer
    ));

  
    mapRef.current.setLayoutProperty(`${clickedLayer}fill`, 'visibility', newVisibility);
    mapRef.current.setLayoutProperty(`${clickedLayer}line`, 'visibility', newVisibility);
  };

  return (
    <div>
      <div
        id="map"
        ref={mapContainerRef}
        style={{ height: '100vh', width: '100vw' }}
      />
      
      {!isMapLoading && <>
        <LeftSideBar layers={layers} handleLayerVisibility={handleLayerVisibility} setSelectedLayer={setSelectedLayer}/>
        {Object.keys(selectedLayer).length && <RightSideBar selectedLayer={selectedLayer}/>}
      </>}
      
    </div>
  );
};

export default Mapbox;
