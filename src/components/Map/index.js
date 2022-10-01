import React, { useRef, useState, useEffect, useMemo } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import map_cursor from '../../assets/images/map_cursor.svg';
import map_svg from '../../assets/images/map-4.svg';
import map from '../../assets/images/map-3.jpg';
import MapButton from './MapButton';
import './styles.scss';
// import axios from 'axios';

const Map = props => {
  const mapData = props.data;
  const [mapHeight, setMapHeight] = useState(0);
  const [mapWidth, setMapWidth] = useState(0);
  const [data, setData] = useState([]);
  const ref = useRef(null);

  useEffect(() => {
    // getCoordinate(data[0].lat_long.latitude)
    // console.log(mapWidth, mapHeight)
    setTimeout(() => {
      setData(mapData);
    }, 2000);
  }, [mapWidth, mapHeight]);

  useEffect(() => {
    console.log(data)
  }, data)

  const handleImageLoad = () => {
    // setMapHeight(ref.current.clientHeight);
    setMapHeight(ref.current.offsetHeight);
    setMapWidth(ref.current.offsetWidth);
  }

  const getCoordinate = lat_long => {
    const lat = lat_long.latitude;
    const lng = lat_long.longitude;
    return {
      lat: lat.charAt(lng.length - 1) === ('S' || 's') ? ('-' + lat.replace(/\s/g,'.').slice(0, -2)) : lat.replace(/\s/g,'.').slice(0, -2),
      lng: lng.charAt(lng.length - 1) === ('W' || 'w') ? ('-' + lng.replace(/\s/g,'.').slice(0, -2)) : lng.replace(/\s/g,'.').slice(0, -2)
    }
  }

  return (
    <div className='map'>
      {
        props.label ?
        <div className='map__label'>
          <img className='map__label__icon' src={map_cursor} />
          <div className='map__label__text'>click store to view details</div>
        </div> :
        null
      }

      <div
        className='map__map'
        ref={ref}
        onLoad={handleImageLoad}
      >
        {/* {
          props.buttons ?
          props.buttons.map(data =>
          <div key={data.name} onClick={props.handleButtonClick}>
            <MapButton
              text={data.name}
            />
          </div>
          ) :
          null
        } */}
        {
          data.map((cluster, index) => {
            const lat = parseFloat(getCoordinate(cluster.lat_long).lat);
            const lng = parseFloat(getCoordinate(cluster.lat_long).lng);
            // const {lat, lng} = getCoordinate(cluster.lat_long);
            // console.log(parseFloat(lat), lng)
            return (
              // <div
              //   className='test'
              //   style={{left: `${latLonToOffsets(lat, lng, mapWidth, mapHeight).x/mapWidth*100}%`, top: `${latLonToOffsets(lat, lng, mapWidth, mapHeight).y/mapHeight*100}%`}}
              // >
              //   {/* {cluster.name} */}
              // </div>
              <div className='map__map__dot' key={cluster.name} onClick={props.handleButtonClick} style={{position: 'absolute', left: `${latLonToOffsets(lat, lng, mapWidth, mapHeight).x/mapWidth*100}%`, top: `${latLonToOffsets(lat, lng, mapWidth, mapHeight).y/mapHeight*100}%`}}>
                <MapButton
                  text={`Store${index}`}
                  data={cluster}
                />
                <div className='map__map__dot-info'>
                  {/* {`Store${index}`} */}
                </div>
              </div>
            )
          })
        }
        <LazyLoadImage
          effect="blur"
          src={map_svg}
        />
      </div>
    </div>
  )
}

export default Map;

function latLonToOffsets(latitude, longitude, mapWidth, mapHeight) {
  const FE = 180; // false easting
  const radius = mapWidth / (2 * Math.PI);

  const latRad = degreesToRadians(latitude);
  const lonRad = degreesToRadians(longitude + FE);

  const x = lonRad * radius;

  const yFromEquator = radius * Math.log(Math.tan(Math.PI / 4 + latRad / 2));
  const y = mapHeight / 2 - yFromEquator;

  return { x, y };
}

function degreesToRadians(degrees) {
  return (degrees * Math.PI) / 180;
}

function useIsInViewport(ref) {
  const [isIntersecting, setIsIntersecting] = useState(false);

  const observer = useMemo(
    () =>
      new IntersectionObserver(([entry]) =>
        setIsIntersecting(entry.isIntersecting),
      ),
    [],
  );

  useEffect(() => {
    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [ref, observer]);

  return isIntersecting;
}