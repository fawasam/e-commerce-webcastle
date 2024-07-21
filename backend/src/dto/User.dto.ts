import { IsEmail, Length } from "class-validator";

export class CreateUserInput {
  @Length(3, 12)
  username: string;

  @IsEmail()
  email: string;

  @Length(6, 12)
  password: string;
}

export class UserLoginInput {
  @IsEmail()
  email: string;

  @Length(6, 12)
  password: string;
}

export interface UserPayload {
  _id: string | any;
  email: string;
  verified: boolean;
  role: string;
}
