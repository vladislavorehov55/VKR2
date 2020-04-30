import React from "react";
import { YMaps, Map, Placemark } from 'react-yandex-maps';
import {useSelector} from "react-redux";

export const MyMap = () => {
    const {objects} = useSelector(state => state.objects);
    const mapState = { center: [Number(objects[0].latitude), Number(objects[0].longitude)], zoom: 15 };
    return(
        <YMaps>
            <Map state={mapState}>
            </Map>
        </YMaps>
    )
};

