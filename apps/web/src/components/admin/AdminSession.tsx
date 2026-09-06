"use client";

import { createContext, useContext } from "react";

export interface AdminUser {
  id: number;
  username: string;
  displayName: string;
  role: "owner" | "admin";
  permissions: string[];
  active: boolean;
  createdAt?: string;
}

export const PERMISSION_RESOURCES = [
  { key: "projects", label: "المشاريع" },
  { key: "services", label: "الخدمات" },
  { key: "articles", label: "المقالات" },
  { key: "settings", label: "الإعدادات والتواصل" },
  { key: "messages", label: "الرسائل" },
  { key: "tasks", label: "التاسكات" },
  { key: "users", label: "الأدمن والصلاحيات" },
] as const;

export function hasPermission(user: AdminUser | null, permission: string) {
  if (!user?.active) return false;
  return (
    user.role === "owner" ||
    user.permissions.includes(permission) ||
    (permission.endsWith(":read") &&
      user.permissions.includes(permission.replace(":read", ":write")))
  );
}

export const AdminSession = createContext<{
  user: AdminUser;
  can: (permission: string) => boolean;
  refresh: () => Promise<void>;
} | null>(null);

export function useAdmin() {
  const session = useContext(AdminSession);
  if (!session) throw new Error("Admin session is unavailable");
  return session;
}
