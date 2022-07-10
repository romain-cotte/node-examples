const { sql } = require('slonik');
const should = require('should'); // eslint-disable-line

describe('slonik', () => {
  it('method name', async () => {
    const myVar1 = 'a';
    const myVar2 = 'b';
    const query = sql`SELECT ${myVar2}`;
    const mainQuery = sql`SELECT *, ${myVar1} FROM (${query})`;
    mainQuery.should.eql({
      sql: 'SELECT *, $1 FROM (SELECT $2)',
      type: 'SLONIK_TOKEN_SQL',
      values: [ 'a', 'b' ]
    });
  });
});
