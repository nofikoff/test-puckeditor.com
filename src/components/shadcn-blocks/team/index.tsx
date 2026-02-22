"use client";

import type { ComponentConfig } from "@measured/puck";
import { Team1 } from "@/components/team1";
import { Team2 } from "@/components/team2";

// -- Team1 --
// Well-parameterized: heading, description, members (array with avatar)

type Team1Props = {
  heading: string;
  description: string;
  members: { name: string; role: string; avatar: string }[];
};

export const ShadcnTeam1Config: ComponentConfig<Team1Props> = {
  label: "SB: Team \u2014 Avatars Grid",
  fields: {
    heading: {
      type: "text",
      label: "Heading",
    },
    description: {
      type: "textarea",
      label: "Description",
    },
    members: {
      type: "array",
      label: "Team Members",
      arrayFields: {
        name: { type: "text", label: "Name" },
        role: { type: "text", label: "Role" },
        avatar: { type: "text", label: "Avatar URL" },
      },
    },
  },
  defaultProps: {
    heading: "Team",
    description:
      "Our diverse team of experts brings together decades of experience in design, engineering, and product development.",
    members: [
      {
        name: "Sarah Chen",
        role: "CEO & Founder",
        avatar: "https://i.pravatar.cc/150?img=1",
      },
      {
        name: "Marcus Rodriguez",
        role: "CTO",
        avatar: "https://i.pravatar.cc/150?img=3",
      },
      {
        name: "Emily Watson",
        role: "Head of Design",
        avatar: "https://i.pravatar.cc/150?img=5",
      },
      {
        name: "David Kim",
        role: "Lead Engineer",
        avatar: "https://i.pravatar.cc/150?img=8",
      },
      {
        name: "Lisa Thompson",
        role: "Product Manager",
        avatar: "https://i.pravatar.cc/150?img=9",
      },
      {
        name: "Alex Johnson",
        role: "UX Designer",
        avatar: "https://i.pravatar.cc/150?img=12",
      },
    ],
  },
  render: ({ heading, description, members }) => {
    const membersWithIds = members.map((member, index) => ({
      id: `member-${index + 1}`,
      name: member.name,
      role: member.role,
      avatar: member.avatar,
    }));
    return (
      <Team1
        heading={heading}
        description={description}
        members={membersWithIds}
      />
    );
  },
};

// -- Team2 --
// Well-parameterized: heading, description, members (array with avatar + social links)
// Social link icons (Github, Twitter, Linkedin) are lucide-react icons used as static defaults.

type Team2Props = {
  heading: string;
  description: string;
  members: {
    name: string;
    role: string;
    avatar: string;
    github: string;
    twitter: string;
    linkedin: string;
  }[];
};

export const ShadcnTeam2Config: ComponentConfig<Team2Props> = {
  label: "SB: Team \u2014 Avatars with Social Links",
  fields: {
    heading: {
      type: "text",
      label: "Heading",
    },
    description: {
      type: "textarea",
      label: "Description",
    },
    members: {
      type: "array",
      label: "Team Members",
      arrayFields: {
        name: { type: "text", label: "Name" },
        role: { type: "text", label: "Role" },
        avatar: { type: "text", label: "Avatar URL" },
        github: { type: "text", label: "GitHub URL" },
        twitter: { type: "text", label: "Twitter URL" },
        linkedin: { type: "text", label: "LinkedIn URL" },
      },
    },
  },
  defaultProps: {
    heading: "Team",
    description:
      "Our diverse team of experts brings together decades of experience in design, engineering, and product development.",
    members: [
      {
        name: "Sarah Chen",
        role: "CEO & Founder",
        avatar: "https://i.pravatar.cc/150?img=1",
        github: "#",
        twitter: "#",
        linkedin: "#",
      },
      {
        name: "Marcus Rodriguez",
        role: "CTO",
        avatar: "https://i.pravatar.cc/150?img=3",
        github: "#",
        twitter: "#",
        linkedin: "#",
      },
      {
        name: "Emily Watson",
        role: "Head of Design",
        avatar: "https://i.pravatar.cc/150?img=5",
        github: "#",
        twitter: "#",
        linkedin: "#",
      },
      {
        name: "David Kim",
        role: "Lead Engineer",
        avatar: "https://i.pravatar.cc/150?img=8",
        github: "#",
        twitter: "#",
        linkedin: "#",
      },
      {
        name: "Lisa Thompson",
        role: "Product Manager",
        avatar: "https://i.pravatar.cc/150?img=9",
        github: "#",
        twitter: "#",
        linkedin: "#",
      },
      {
        name: "Alex Johnson",
        role: "UX Designer",
        avatar: "https://i.pravatar.cc/150?img=12",
        github: "#",
        twitter: "#",
        linkedin: "#",
      },
    ],
  },
  render: ({ heading, description, members }) => {
    const membersWithIds = members.map((member, index) => ({
      id: `member-${index + 1}`,
      name: member.name,
      role: member.role,
      avatar: member.avatar,
      github: member.github || undefined,
      twitter: member.twitter || undefined,
      linkedin: member.linkedin || undefined,
    }));
    return (
      <Team2
        heading={heading}
        description={description}
        members={membersWithIds}
      />
    );
  },
};
