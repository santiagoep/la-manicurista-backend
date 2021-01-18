const { Serializer } = require('jsonapi-serializer');

const serializeArtists = (artists) =>
  artists.map(({ name }) => ({
    name
  }));

const serializeTracks = (tracks) =>
  tracks.map(({ artists, album, preview_url: preview, name }) => ({
    name,
    imgPreviews: {
      small: {
        src: album?.images[2]?.url,
        alt: name
      },
      medium: { src: album?.images[1]?.url, alt: name },
      large: { src: album?.images[0]?.url, alt: name }
    },
    preview,
    artists: serializeArtists(artists)
  }));

module.exports = {
  tracksSerializer: (meta = {}) =>
    new Serializer('tracks', {
      meta: {
        ...meta,
        limit: ({ limit }) => limit,
        offset: ({ offset }) => offset,
        total: ({ total }) => total
      },
      pluralizeType: false,
      keyForAttribute: 'camelCase',
      topLevelLinks: {
        previous: ({ previous }) => previous,
        next: ({ next }) => next
      },
      attributes: ['items'],
      transform: ({ items, ...rest }) => {
        return {
          ...rest,
          items: serializeTracks(items)
        };
      }
    })
};
