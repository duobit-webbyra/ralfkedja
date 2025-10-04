import { AccessArgs } from 'payload';
import { isHost } from './is-host';

export function isAdmin(args: AccessArgs) {
  if (!args.req.user) return false;
  return args.req.user.role === 'admin' || isHost(args);
}
