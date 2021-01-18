const { OK, BAD_REQUEST } = require('http-status-codes');

describe('Tracks', () => {
  it('GET getTracks should return 200', async () => {
    const response = await app
      .requestWithTracingHeaders(
        'get',
        '/tracks?market=ES&query=A&limit=10&page=0'
      )
      .send();
    console.log(response);
    expect(response.statusCode).toBe(OK);
  });
  it('GET getTracks should return 400', async () => {
    const response = await app
      .requestWithTracingHeaders('get', '/tracks')
      .send();
    expect(response.statusCode).toBe(BAD_REQUEST);
  });
});
