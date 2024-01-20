// import 'leaflet.markercluster/dist/MarkerCluster.css';
// import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
// import 'leaflet.markercluster/dist/leaflet.markercluster';
// import 'leaflet-routing-machine';
// import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
// import 'leaflet.markercluster';
import 'leaflet/dist/leaflet.css';
import React, { FC, useEffect } from 'react';
import { MapContainer, MapContainerProps, TileLayer, useMap } from 'react-leaflet';
import { LatLngBoundsExpression } from 'leaflet';


interface MapWrapperProps extends MapContainerProps {
  center?: [number, number];
  zoom?: number;
  topFilter?: boolean;
  isFullscreen?: boolean;
  bounds?: LatLngBoundsExpression;
  whenCreated: (map: L.Map) => void;
}

export const MapWrapper: FC<MapWrapperProps> = ({
                                                  center = [41.30939282650122, 69.25389328398325],
                                                  zoom = 8,
                                                  children,
                                                  topFilter = true,
                                                  isFullscreen,
                                                  bounds,
                                                  whenCreated,
                                                  ...props
                                                }) => {


  return (
    <>
      <MapContainer
        style={{
          width: '100%',
          height: '100vh',
        }}
        center={center}
        zoom={zoom}
        zoomControl={false}
        bounds={bounds}
        {...props}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        {children}
        <InsideMap whenCreated={whenCreated} />
      </MapContainer>
    </>
  );
};

const InsideMap = ({
                     whenCreated,
                   }: {
  whenCreated: (map: L.Map) => void;
}) => {

  const map = useMap();

  useEffect(() => {
    whenCreated(map);
  }, [map]);
  return null;
};