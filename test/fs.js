import fs from 'fs'
import should from 'should'

describe('fs', () => {

  it('should write a file', done => {
    fs.writeFile('test/tmp/fs-writeFile.txt', 'Hello Node', err => {
      should.not.exist(err)
      done()
    })
  })


})
