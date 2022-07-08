export interface AuthPayload {
  id: number | string;
  name: null | string;
  email: string;
  roles: string[] | null;
  action: string[] | null;
}
