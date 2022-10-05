import { MapContainer, TileLayer, Marker, GeoJSON, Popup } from "react-leaflet";
import React, { Component } from 'react';
import countries from "./borders_4326.json"
import "./styles.css";

export default class Map extends Component {

  constructor(props) {
    super(props);
    this.state = {
    }
}
  render() {
    const {data} = this.props;
    return (
      <div className="map">
        <MapContainer center={[14, -80]} zoom={4} >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://stamen-tiles.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.png"
          />
          {data.map((item, index) => (
              <Marker key={index} position={[item.ITD_Y, item.ITD_X]}>
                <Popup>
                  OID: {item.OID_}<br/>
                  CaseID: {item.CASENUMBER}<br/>
                  Office: {item.Office}
                </Popup>
              </Marker>
          ))}
          <GeoJSON data={[]} />
        </MapContainer>
      </div>
    );
  }
}