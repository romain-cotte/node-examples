'use strict'

const nock = require('nock')
const rp = require('request-promise')
const should = require('should')

describe('Nock', () => {

  let url = 'http://test.com'
  let scope
  before(() => {
    scope = nock(url)
      .post('/users')
      .reply(201, { id: '123456' })
  })

  it('post test', done => {
    const options = {
      url: `${url}/users`,
      method: 'POST',
      headers: { authorization: `Bearer token` },
      body: {
        username: 'username',
        email: 'test@test.com'
      },
      json: true,
      resolveWithFullResponse: true
    }

    rp(options)
      .then(({ statusCode, body }) => {
        statusCode.should.eql(201)
        body.should.eql({ id: '123456' })
        done()
      })
      .catch(done)
  })

})
