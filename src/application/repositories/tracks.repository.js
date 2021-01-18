const qs = require('qs');

const BaseRepository = require('./base.repository');

class Tracks extends BaseRepository {
  constructor() {
    super();
    this.spotifyApiToken = '';
  }

  async refreshToken() {
    const {
      data: { access_token: newToken }
    } = await app.api.spotifyAccounts.refreshToken({
      data: qs.stringify({
        grant_type: 'refresh_token',
        refresh_token: process.env.SPOTIFY_REFRESH_API_TOKEN
      }) || { data: {} },
      config: {
        headers: {
          'content-type': 'application/x-www-form-urlencoded'
        }
      }
    });
    this.spotifyApiToken = newToken;
  }

  async getTracks({ market, query, limit, page }) {
    await this.refreshToken();
    return app.api.spotify.getTracks({
      url: {
        market,
        query,
        limit,
        offset: page * limit
      },
      config: {
        headers: { Authorization: `Bearer ${this.spotifyApiToken}` }
      }
    });
  }
}

module.exports = Tracks;
