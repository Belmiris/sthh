import { NameValue } from "src/app/models/name-value.model";

export class DatabaseDTO {
    AuthToken: string;
    Errors: NameValue[];
    Values: NameValue[];
}