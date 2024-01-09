import { sql } from 'slonik';
import should from 'should' //eslint-disable-line

describe('slonik', () => {
  it('method name', async () => {
    const myVar1 = 'a';
    const myVar2 = 'b';
    const query = sql.unsafe`SELECT ${myVar2}`;
    const mainQuery = sql.unsafe`SELECT *, ${myVar1} FROM (${query})`;
    mainQuery.sql.should.eql('SELECT *, $1 FROM (SELECT $2)');
  });
});
