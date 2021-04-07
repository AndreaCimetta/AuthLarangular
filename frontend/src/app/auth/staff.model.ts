
export class UserPermission {
  name: string;
  description: string;
}

export class LoginUserData {
  id: number;
  username: string;
  email: string;
  role: number;
  roleLabel: string;
  permissions: UserPermission[];
  permissionsMap: {};

  public getPermissionsMap(): any {
    if (this.permissionsMap === undefined) {
      this.permissionsMap = {};
      if (this.permissions) {
        for (let perm of this.permissions) {
          this.permissionsMap[perm.name] = perm;
        }
      }
      return this.permissionsMap;
    }
  }

}

export class LoginWSResponse {
  id: number;
  token: string;
  userData: LoginUserData;
}



