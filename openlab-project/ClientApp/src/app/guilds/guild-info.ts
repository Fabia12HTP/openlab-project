export interface GuildInfo {
    id: number;
    name: string;
    capacity: number;
    description: string;
    membersCount: number;
}

export interface GuildCreate {
  name: string;
  description: string;
  maxmember: number;
}
