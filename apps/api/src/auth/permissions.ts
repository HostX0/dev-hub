import { SetMetadata } from '@nestjs/common';
import { users } from '../db/schema.js';
export const RESOURCES = [
  'projects',
  'services',
  'articles',
  'settings',
  'messages',
  'tasks',
  'users',
] as const;
export const PERMISSIONS = RESOURCES.flatMap((r) => [
  `${r}:read`,
  `${r}:write`,
]);
export const PERMISSION_META = 'cms:permissions';
export const RequirePermissions = (...permissions: string[]) =>
  SetMetadata(PERMISSION_META, { permissions, any: false });
export const RequireAnyPermission = (...permissions: string[]) =>
  SetMetadata(PERMISSION_META, { permissions, any: true });
export const userFields = {
  id: users.id,
  username: users.username,
  displayName: users.displayName,
  role: users.role,
  permissions: users.permissions,
  active: users.active,
};
export type PublicUser = {
  id: number;
  username: string;
  displayName: string;
  role: 'owner' | 'admin';
  permissions: string[];
  active: boolean;
};
export function hasPermission(user: PublicUser, key: string): boolean {
  return (
    user.active &&
    (user.role === 'owner' ||
      user.permissions.includes(key) ||
      (key.endsWith(':read') &&
        user.permissions.includes(key.replace(':read', ':write'))))
  );
}
export function safeUser(user: PublicUser): PublicUser {
  return {
    id: user.id,
    username: user.username,
    displayName: user.displayName,
    role: user.role,
    permissions: user.permissions,
    active: user.active,
  };
}
