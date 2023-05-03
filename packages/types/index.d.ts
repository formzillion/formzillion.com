export type IJSONValue = string | number | boolean | IJSONObject | IJSONArray;
export type IJSONArray = Array<IJSONValue>;
export interface IJSONObject {
  [x: string]: IJSONValue;
}

export interface ITeams {
  id: string;
  name?: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  users?: IUser[];
  projects?: IProjects[];
  teamInvitations?: ITeamInvitation[];
}

export interface IUser {
  id: string;
  email: string;
  createdAt: string;
  updatedAt?: string;
  billingAddress?: IJSONObject;
  billingCustomerId?: string;
  features?: IJSONObject;
  firstName?: string;
  formCount?: number;
  fullName?: string;
  kind?: string;
  lastName?: string;
  planId: string;
  planName?: string;
  registeredOn?: string;
  verified: boolean;
  timezone?: string;
  avatar?: string;
  language?: string;
  title?: string;
  teams?: ITeams[];
}

export interface IProjects {
  id: string;
  name?: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  forms?: IForm[];
  teams?: ITeams[];
}

export interface ITeamInvitation {
  id: string;
  email?: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  teamId?: string;
  team?: ITeams;
}

export interface IForm {
  id: string;
  name: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  fields: IJSONObject;
  projectId?: string;
  sendToEmail?: string[];
  emailNotifications: boolean;
  formEnabled: boolean;
  submissionArchive: boolean;
  submissions?: IFormSubmissions[];
  project?: IProjects;
}

export interface IFormSubmissions {
  id: string;
  ip?: string;
  country?: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  fields?: IJSONObject;
  formId: string;
  form?: IForm;
}

export interface IApiRequestBody {
  method: string;
  headers?: any;
  body: any;
  referrerPolicy?: string;
  redirect?: string;
  credentials?: string;
  cache?: string;
  mode?: string;
}
