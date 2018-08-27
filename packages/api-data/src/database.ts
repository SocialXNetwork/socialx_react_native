import Gun from 'gun';

export const database = (servers: string[]) => new Gun(servers);
