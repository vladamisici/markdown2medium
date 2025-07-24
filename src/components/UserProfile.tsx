"use client";

import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Github, Mail, User, LogOut, Settings, Link as LinkIcon } from "lucide-react";

export function UserProfile() {
  const { data: session } = useSession();
  const [isLinking, setIsLinking] = useState(false);

  const handleLinkGitHub = async () => {
    setIsLinking(true);
    try {
      // This will redirect to GitHub OAuth
      window.location.href = "/api/auth/signin/github?callbackUrl=/profile";
    } catch (error) {
      console.error("Error linking GitHub:", error);
    } finally {
      setIsLinking(false);
    }
  };

  const handleSignOut = () => {
    signOut({ callbackUrl: "/auth/signin" });
  };

  if (!session?.user) {
    return null;
  }

  const hasGitHubAccount = session.user.image?.includes("githubusercontent.com");

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={session.user.image || ""} alt={session.user.name || ""} />
            <AvatarFallback>
              <User className="h-8 w-8" />
            </AvatarFallback>
          </Avatar>
        </div>
        <CardTitle className="text-xl">{session.user.name}</CardTitle>
        <CardDescription>{session.user.email}</CardDescription>
        <div className="flex justify-center gap-2 mt-2">
          <Badge variant="secondary">
            {session.user.role || "User"}
          </Badge>
          <Badge variant="outline">
            Free Plan
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Mail className="h-4 w-4" />
            <span>Email: {session.user.email}</span>
          </div>
          
          {hasGitHubAccount && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Github className="h-4 w-4" />
              <span>GitHub Account Linked</span>
            </div>
          )}
        </div>

        <Separator />

        {!hasGitHubAccount && (
          <Button
            onClick={handleLinkGitHub}
            disabled={isLinking}
            variant="outline"
            className="w-full"
          >
            <LinkIcon className="mr-2 h-4 w-4" />
            {isLinking ? "Linking..." : "Link GitHub Account"}
          </Button>
        )}

        <div className="space-y-2">
          <Button variant="outline" className="w-full">
            <Settings className="mr-2 h-4 w-4" />
            Account Settings
          </Button>
          
          <Button
            onClick={handleSignOut}
            variant="destructive"
            className="w-full"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </CardContent>
    </Card>
  );
} 