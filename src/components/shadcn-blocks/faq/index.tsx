"use client";

import type { ComponentConfig } from "@measured/puck";
import { Faq1 } from "@/components/faq1";
import { Faq3 } from "@/components/faq3";
import { Faq5 } from "@/components/faq5";

// -- Faq1 --
// Well-parameterized: heading, items (array of { question, answer })

type Faq1Props = {
  heading: string;
  items: { question: string; answer: string }[];
};

export const ShadcnFaq1Config: ComponentConfig<Faq1Props> = {
  label: "SB: FAQ \u2014 Accordion (Simple)",
  fields: {
    heading: {
      type: "text",
      label: "Heading",
    },
    items: {
      type: "array",
      label: "Questions",
      arrayFields: {
        question: { type: "text", label: "Question" },
        answer: { type: "textarea", label: "Answer" },
      },
    },
  },
  defaultProps: {
    heading: "Frequently asked questions",
    items: [
      {
        question: "What is a FAQ?",
        answer:
          "A FAQ is a list of frequently asked questions and answers on a particular topic.",
      },
      {
        question: "What is the purpose of a FAQ?",
        answer:
          "The purpose of a FAQ is to provide answers to common questions and help users find the information they need quickly and easily.",
      },
      {
        question: "How do I create a FAQ?",
        answer:
          "To create a FAQ, you need to compile a list of common questions and answers on a particular topic and organize them in a clear and easy-to-navigate format.",
      },
      {
        question: "What are the benefits of a FAQ?",
        answer:
          "The benefits of a FAQ include providing quick and easy access to information, reducing the number of support requests, and improving the overall user experience.",
      },
      {
        question: "How should I organize my FAQ?",
        answer:
          "You should organize your FAQ in a logical manner, grouping related questions together and ordering them from most basic to more advanced topics.",
      },
    ],
  },
  render: ({ heading, items }) => {
    const faqItems = items.map((item, index) => ({
      id: `faq-${index + 1}`,
      question: item.question,
      answer: item.answer,
    }));
    return <Faq1 heading={heading} items={faqItems} />;
  },
};

// -- Faq3 --
// Well-parameterized: heading, description, items (array)

type Faq3Props = {
  heading: string;
  description: string;
  items: { question: string; answer: string }[];
};

export const ShadcnFaq3Config: ComponentConfig<Faq3Props> = {
  label: "SB: FAQ \u2014 Accordion (with Description)",
  fields: {
    heading: {
      type: "text",
      label: "Heading",
    },
    description: {
      type: "textarea",
      label: "Description",
    },
    items: {
      type: "array",
      label: "Questions",
      arrayFields: {
        question: { type: "text", label: "Question" },
        answer: { type: "textarea", label: "Answer" },
      },
    },
  },
  defaultProps: {
    heading: "Frequently asked questions",
    description:
      "Find answers to common questions about our products. Can't find what you're looking for? Contact our support team.",
    items: [
      {
        question: "What is a FAQ?",
        answer:
          "A FAQ is a list of frequently asked questions and answers on a particular topic.",
      },
      {
        question: "What is the purpose of a FAQ?",
        answer:
          "The purpose of a FAQ is to provide answers to common questions and help users find the information they need quickly and easily.",
      },
      {
        question: "How do I create a FAQ?",
        answer:
          "To create a FAQ, you need to compile a list of common questions and answers on a particular topic and organize them in a clear and easy-to-navigate format.",
      },
      {
        question: "What are the benefits of a FAQ?",
        answer:
          "The benefits of a FAQ include providing quick and easy access to information, reducing the number of support requests, and improving the overall user experience.",
      },
      {
        question: "How should I organize my FAQ?",
        answer:
          "You should organize your FAQ in a logical manner, grouping related questions together and ordering them from most basic to more advanced topics.",
      },
    ],
  },
  render: ({ heading, description, items }) => {
    const faqItems = items.map((item, index) => ({
      id: `faq-${index + 1}`,
      question: item.question,
      answer: item.answer,
    }));
    return (
      <Faq3
        heading={heading}
        description={description}
        items={faqItems}
        supportHeading=""
        supportDescription=""
        supportButtonText=""
        supportButtonUrl=""
      />
    );
  },
};

// -- Faq5 --
// Well-parameterized: badge, heading, description, faqs (array)

type Faq5Props = {
  badge: string;
  heading: string;
  description: string;
  faqs: { question: string; answer: string }[];
};

export const ShadcnFaq5Config: ComponentConfig<Faq5Props> = {
  label: "SB: FAQ \u2014 Numbered List (with Badge)",
  fields: {
    badge: {
      type: "text",
      label: "Badge Text",
    },
    heading: {
      type: "text",
      label: "Heading",
    },
    description: {
      type: "textarea",
      label: "Description",
    },
    faqs: {
      type: "array",
      label: "Questions",
      arrayFields: {
        question: { type: "text", label: "Question" },
        answer: { type: "textarea", label: "Answer" },
      },
    },
  },
  defaultProps: {
    badge: "FAQ",
    heading: "Common Questions & Answers",
    description:
      "Find out all the essential details about our platform and how it can serve your needs.",
    faqs: [
      {
        question: "What is a FAQ and why is it important?",
        answer:
          "FAQ stands for Frequently Asked Questions. It is a list that provides answers to common questions people may have about a specific product, service, or topic.",
      },
      {
        question: "Why should I use a FAQ on my website or app?",
        answer:
          "Utilizing a FAQ section on your website or app is a practical way to offer instant assistance to your users or customers. Instead of waiting for customer support responses, they can find quick answers to commonly asked questions.",
      },
      {
        question: "How do I effectively create a FAQ section?",
        answer:
          "Creating a FAQ section starts with gathering the most frequent questions you receive from your users or customers. Once you have a list, you need to write clear, detailed, and helpful answers to each question.",
      },
      {
        question:
          "What are the benefits of having a well-maintained FAQ section?",
        answer:
          "There are numerous advantages to maintaining a robust FAQ section. Firstly, it provides immediate answers to common queries, which improves the user experience.",
      },
    ],
  },
  render: ({ badge, heading, description, faqs }) => {
    return (
      <Faq5
        badge={badge}
        heading={heading}
        description={description}
        faqs={faqs}
      />
    );
  },
};
