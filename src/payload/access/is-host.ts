import { AccessArgs } from 'payload';
export function isHost(args: AccessArgs) {
  if (!args.req.user) return false;
  return args.req.user.role === 'host';
}
