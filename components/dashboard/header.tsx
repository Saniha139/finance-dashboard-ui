"use client";

import { useFinance, type UserRole } from "@/lib/finance-context";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Moon, Sun, LayoutDashboard, User, ChevronDown, Shield, Eye } from "lucide-react";

interface HeaderProps {
  activeTab: "dashboard" | "profile";
  onTabChange: (tab: "dashboard" | "profile") => void;
}

export function Header({ activeTab, onTabChange }: HeaderProps) {
  const { darkMode, toggleDarkMode, role, setRole, profile } = useFinance();

  return (
    <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo & Nav */}
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 shadow-lg shadow-primary/25">
              <span className="text-sm font-bold text-primary-foreground">F</span>
            </div>
            <span className="text-lg font-bold tracking-tight">FinanceFlow</span>
          </div>
          
          <nav className="hidden items-center gap-1 md:flex">
            <Button
              variant={activeTab === "dashboard" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => onTabChange("dashboard")}
              className="gap-2 rounded-xl"
            >
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Button>
            <Button
              variant={activeTab === "profile" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => onTabChange("profile")}
              className="gap-2 rounded-xl"
            >
              <User className="h-4 w-4" />
              Profile
            </Button>
          </nav>
        </div>
        
        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* Role Switcher */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2 rounded-xl border-border/50 text-xs">
                {role === "admin" ? (
                  <Shield className="h-3.5 w-3.5 text-primary" />
                ) : (
                  <Eye className="h-3.5 w-3.5" />
                )}
                <span className="hidden sm:inline">{role === "admin" ? "Admin" : "Viewer"}</span>
                <ChevronDown className="h-3 w-3 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem onClick={() => setRole("admin" as UserRole)} className="gap-2">
                <Shield className="h-4 w-4" />
                Admin
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setRole("viewer" as UserRole)} className="gap-2">
                <Eye className="h-4 w-4" />
                Viewer
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleDarkMode}
            className="h-9 w-9 rounded-xl"
          >
            {darkMode ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>

          {/* Profile Avatar */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-2 rounded-xl pl-2 pr-3">
                <Avatar className="h-7 w-7">
                  <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10 text-xs font-semibold text-primary">
                    {profile.name.split(" ").map(n => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden text-sm font-medium sm:inline">{profile.name.split(" ")[0]}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="px-3 py-2">
                <p className="text-sm font-medium">{profile.name}</p>
                <p className="text-xs text-muted-foreground">{profile.email}</p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => onTabChange("profile")}>
                <User className="mr-2 h-4 w-4" />
                View Profile
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
