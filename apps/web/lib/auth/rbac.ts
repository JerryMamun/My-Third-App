// ═══════════════════════════════════════════════════
// Role-Based Access Control (RBAC)
// Bluebird Online — Staff Permission Matrix
// ═══════════════════════════════════════════════════

export type StaffRole =
  | "SUPER_ADMIN"
  | "ADMIN"
  | "NOC_ENGINEER"
  | "TECHNICIAN"
  | "BILLING_MANAGER"
  | "SALES_MANAGER"
  | "SUPPORT_AGENT"
  | "FIELD_ENGINEER";

export type Permission =
  // Dashboard
  | "dashboard:read"
  | "dashboard:admin"
  | "dashboard:noc"

  // Customers
  | "customers:read"
  | "customers:create"
  | "customers:update"
  | "customers:delete"
  | "customers:export"

  // Subscriptions
  | "subscriptions:read"
  | "subscriptions:create"
  | "subscriptions:update"
  | "subscriptions:terminate"
  | "subscriptions:suspend"

  // Billing
  | "billing:read"
  | "billing:create"
  | "billing:update"
  | "billing:delete"
  | "billing:refund"
  | "billing:export"

  // Invoices
  | "invoices:read"
  | "invoices:create"
  | "invoices:update"
  | "invoices:send"
  | "invoices:cancel"

  // Payments
  | "payments:read"
  | "payments:verify"
  | "payments:refund"

  // Tickets
  | "tickets:read"
  | "tickets:create"
  | "tickets:update"
  | "tickets:assign"
  | "tickets:escalate"
  | "tickets:resolve"
  | "tickets:delete"

  // Network
  | "network:read"
  | "network:config"
  | "network:reboot"
  | "network:provision"

  // Routers (MikroTik)
  | "routers:read"
  | "routers:config"
  | "routers:reboot"
  | "routers:backup"

  // ONU
  | "onu:read"
  | "onu:reboot"
  | "onu:provision"

  // POP
  | "pop:read"
  | "pop:manage"

  // Coverage
  | "coverage:read"
  | "coverage:manage"

  // Packages
  | "packages:read"
  | "packages:create"
  | "packages:update"
  | "packages:delete"

  // Staff
  | "staff:read"
  | "staff:create"
  | "staff:update"
  | "staff:delete"
  | "staff:permissions"

  // Reports
  | "reports:read"
  | "reports:export"
  | "reports:financial"
  | "reports:network"

  // Settings
  | "settings:read"
  | "settings:update"

  // Maintenance
  | "maintenance:read"
  | "maintenance:schedule"
  | "maintenance:execute"

  // Notifications
  | "notifications:read"
  | "notifications:send"

  // Audit
  | "audit:read"

  // API
  | "admin:api"
  | "noc:api"
  | "billing:api";

// ═══════════════════════════════════════════════════
// Role Permission Matrix
// ═══════════════════════════════════════════════════

