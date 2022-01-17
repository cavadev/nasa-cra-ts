import { Collection, Manifest, MetadataLocation, MetadataDetails } from "./interfaces";

export const fakeMetadataLocation:MetadataLocation  = {
  location:'https://images-assets.nasa.gov/image/PIA12235/metadata.json',
}

export const fakeMetadataDetails: MetadataDetails = {
  'AVAIL:MediaType': 'image',
  'AVAIL:Title': 'Nearside of the Moon',
  'AVAIL:Description': 'Nearside of the Moon descr',
}

export const fakeManifest: Manifest = {
  collection:{
    href:'http://images-api.nasa.gov/asset/PIA12235',
    items:[
      {href:'http://images-assets.nasa.gov/image/PIA12235/PIA12235~orig.jpg'},
      {href:'http://images-assets.nasa.gov/image/PIA12235/PIA12235~medium.jpg'},
    ]
  }
}

export const fakeCollection:Collection = {
  href: 'http://images-api.nasa.gov/search?q=moon&media_type=image,audio,',
  items: [{
    href: 'https://images-assets.nasa.gov/audio/Ep114_Value of the Moon/collection.json',
    data: [{
      center: 'JSC',
      title: 'Houston, We Have a Podcast. Episode 114: The Value of the Moon',
      nasa_id: 'Ep114_Value of the Moon',
      date_created: '2019-10-18T00:00:00Z',
      media_type: 'audio',
      description: 'Pat Ryan (Host): Houston, We Have a Podcast.'
    }],
  }, {
    href: 'https://images-assets.nasa.gov/image/PIA13517/collection.json',
    data: [{
      center: 'JPL',
      title: 'Color of the Moon',
      nasa_id: 'PIA13517',
      date_created: '2010-09-10T22:24:40Z',
      media_type: 'image',
      description: 'Color of the Moon'
    }],
  }],
  metadata: {
    total_hits: 2,
  },
};