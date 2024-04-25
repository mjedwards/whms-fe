import { OrganizationModel } from './index.model';

describe('OrganizationModel', () => {
  it('should return instance variables', () => {
    const orgM = new OrganizationModel();

    expect(orgM.email).toBe('emmajerry2016@gmail.com');
    expect(orgM.phone).toBe('+49152191222445');
    expect(orgM.address).toBe('foo bar baz 1, Berlin Germany');
  });
});