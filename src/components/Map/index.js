import React, { useRef, useState, useEffect, useMemo } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import map_cursor from '../../assets/images/map_cursor.svg';
import map_svg from '../../assets/images/map-4.svg';
import './styles.scss';

const Map = props => {
  const mapData = props.data;
  const [dataReady, setDataReady] = useState(false);
  const [mapHeight, setMapHeight] = useState(0);
  const [mapWidth, setMapWidth] = useState(0);
  const [data, setData] = useState([]);
  const ref = useRef(null);

  useEffect(() => {
    console.log(mapWidth)
    setData(mapData);
  }, [mapWidth, mapHeight]);

  useEffect(() => {
    setTimeout(() => {
      setDataReady(true);
    }, 1200);
  }, data);

  const handleImageLoad = () => {
    setTimeout(() => {
      setMapHeight(ref.current.offsetHeight);
      setMapWidth(ref.current.offsetWidth);
    }, 300);
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
        {
          data.map((cluster, index) => {
            return (
              <MapLabel
                data={cluster}
                dataReady={dataReady}
                index={index}
                activeIndex={props.activeIndex}
                mapWidth={mapWidth}
                mapHeight={mapHeight}
                handleButtonClick={props.handleButtonClick}
              />
            )
          })
        }
        {/* <LazyLoadImage
          effect="blur"
          src={map_svg}
        /> */}
        <img className='map__map__map' src={map_svg} />
      </div>
    </div>
  )
}

export default Map;

const MapLabel = props => {
  const {data, dataReady, handleButtonClick, index, mapWidth, mapHeight} = props;
  console.log(data)
  const [active, setActive] = useState(false);

  const lat = parseFloat(getCoordinate(data.lat_long).lat);
  const lng = parseFloat(getCoordinate(data.lat_long).lng);

  return (
    <div
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      className={`map__map__dot ${dataReady ? 'map__map__dot--visible' : ''} ${active ? 'map__map__dot--active' : ''} ${props.activeIndex == index ? 'map__map__dot--active' : ''}`}
      key={data.name}
      onClick={handleButtonClick ? handleButtonClick : null}
      style={{ position: 'absolute', left: `${latLonToOffsets(lat, lng, mapWidth, mapHeight).x/mapWidth*100}%`, top: `${latLonToOffsets(lat, lng, mapWidth, mapHeight).y/mapHeight*100}%`}}
    >
      <div className='map__map__dot-label'>
        <div className={`label-inner`}>{`Store${index+1}`}</div>
      </div>
    </div>
  )
}

const getCoordinate = lat_long => {
  const lat = lat_long.latitude;
  const lng = lat_long.longitude;
  return {
    lat: lat.charAt(lng.length - 1) === ('S' || 's') ? ('-' + lat.replace(/\s/g,'.').slice(0, -2)) : lat.replace(/\s/g,'.').slice(0, -2),
    lng: lng.charAt(lng.length - 1) === ('W' || 'w') ? ('-' + lng.replace(/\s/g,'.').slice(0, -2)) : lng.replace(/\s/g,'.').slice(0, -2)
  }
}

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
