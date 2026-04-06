"use client";

import { useState } from "react";
import { useFinance } from "@/lib/finance-context";
import { formatCurrency } from "@/lib/currency";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  User,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  Building2,
  Wallet,
  TrendingUp,
  TrendingDown,
  Edit,
  Calendar,
  Shield,
  Sparkles,
} from "lucide-react";

export function Profile() {
  const { profile, updateProfile, totalBalance, totalIncome, totalExpenses, role } = useFinance();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editForm, setEditForm] = useState(profile);

  const handleSave = () => {
    updateProfile(editForm);
    setIsEditOpen(false);
  };

  const initials = profile.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="space-y-6">
      {/* Profile Hero Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/90 via-primary to-primary/80 p-8 text-primary-foreground">
        <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-white/5 blur-2xl" />
        
        <div className="relative flex flex-col items-center gap-6 sm:flex-row">
          <Avatar className="h-24 w-24 border-4 border-white/20 shadow-2xl">
            <AvatarFallback className="bg-white/20 text-2xl font-bold text-primary-foreground">
              {initials}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 text-center sm:text-left">
            <div className="flex items-center justify-center gap-2 sm:justify-start">
              <h2 className="text-3xl font-bold">{profile.name}</h2>
              <Sparkles className="h-5 w-5 text-white/60" />
            </div>
            <p className="mt-1 text-primary-foreground/80">{profile.email}</p>
            <div className="mt-3 flex flex-wrap items-center justify-center gap-4 text-sm text-primary-foreground/70 sm:justify-start">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                Member since {profile.memberSince}
              </span>
              <span className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1">
                <Shield className="h-3.5 w-3.5" />
                {role === "admin" ? "Admin" : "Viewer"}
              </span>
            </div>
          </div>
          
          {role === "admin" && (
            <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
              <DialogTrigger asChild>
                <Button variant="secondary" size="sm" className="gap-2 rounded-xl bg-white/20 text-primary-foreground hover:bg-white/30">
                  <Edit className="h-4 w-4" />
                  Edit Profile
                </Button>
              </DialogTrigger>
              <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Edit Profile</DialogTitle>
                  <DialogDescription>
                    Update your personal information
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={editForm.name}
                      onChange={(e) =>
                        setEditForm((prev) => ({ ...prev, name: e.target.value }))
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={editForm.email}
                      onChange={(e) =>
                        setEditForm((prev) => ({ ...prev, email: e.target.value }))
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={editForm.phone}
                      onChange={(e) =>
                        setEditForm((prev) => ({ ...prev, phone: e.target.value }))
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="upiId">UPI ID</Label>
                    <Input
                      id="upiId"
                      value={editForm.upiId}
                      onChange={(e) =>
                        setEditForm((prev) => ({ ...prev, upiId: e.target.value }))
                      }
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        value={editForm.city}
                        onChange={(e) =>
                          setEditForm((prev) => ({ ...prev, city: e.target.value }))
                        }
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="state">State</Label>
                      <Input
                        id="state"
                        value={editForm.state}
                        onChange={(e) =>
                          setEditForm((prev) => ({ ...prev, state: e.target.value }))
                        }
                      />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      value={editForm.address}
                      onChange={(e) =>
                        setEditForm((prev) => ({ ...prev, address: e.target.value }))
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="pincode">Pincode</Label>
                    <Input
                      id="pincode"
                      value={editForm.pincode}
                      onChange={(e) =>
                        setEditForm((prev) => ({ ...prev, pincode: e.target.value }))
                      }
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsEditOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSave}>Save Changes</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard
          label="Total Balance"
          value={formatCurrency(totalBalance)}
          icon={Wallet}
          colorClass="text-primary bg-primary/10"
        />
        <StatCard
          label="Total Income"
          value={formatCurrency(totalIncome)}
          icon={TrendingUp}
          colorClass="text-emerald-600 dark:text-emerald-400 bg-emerald-500/10"
        />
        <StatCard
          label="Total Expenses"
          value={formatCurrency(totalExpenses)}
          icon={TrendingDown}
          colorClass="text-rose-600 dark:text-rose-400 bg-rose-500/10"
        />
      </div>

      {/* Details Bento Grid */}
      <div className="grid gap-4 lg:grid-cols-5">
        {/* Personal Info - 3 cols */}
        <div className="rounded-2xl border border-border/50 bg-card p-5 lg:col-span-3">
          <div className="mb-4 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/10">
              <User className="h-4 w-4 text-primary" />
            </div>
            <h3 className="font-semibold">Personal Information</h3>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <InfoRow icon={User} label="Full Name" value={profile.name} />
            <InfoRow icon={Mail} label="Email" value={profile.email} />
            <InfoRow icon={Phone} label="Phone" value={profile.phone} />
            <InfoRow
              icon={MapPin}
              label="Location"
              value={`${profile.city}, ${profile.state}`}
            />
          </div>
          <div className="mt-3">
            <InfoRow
              icon={MapPin}
              label="Full Address"
              value={`${profile.address}, ${profile.city}, ${profile.state} - ${profile.pincode}`}
            />
          </div>
        </div>

        {/* Financial Info - 2 cols */}
        <div className="rounded-2xl border border-border/50 bg-card p-5 lg:col-span-2">
          <div className="mb-4 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/10">
              <CreditCard className="h-4 w-4 text-primary" />
            </div>
            <h3 className="font-semibold">Financial Details</h3>
          </div>
          <div className="space-y-3">
            <InfoRow icon={Shield} label="PAN Number" value={profile.panNumber} />
            <InfoRow icon={CreditCard} label="Bank Account" value={profile.bankAccount} />
            <InfoRow icon={Building2} label="IFSC Code" value={profile.ifscCode} />
            <InfoRow icon={Wallet} label="UPI ID" value={profile.upiId} />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  icon: Icon,
  colorClass,
}: {
  label: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
  colorClass: string;
}) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card p-5 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
      <div className={`absolute -right-4 -top-4 h-20 w-20 rounded-full ${colorClass.split(" ")[1]} blur-2xl opacity-50 transition-all group-hover:scale-150`} />
      <div className="relative flex items-center gap-4">
        <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${colorClass}`}>
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="text-xl font-bold">{value}</p>
        </div>
      </div>
    </div>
  );
}

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3 rounded-xl bg-muted/30 p-3 transition-colors hover:bg-muted/50">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-background">
        <Icon className="h-4 w-4 text-muted-foreground" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="truncate text-sm font-medium">{value}</p>
      </div>
    </div>
  );
}
