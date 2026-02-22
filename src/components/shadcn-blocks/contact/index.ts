"use client";

import { ComponentConfig } from "@measured/puck";
import { Contact2 } from "@/components/contact2";
import { Contact7 } from "@/components/contact7";

interface Contact2Props {
  title?: string;
  description?: string;
  phone?: string;
  email?: string;
  web?: { label: string; url: string };
}

export const ShadcnContact2Config: ComponentConfig<Contact2Props> = {
  label: "SB: Contact \u2014 Form with Details Sidebar",
  fields: {
    title: {
      type: "text",
      label: "Title",
    },
    description: {
      type: "textarea",
      label: "Description",
    },
    phone: {
      type: "text",
      label: "Phone Number",
    },
    email: {
      type: "text",
      label: "Email Address",
    },
    web: {
      type: "object",
      label: "Website",
      objectFields: {
        label: {
          type: "text",
          label: "Website Label",
        },
        url: {
          type: "text",
          label: "Website URL",
        },
      },
    },
  },
  defaultProps: {
    title: "Contact Us",
    description:
      "We are available for questions, feedback, or collaboration opportunities. Let us know how we can help!",
    phone: "(123) 34567890",
    email: "email@example.com",
    web: {
      label: "example.com",
      url: "https://example.com",
    },
  },
  render: Contact2,
};

interface Contact7Props {
  title?: string;
  description?: string;
  emailLabel?: string;
  emailDescription?: string;
  email?: string;
  officeLabel?: string;
  officeDescription?: string;
  officeAddress?: string;
  phoneLabel?: string;
  phoneDescription?: string;
  phone?: string;
  chatLabel?: string;
  chatDescription?: string;
  chatLink?: string;
}

export const ShadcnContact7Config: ComponentConfig<Contact7Props> = {
  label: "SB: Contact \u2014 Info Cards Grid",
  fields: {
    title: {
      type: "text",
      label: "Title",
    },
    description: {
      type: "textarea",
      label: "Description",
    },
    emailLabel: {
      type: "text",
      label: "Email Card Title",
    },
    emailDescription: {
      type: "text",
      label: "Email Card Description",
    },
    email: {
      type: "text",
      label: "Email Address",
    },
    officeLabel: {
      type: "text",
      label: "Office Card Title",
    },
    officeDescription: {
      type: "text",
      label: "Office Card Description",
    },
    officeAddress: {
      type: "text",
      label: "Office Address",
    },
    phoneLabel: {
      type: "text",
      label: "Phone Card Title",
    },
    phoneDescription: {
      type: "text",
      label: "Phone Card Description",
    },
    phone: {
      type: "text",
      label: "Phone Number",
    },
    chatLabel: {
      type: "text",
      label: "Chat Card Title",
    },
    chatDescription: {
      type: "text",
      label: "Chat Card Description",
    },
    chatLink: {
      type: "text",
      label: "Chat Link Text",
    },
  },
  defaultProps: {
    title: "Contact Us",
    description: "Contact the support team.",
    emailLabel: "Email",
    emailDescription: "We respond to all emails within 24 hours.",
    email: "support@example.com",
    officeLabel: "Office",
    officeDescription: "Drop by our office for a chat.",
    officeAddress: "123 Main Street, Suite 100",
    phoneLabel: "Phone",
    phoneDescription: "We're available Mon-Fri, 9am-5pm.",
    phone: "+123 456 7890",
    chatLabel: "Live Chat",
    chatDescription: "Get instant help from our support team.",
    chatLink: "Start Chat",
  },
  render: Contact7,
};
