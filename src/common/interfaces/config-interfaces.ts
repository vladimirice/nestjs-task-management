export interface IDbConfig {
  readonly type: 'postgres';
  readonly port: number;
  readonly database: string;

  readonly host: string;
  readonly username?: string;
  readonly password?: string;
  readonly synchronize: boolean;
}

export interface IJwtConfig {
  readonly secret?: string;
  readonly expiresIn: number; // in seconds
}
