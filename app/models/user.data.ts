export class User {
  constructor(
    public email: string,
    public id: string,
    private _token: string,
    private _tokenExpiratinDate: Date
  ) {}
  get token() {
    if (!this._tokenExpiratinDate || new Date() > this._tokenExpiratinDate) {
      return null;
    }
    return this._token;
  }
}
