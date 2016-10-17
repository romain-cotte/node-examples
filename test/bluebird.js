'use strict'

const Promise = require('bluebird')
const _fs = require('fs')
const should = require('should') //eslint-disable-line
const fs = Promise.promisifyAll(_fs)

/**
 * See https://github.com/petkaantonov/bluebird
 */
describe('bluebird', () => {
  it('should read package.json', done => {
    fs.readFileAsync('package.json')
      .then(JSON.parse)
      .then(json => {
        json.author.should.eql('Romain Cotte')
        done()
      })
      .catch(SyntaxError, () => {
        console.error('file contains invalid json') //eslint-disable-line
      })
      .catch(Promise.OperationalError, e => {
        console.error('unable to read file, because: ', e.message) //eslint-disable-line
      })
  })

  it('each', () => {
    let v = 1
    return Promise.each([1, 2], function (value) {
      new Promise((resolve, reject) => {
        value.should.eql(v++)
        return resolve(value)
      })
    })
  })

})
