import { YMaps, Map as YMap, Placemark, ZoomControl } from "@iminside/react-yandex-maps";

import cn from "./contacts.module.less";

const coordinates = [43.354548, 45.633455];
const zoom = 18;

const Map = () => {
  return (
    <YMaps>
      <YMap defaultState={{ center: coordinates, zoom }} className={cn.map}>
        <Placemark geometry={coordinates} />
        <ZoomControl />
      </YMap>
    </YMaps>
  );
};

export { Map, coordinates, zoom };
