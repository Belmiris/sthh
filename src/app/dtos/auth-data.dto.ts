import { AuthData } from 'src/app/models/auth-data.model';
import { NameValue } from "src/app/models/name-value.model";

export class AuthDataDTO {
    AuthData: AuthData;
    AuthToken: string;
    Errors: NameValue[];
}
