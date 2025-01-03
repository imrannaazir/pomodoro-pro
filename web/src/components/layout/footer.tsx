"use client";

import { Button } from "@/components/ui/button";
import { Github, Linkedin } from "lucide-react";
import Container from "../ui/container";

export function Footer() {
  return (
    <footer className="border-t bg-[url('/footer-bg.jpg')] bg-center bg-no-repeat bg-cover">
      <Container className="py-14">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            © 2025 Programming hero. All rights reserved.
          </p>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" asChild>
              <a
                href="https://github.com/Apollo-Level2-Web-Dev/"
                target="_blank"
                aria-label="GitHub"
              >
                <Github className="h-4 w-4" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a
                href="https://www.linkedin.com/company/programminghero/"
                target="_blank"
                aria-label="linkedin"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </Container>
    </footer>
  );
}
