'use strict'

const fs = require('fs')
const should = require('should')

describe('fs', () => {

  it('should write a file', done => {
    fs.writeFile('test/tmp/fs-writeFile.txt', 'Hello Node', err => {
      should.not.exist(err)
      done()
    })
  })

})
