
export class AuthInformation{

    constructor(
        public userId: number,
        public userEmail: string,
        public userFirstName: string,
        public userLastName: string,
        private _jwtToken: string,
        private _tokenExpirationDate:Date,
        public userRoleIds: number[]
    ){}

    get token() {
        if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
          return null;
        }
        return this._jwtToken;
    }

}

