export interface Asset {
  href: string,
  data: AssetData[],
  links?: AssetLink[],
}

export interface AssetData {
  center: string,
  title: string,
  nasa_id: string,
  date_created: string,
  media_type: string,
  description: string,
}

export interface AssetLink {
  href: string,
  rel: string,
  render: string,
}

export interface Collection {
  href: string,
  items: Asset[],
  metadata: {
    total_hits: number,
  },
}

export interface Manifest {
  collection: {
    href: string,
    items: {
      href: string,
    }[],
  }
}

export interface MetadataDetails {
  'AVAIL:Title' : string,
  'AVAIL:Description': string,
  'AVAIL:MediaType': string,
}

export interface MetadataLocation {
  location : string,
}

export interface SearchFilters {
  images: boolean,
  audio: boolean,
}