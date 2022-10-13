import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateSelectedTags, updateVisibleClusters } from '../../redux/clusterSlice';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import map_cursor from '../../assets/images/map_cursor.svg';
import map_svg from '../../assets/images/map-4.svg';
import shop_icon from '../../assets/images/shop--blue.svg';
import './styles.scss';

const Map = props => {
  const mapData = props.data;
  const [dataReady, setDataReady] = useState(false);
  const [mapHeight, setMapHeight] = useState(0);
  const [mapWidth, setMapWidth] = useState(0);
  const [data, setData] = useState([]);
  const ref = useRef(null);

  const {selectedTags} = useSelector((state) => state.cluster);
  const {visibleClusters} = useSelector((state) => state.cluster);
  const dispatch = useDispatch();

  // if two arr have common elements
  const checkForCommon = (arr1, arr2) => {
    for(let i=0; i<arr1.length; i++){
      for(let j=0; j<arr2.length; j++){
        if(arr1[i] == arr2[j]){
          return true;
        }
      }
    }
    return false;
}

  useEffect(() => {
    dispatch(updateSelectedTags({}))
  }, [])

  useEffect(() => {
    let newData = JSON.parse(JSON.stringify(mapData))

    if(newData[0]) {
      newData.forEach(cluster => {
        const labels = cluster.labels;
        let clusterTagList = [];
        for (const key in labels) {
          clusterTagList.push(labels[key])
        }
        
        // if found tag in selected tag list ?
        checkForCommon(clusterTagList, selectedTags) ? cluster.isSelected = true : cluster.isSelected = false;
      })
      dispatch(updateVisibleClusters(newData))
    }
  }, [mapWidth, mapHeight, selectedTags])

  useEffect(() => {
    setTimeout(() => {
      setDataReady(true);
    }, 1200);
  }, [data]);

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

      <div className='map__marks'>
        <div className='map__marks__mark'>
          <div className='dot dot--ready'></div>
          <div className='mark'>Ready</div>
        </div>
        <div className='map__marks__mark'>
          <div className='dot dot--offline'></div>
          <div className='mark'>Offline</div>
        </div>
      </div>

      <div
        className='map__map'
        ref={ref}
        onLoad={handleImageLoad}
      >
        {
          visibleClusters.map((cluster, index) => {
            return (
              <MapLabel
                data={cluster}
                dataReady={dataReady}
                index={index}
                hoverIndex={props.hoverIndex ? props.hoverIndex : null}
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
  const [active, setActive] = useState(false);

  const lat = parseFloat(getCoordinate(data.lat_long).lat);
  const lng = parseFloat(getCoordinate(data.lat_long).lng);

  return (
    <div
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      className={`map__map__dot ${dataReady ? 'map__map__dot--visible' : ''} ${active ? 'map__map__dot--active' : ''} ${props.hoverIndex ? props.hoverIndex == index ? 'map__map__dot--active' : '' : null} ${data.cluster_state == 'READY' ? 'is-ready' : 'is-offline'} ${data.isSelected ? 'is-selected' : ''}`}
      key={data.name}
      onClick={handleButtonClick ? () => handleButtonClick(index) : null}
      style={{ position: 'absolute', left: `${latLonToOffsets(lat, lng, mapWidth, mapHeight).x/mapWidth*100}%`, top: `${latLonToOffsets(lat, lng, mapWidth, mapHeight).y/mapHeight*100}%`}}
    >
      <div className='map__map__dot-label'>
        <div className={`label-inner`}>
          <img src={shop_icon} />
          <div>{`Store${index+1}`}</div>
        </div>
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
