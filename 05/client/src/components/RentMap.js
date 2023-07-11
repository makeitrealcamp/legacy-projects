import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import React from 'react'
/*global google*/



const RentMap = ({location}) => {
  const libraries = ["places"];
    const containerStyle = {
        width: '100%',
        height: '450px'
      };
      
      const center = location.coordinates;
      
      
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_API_GOOGLE,
        libraries: libraries,
      })
      // eslint-disable-next-line
      const [map, setMap] = React.useState(null)
    
      const onLoad = React.useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);
        
        setMap(map)
        // eslint-disable-next-line
      }, [])
      const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
      }, [])
    
      return isLoaded ? (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={13}
            onLoad={onLoad}
            onUnmount={onUnmount}
            options={{
                zoomControl: true,
                zoomControlOptions:{
                    position: google.maps.ControlPosition.TOP_RIGHT,
                },
                streetViewControl: true,
                streetViewControlOptions:{
                    position: google.maps.ControlPosition.RIGHT,
                },
                mapTypeControl: false,
                fullscreenControl:false,
                
              }}
          >
            
            <Marker position={center} />
          </GoogleMap>
      ) : <> <p>cargando</p></>
}

export default RentMap