const ROLE_PERMISSIONS: Record<StaffRole, Permission[]> = {
  SUPER_ADMIN: [
    // All permissions
    "dashboard:read", "dashboard:admin", "dashboard:noc",
    "customers:read", "customers:create", "customers:update", "customers:delete", "customers:export",
    "subscriptions:read", "subscriptions:create", "subscriptions:update", "subscriptions:terminate", "subscriptions:suspend",
    "billing:read", "billing:create", "billing:update", "billing:delete", "billing:refund", "billing:export",
    "invoices:read", "invoices:create", "invoices:update", "invoices:send", "invoices:cancel",
    "payments:read", "payments:verify", "payments:refund",
    "tickets:read", "tickets:create", "tickets:update", "tickets:assign", "tickets:escalate", "tickets:resolve", "tickets:delete",
    "network:read", "network:config", "network:reboot", "network:provision",
    "routers:read", "routers:config", "routers:reboot", "routers:backup",
    "onu:read", "onu:reboot", "onu:provision",
    "pop:read", "pop:manage",
    "coverage:read", "coverage:manage",
    "packages:read", "packages:create", "packages:update", "packages:delete",
    "staff:read", "staff:create", "staff:update", "staff:delete", "staff:permissions",
    "reports:read", "reports:export", "reports:financial", "reports:network",
    "settings:read", "settings:update",
    "maintenance:read", "maintenance:schedule", "maintenance:execute",
    "notifications:read", "notifications:send",
    "audit:read",
    "admin:api", "noc:api", "billing:api",
  ],

  ADMIN: [
    "dashboard:read", "dashboard:admin",
    "customers:read", "customers:create", "customers:update", "customers:export",
    "subscriptions:read", "subscriptions:create", "subscriptions:update", "subscriptions:suspend",
    "billing:read", "billing:create", "billing:update", "billing:export",
    "invoices:read", "invoices:create", "invoices:update", "invoices:send", "invoices:cancel",
    "payments:read", "payments:verify",
    "tickets:read", "tickets:create", "tickets:update", "tickets:assign", "tickets:escalate", "tickets:resolve",
    "network:read", "network:config",
    "routers:read", "routers:config",
    "onu:read", "onu:provision",
    "pop:read", "pop:manage",
    "coverage:read", "coverage:manage",
    "packages:read", "packages:create", "packages:update",
    "staff:read", "staff:create", "staff:update",
    "reports:read", "reports:export", "reports:financial",
    "settings:read", "settings:update",
    "maintenance:read", "maintenance:schedule",
    "notifications:read", "notifications:send",
    "audit:read",
    "admin:api", "billing:api",
  ],

  NOC_ENGINEER: [
    "dashboard:read", "dashboard:noc",
    "customers:read",
    "subscriptions:read", "subscriptions:suspend",
    "tickets:read", "tickets:update", "tickets:assign", "tickets:resolve",
    "network:read", "network:config", "network:reboot", "network:provision",
    "routers:read", "routers:config", "routers:reboot", "routers:backup",
    "onu:read", "onu:reboot", "onu:provision",
    "pop:read", "pop:manage",
    "coverage:read",
    "packages:read",
    "reports:read", "reports:network",
    "maintenance:read", "maintenance:schedule", "maintenance:execute",
    "notifications:read",
    "noc:api",
  ],

  TECHNICIAN: [
    "dashboard:read",
    "customers:read", "customers:update",
    "subscriptions:read",
    "tickets:read", "tickets:update", "tickets:resolve",
    "network:read", "network:provision",
    "routers:read",
    "onu:read", "onu:reboot",
    "pop:read",
    "coverage:read",
    "packages:read",
    "maintenance:read", "maintenance:execute",
    "notifications:read",
  ],

  BILLING_MANAGER: [
    "dashboard:read",
    "customers:read", "customers:export",
    "subscriptions:read",
    "billing:read", "billing:create", "billing:update", "billing:export",
    "invoices:read", "invoices:create", "invoices:update", "invoices:send", "invoices:cancel",
    "payments:read", "payments:verify", "payments:refund",
    "tickets:read", "tickets:update",
    "packages:read",
    "reports:read", "reports:export", "reports:financial",
    "settings:read",
    "notifications:read", "notifications:send",
    "billing:api",
  ],

  SALES_MANAGER: [
    "dashboard:read",
    "customers:read", "customers:create", "customers:update",
    "subscriptions:read", "subscriptions:create",
    "billing:read",
    "invoices:read",
    "tickets:read", "tickets:create",
    "coverage:read", "coverage:manage",
    "packages:read",
    "reports:read", "reports:export",
    "notifications:read", "notifications:send",
  ],

  SUPPORT_AGENT: [
    "dashboard:read",
    "customers:read", "customers:update",
    "subscriptions:read",
    "tickets:read", "tickets:create", "tickets:update", "tickets:assign", "tickets:resolve",
    "packages:read",
    "notifications:read", "notifications:send",
  ],

  FIELD_ENGINEER: [
    "dashboard:read",
    "customers:read",
    "tickets:read", "tickets:update", "tickets:resolve",
    "network:read",
    "onu:read",
    "pop:read",
    "maintenance:read", "maintenance:execute",
    "notifications:read",
  ],
};

// ═══════════════════════════════════════════════════
// Permission Helpers
// ═══════════════════════════════════════════════════

