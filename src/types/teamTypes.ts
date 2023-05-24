import { z } from "zod";
import { memberSchema, teamSchema } from "../utils/validations/teamValidations";

export interface IUser {
  email: string;
  objectId: string;
  firstName: string;
}

export type MemberOption = z.infer<typeof memberSchema>;
export type TeamInput = z.infer<typeof teamSchema>;
