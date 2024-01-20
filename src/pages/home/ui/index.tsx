import React, { useEffect } from 'react';
import { MapWrapper } from '@/widgets/map-wrapper';
import { Flex, Loader, Select } from '@mantine/core';
import { Marker, Polyline, Popup, useMap, useMapEvents } from 'react-leaflet';
import s from './index.module.scss';
import { DatePickerInput } from '@mantine/dates';
import { actionsHomeStore, useHomeStore } from '../model';
import dayjs from 'dayjs';
import L, { LeafletEvent } from 'leaflet';
import { When } from 'react-if';
import { regionsLanLat } from '@/pages/home/model/lib';

const Icon = (color: string) => {
  return L.divIcon({
    html: `<div class='iconMarker' >
          <div class='icon' style='background: ${color}'></div>
        </div>`,
    className: 'svg-icon',
  });

};

export const Home = () => {
  useEffect(() => {
    actionsHomeStore.getDistrictData();
    actionsHomeStore.getWorkersData();
    actionsHomeStore.getPathWorker();
  }, []);

  const {
    districtData,
    selectedDistrictId,
    dateRangeValue,
    workersData,
    selectedWorker,
    workersPath,
    isLoading,
  } = useHomeStore(['districtData', 'selectedDistrictId', 'dateRangeValue', 'workersData', 'selectedWorker', 'workersPath', 'isLoading']);

  const findRegionCenterLanLat = (regionName: string) => {

    const foundCenter = regionsLanLat.find((item) => item.city.toLowerCase().includes(regionName.toLowerCase()));
    if (foundCenter) {
      return foundCenter;
    }
    return null;
  };

  const [map, setMap] = React.useState<L.Map | null>(null);

  const setMapOptions = (map: L.Map) => {
    setMap(map);
  }

  return (
    <>
      <div className={s.navWrapper}>
        <div className={s.filter}>

          <Select
            searchable
            label={'Viloyat'}
            placeholder={'Viloyat tanlang'}
            className={s.select}
            data={districtData}
            value={selectedDistrictId?.toString()}
            onChange={(value) => {
              if (value) {
                const regionName = districtData.find((item) => item.value === value)?.name;
                actionsHomeStore.setDistrictId(Number(value));
                if (regionName) {
                  const foundCenter = findRegionCenterLanLat(regionName);
                  if (foundCenter)
                  map?.flyTo(
                    [foundCenter.lat, foundCenter.lng],
                    10,
                    {
                      animate: true,
                      duration: 1,
                    },
                  )
                }
              }
            }}
          />

          <Select
            searchable
            clearable
            label={'Ishchilar'}
            placeholder={'Ishchi tanlang'}
            className={s.select}
            data={workersData}
            value={selectedWorker}
            onChange={actionsHomeStore.setWorkerId}
          />

          <DatePickerInput
            className={s.inputWrapper}
            classNames={{
              input: s.input,
            }}
            valueFormat='DD/MM/YYYY'
            type='range'
            label='Sana'
            // placeholder='Sana tanlang'
            value={dateRangeValue}
            onChange={actionsHomeStore.setDateRangeValue}
          />

          <When condition={isLoading}>
            <Flex bg={'#fff'} p={2.5}>
              <Loader size={'35px'} />
            </Flex>
          </When>

        </div>
      </div>
      <MapWrapper
        whenCreated={setMapOptions}
      >

        {
          workersPath.length > 0 && workersPath.map((item, index) =>
            <div key={index}>
              {
                item.markers.map((i, index) =>
                  <Marker position={i.coordination} key={index} icon={Icon(i.color)}>
                    <Popup>
                      {
                        item.full_name + ' - ' + dayjs(i.created_at).format('DD/MM/YYYY HH:mm')
                      }
                    </Popup>
                  </Marker>,
                )
              }
              {
                item.polyline.map((j, index) =>
                  <Polyline key={index} pathOptions={{
                    color: j.color,
                    dashOffset: '10',
                  }} positions={item.polyline.map((j) => j.coordination)} />,
                )
              }
            </div>,
          )
        }

      </MapWrapper>
    </>
  );
};