export * from './domain';
export * from './team';
export * from './event';
export * from './activity';

export interface AppStatus {
  initialized: boolean;
  version: string;
  environment: string;
}


