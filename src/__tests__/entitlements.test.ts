import { describe, it, expect, vi, beforeEach } from "vitest";
import { canAccessLevel } from "@/lib/auth/entitlements";

vi.mock("@/lib/db", () => ({
  prisma: {
    user: { findUnique: vi.fn() },
    entitlement: { findUnique: vi.fn() },
    subscription: { findUnique: vi.fn() },
  },
}));

import { prisma } from "@/lib/db";

const mockUser = {
  id: "user-1", email: "test@test.com", name: "Test User",
  role: "USER", image: null, emailVerified: null,
  hashedPassword: null, createdAt: new Date(), updatedAt: new Date(),
};

const mockAdminUser = { ...mockUser, id: "admin-1", email: "admin@test.com", name: "Admin", role: "ADMIN" };

describe("canAccessLevel()", () => {
  beforeEach(() => vi.clearAllMocks());

  it("should grant access to any level for admin users", async () => {
    vi.mocked(prisma.user.findUnique).mockResolvedValue(mockAdminUser as any);
    const result = await canAccessLevel("admin-1", "C1" as any);
    expect(result.allowed).toBe(true);
    expect(result.reason).toBe("GRANTED");
  });

  it("should grant access to A1 (free tier) for all users", async () => {
    vi.mocked(prisma.user.findUnique).mockResolvedValue(mockUser as any);
    const result = await canAccessLevel("user-1", "A1" as any);
    expect(result.allowed).toBe(true);
  });

  it("should deny access to C1 for users without entitlements", async () => {
    vi.mocked(prisma.user.findUnique).mockResolvedValue(mockUser as any);
    vi.mocked(prisma.entitlement.findUnique).mockResolvedValue(null);
    vi.mocked(prisma.subscription.findUnique).mockResolvedValue(null);
    const result = await canAccessLevel("user-1", "C1" as any);
    expect(result.allowed).toBe(false);
  });

  it("should grant access to B2 if user has a valid entitlement", async () => {
    vi.mocked(prisma.user.findUnique).mockResolvedValue(mockUser as any);
    vi.mocked(prisma.entitlement.findUnique).mockResolvedValue({ id: "ent-1", userId: "user-1", levelCode: "B2", grantedAt: new Date(), expiresAt: null, purchaseId: null, source: "PURCHASE" } as any);
    const result = await canAccessLevel("user-1", "B2" as any);
    expect(result.allowed).toBe(true);
  });

  it("should grant access if user has active subscription", async () => {
    vi.mocked(prisma.user.findUnique).mockResolvedValue(mockUser as any);
    vi.mocked(prisma.entitlement.findUnique).mockResolvedValue(null);
    // Use a far-future date so the test always passes
    const futureDate = new Date();
    futureDate.setFullYear(futureDate.getFullYear() + 1);
    vi.mocked(prisma.subscription.findUnique).mockResolvedValue({ id: "sub-1", userId: "user-1", planId: "premium_monthly", status: "active", startDate: new Date(), endDate: futureDate, revenueCatId: null, createdAt: new Date(), updatedAt: new Date() } as any);
    const result = await canAccessLevel("user-1", "C1" as any);
    expect(result.allowed).toBe(true);
  });

  it("should deny access if subscription is expired", async () => {
    vi.mocked(prisma.user.findUnique).mockResolvedValue(mockUser as any);
    vi.mocked(prisma.entitlement.findUnique).mockResolvedValue(null);
    vi.mocked(prisma.subscription.findUnique).mockResolvedValue({ id: "sub-exp", userId: "user-1", planId: "premium_monthly", status: "active", startDate: new Date("2024-01-01"), endDate: new Date("2024-06-01"), revenueCatId: null, createdAt: new Date(), updatedAt: new Date() } as any);
    const result = await canAccessLevel("user-1", "C1" as any);
    expect(result.allowed).toBe(false);
  });

  it("should return LOCKED if user does not exist", async () => {
    vi.mocked(prisma.user.findUnique).mockResolvedValue(null);
    const result = await canAccessLevel("ghost-user", "A1" as any);
    expect(result.allowed).toBe(false);
    expect(result.reason).toBe("LOCKED");
  });
});