export function hasPermission(role: StaffRole | undefined, permission: Permission): boolean {
  if (!role) return false;
  const permissions = ROLE_PERMISSIONS[role];
  return permissions.includes(permission);
}

export function hasAnyPermission(role: StaffRole | undefined, permissions: Permission[]): boolean {
  if (!role) return false;
  return permissions.some((p) => hasPermission(role, p));
}

export function hasAllPermissions(role: StaffRole | undefined, permissions: Permission[]): boolean {
  if (!role) return false;
  return permissions.every((p) => hasPermission(role, p));
}

export function getRolePermissions(role: StaffRole): Permission[] {
  return ROLE_PERMISSIONS[role] || [];
}

export function getRoleDisplayName(role: StaffRole): string {
  const displayNames: Record<StaffRole, string> = {
    SUPER_ADMIN: "Super Administrator",
    ADMIN: "Administrator",
    NOC_ENGINEER: "NOC Engineer",
    TECHNICIAN: "Network Technician",
    BILLING_MANAGER: "Billing Manager",
    SALES_MANAGER: "Sales Manager",
    SUPPORT_AGENT: "Support Agent",
    FIELD_ENGINEER: "Field Engineer",
  };
  return displayNames[role] || role;
}

export function getRoleBadgeColor(role: StaffRole): string {
  const colors: Record<StaffRole, string> = {
    SUPER_ADMIN: "bg-red-500/10 text-red-500 border-red-500/20",
    ADMIN: "bg-orange-500/10 text-orange-500 border-orange-500/20",
    NOC_ENGINEER: "bg-cyan-500/10 text-cyan-500 border-cyan-500/20",
    TECHNICIAN: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    BILLING_MANAGER: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    SALES_MANAGER: "bg-violet-500/10 text-violet-500 border-violet-500/20",
    SUPPORT_AGENT: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    FIELD_ENGINEER: "bg-slate-500/10 text-slate-500 border-slate-500/20",
  };
  return colors[role] || "bg-gray-500/10 text-gray-500";
}

// ═══════════════════════════════════════════════════
// Permission Groups (for UI)
// ═══════════════════════════════════════════════════

export const PERMISSION_GROUPS = [
  {
    name: "Dashboard",
    permissions: ["dashboard:read", "dashboard:admin", "dashboard:noc"],
  },
  {
    name: "Customers",
    permissions: [
      "customers:read", "customers:create", "customers:update",
      "customers:delete", "customers:export",
    ],
  },
  {
    name: "Subscriptions",
    permissions: [
      "subscriptions:read", "subscriptions:create", "subscriptions:update",
      "subscriptions:terminate", "subscriptions:suspend",
    ],
  },
  {
    name: "Billing & Payments",
    permissions: [
      "billing:read", "billing:create", "billing:update", "billing:delete",
      "billing:refund", "billing:export",
      "invoices:read", "invoices:create", "invoices:update",
      "invoices:send", "invoices:cancel",
      "payments:read", "payments:verify", "payments:refund",
    ],
  },
  {
    name: "Support Tickets",
    permissions: [
      "tickets:read", "tickets:create", "tickets:update",
      "tickets:assign", "tickets:escalate", "tickets:resolve", "tickets:delete",
    ],
  },
  {
    name: "Network & Infrastructure",
    permissions: [
      "network:read", "network:config", "network:reboot", "network:provision",
      "routers:read", "routers:config", "routers:reboot", "routers:backup",
      "onu:read", "onu:reboot", "onu:provision",
      "pop:read", "pop:manage",
      "coverage:read", "coverage:manage",
    ],
  },
  {
    name: "Packages",
    permissions: [
      "packages:read", "packages:create", "packages:update", "packages:delete",
    ],
  },
  {
    name: "Staff Management",
    permissions: [
      "staff:read", "staff:create", "staff:update", "staff:delete", "staff:permissions",
    ],
  },
  {
    name: "Reports",
    permissions: [
      "reports:read", "reports:export", "reports:financial", "reports:network",
    ],
  },
  {
    name: "System",
    permissions: [
      "settings:read", "settings:update",
      "maintenance:read", "maintenance:schedule", "maintenance:execute",
      "notifications:read", "notifications:send",
      "audit:read",
    ],
  },
] as const;
