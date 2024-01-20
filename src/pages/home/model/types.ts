export interface IDistrict {
  count: number,
  next: any,
  previous: any,
  results: IDistrictResult[]
}

export interface IDistrictResult {
  id: number,
  name: string
}

export interface IWorkerParams {
  district: number,
  role: string,
}

export interface IWorker {
  id: number,
  last_name: string,
  first_name: string,
}

export interface IWorkerDayLocationParams extends Omit<IWorkerParams, 'role'>{
  start: string,
  end: string,
  user: string | null,
}

export interface IWorkerPath {
  created_by: {
    id: number,
    first_name: string,
    last_name: null | string,
    district: {
      id: number,
      name: string
    }
  },
  location: {
    lan: string,
    lat: string,
    created_at: string
  }[]
}

export interface ILocationsWorker {
  id: number,
  full_name: string,
  markers: {
    coordination: [number, number]
    created_at: string,
    color: string
  }[]
  polyline: {
    coordination: [number, number]
    color: string,
  }[]
}

export interface IRegionData {
  city: string,
  lat: number,
  lng: number,
}