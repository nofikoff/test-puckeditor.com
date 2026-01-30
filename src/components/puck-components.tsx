"use client";
import React, { useState } from "react";

// Typography Components
export const Heading = ({
  text,
  level,
  align,
}: {
  text: string;
  level: "h1" | "h2" | "h3" | "h4";
  align: "left" | "center" | "right";
}) => {
  const Tag = level;
  const sizes = {
    h1: "text-4xl md:text-5xl font-bold",
    h2: "text-3xl md:text-4xl font-bold",
    h3: "text-2xl md:text-3xl font-semibold",
    h4: "text-xl md:text-2xl font-semibold",
  };
  return (
    <Tag className={`${sizes[level]} text-${align} text-gray-900 leading-tight`}>
      {text}
    </Tag>
  );
};

export const Text = ({
  text,
  size,
  align,
}: {
  text: string;
  size: "small" | "medium" | "large";
  align: "left" | "center" | "right";
}) => {
  const sizes = {
    small: "text-sm",
    medium: "text-base",
    large: "text-lg",
  };
  return (
    <p className={`${sizes[size]} text-${align} text-gray-600 leading-relaxed`}>
      {text}
    </p>
  );
};

export const Badge = ({
  text,
  variant,
}: {
  text: string;
  variant: "default" | "primary" | "success" | "warning" | "error";
}) => {
  const variants = {
    default: "bg-gray-100 text-gray-800",
    primary: "bg-blue-100 text-blue-800",
    success: "bg-green-100 text-green-800",
    warning: "bg-yellow-100 text-yellow-800",
    error: "bg-red-100 text-red-800",
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]}`}>
      {text}
    </span>
  );
};

// Interactive Components
export const Button = ({
  text,
  href,
  variant,
  size,
}: {
  text: string;
  href: string;
  variant: "primary" | "secondary" | "outline" | "ghost";
  size: "small" | "medium" | "large";
}) => {
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
    secondary: "bg-gray-600 hover:bg-gray-700 text-white",
    outline: "border-2 border-blue-600 text-blue-600 hover:bg-blue-50",
    ghost: "text-blue-600 hover:bg-blue-50",
  };
  const sizes = {
    small: "px-3 py-1.5 text-sm",
    medium: "px-4 py-2 text-base",
    large: "px-6 py-3 text-lg",
  };
  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center rounded-lg font-medium transition-colors ${variants[variant]} ${sizes[size]}`}
    >
      {text}
    </a>
  );
};

// Card Components
export const Card = ({
  title,
  description,
  imageUrl,
  linkText,
  linkHref,
}: {
  title: string;
  description: string;
  imageUrl: string;
  linkText: string;
  linkHref: string;
}) => (
  <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
    {imageUrl && (
      <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
    )}
    <div className="p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      {linkText && (
        <a href={linkHref} className="text-blue-600 hover:text-blue-700 font-medium">
          {linkText} &rarr;
        </a>
      )}
    </div>
  </div>
);

// Section Components
export const Hero = ({
  title,
  subtitle,
  primaryButtonText,
  primaryButtonHref,
  secondaryButtonText,
  secondaryButtonHref,
  backgroundImage,
  alignment,
}: {
  title: string;
  subtitle: string;
  primaryButtonText: string;
  primaryButtonHref: string;
  secondaryButtonText: string;
  secondaryButtonHref: string;
  backgroundImage: string;
  alignment: "left" | "center";
}) => (
  <section
    className="relative py-20 px-4 min-h-[500px] flex items-center"
    style={backgroundImage ? { backgroundImage: `url(${backgroundImage})`, backgroundSize: "cover" } : { background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}
  >
    <div className="absolute inset-0 bg-black/30" />
    <div className={`relative max-w-4xl mx-auto ${alignment === "center" ? "text-center" : "text-left"}`}>
      <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">{title}</h1>
      <p className="text-xl text-white/90 mb-8 max-w-2xl">{subtitle}</p>
      <div className={`flex gap-4 ${alignment === "center" ? "justify-center" : ""}`}>
        <a href={primaryButtonHref} className="px-6 py-3 bg-white text-gray-900 rounded-lg font-semibold hover:bg-gray-100 transition">
          {primaryButtonText}
        </a>
        {secondaryButtonText && (
          <a href={secondaryButtonHref} className="px-6 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition">
            {secondaryButtonText}
          </a>
        )}
      </div>
    </div>
  </section>
);

export const Features = ({
  title,
  subtitle,
  columns,
  features,
}: {
  title: string;
  subtitle: string;
  columns: "2" | "3" | "4";
  features: Array<{ icon: string; title: string; description: string }>;
}) => {
  const gridCols = {
    "2": "md:grid-cols-2",
    "3": "md:grid-cols-3",
    "4": "md:grid-cols-4",
  };
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{title}</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
        </div>
        <div className={`grid grid-cols-1 ${gridCols[columns]} gap-8`}>
          {features.map((feature, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const Testimonials = ({
  title,
  testimonials,
}: {
  title: string;
  testimonials: Array<{ quote: string; author: string; role: string; company: string; avatar: string }>;
}) => (
  <section className="py-16 px-4 bg-white">
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((t, i) => (
          <div key={i} className="bg-gray-50 p-6 rounded-xl">
            <p className="text-gray-700 mb-6 italic">&ldquo;{t.quote}&rdquo;</p>
            <div className="flex items-center">
              <img src={t.avatar} alt={t.author} className="w-12 h-12 rounded-full mr-4" />
              <div>
                <p className="font-semibold text-gray-900">{t.author}</p>
                <p className="text-sm text-gray-600">{t.role}, {t.company}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export const Stats = ({
  title,
  stats,
}: {
  title: string;
  stats: Array<{ value: string; label: string; suffix: string }>;
}) => (
  <section className="py-16 px-4 bg-blue-600">
    <div className="max-w-6xl mx-auto">
      {title && <h2 className="text-3xl font-bold text-center text-white mb-12">{title}</h2>}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat, i) => (
          <div key={i} className="text-center">
            <p className="text-4xl md:text-5xl font-bold text-white mb-2">
              {stat.value}{stat.suffix}
            </p>
            <p className="text-blue-100">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export const Pricing = ({
  title,
  subtitle,
  plans,
}: {
  title: string;
  subtitle: string;
  plans: Array<{
    name: string;
    price: string;
    period: string;
    description: string;
    features: string;
    highlighted: string;
    buttonText: string;
  }>;
}) => (
  <section className="py-16 px-4 bg-gray-50">
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{title}</h2>
        <p className="text-xl text-gray-600">{subtitle}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, i) => (
          <div
            key={i}
            className={`bg-white rounded-xl p-8 ${plan.highlighted === "true" ? "ring-2 ring-blue-600 shadow-xl scale-105" : "shadow-md"}`}
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{plan.name}</h3>
            <p className="text-gray-600 mb-4">{plan.description}</p>
            <div className="mb-6">
              <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
              <span className="text-gray-600">{plan.period}</span>
            </div>
            <ul className="mb-8 space-y-3">
              {plan.features.split("\n").map((feature, j) => (
                <li key={j} className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
            <button
              className={`w-full py-3 rounded-lg font-semibold transition ${
                plan.highlighted === "true"
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-100 text-gray-900 hover:bg-gray-200"
              }`}
            >
              {plan.buttonText}
            </button>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export const Team = ({
  title,
  subtitle,
  members,
}: {
  title: string;
  subtitle: string;
  members: Array<{ name: string; role: string; bio: string; avatar: string }>;
}) => (
  <section className="py-16 px-4 bg-white">
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{title}</h2>
        <p className="text-xl text-gray-600">{subtitle}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {members.map((member, i) => (
          <div key={i} className="text-center">
            <img src={member.avatar} alt={member.name} className="w-32 h-32 rounded-full mx-auto mb-4 object-cover" />
            <h3 className="text-xl font-semibold text-gray-900">{member.name}</h3>
            <p className="text-blue-600 mb-2">{member.role}</p>
            <p className="text-gray-600 text-sm">{member.bio}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export const FAQ = ({
  title,
  questions,
}: {
  title: string;
  questions: Array<{ question: string; answer: string }>;
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">{title}</h2>
        <div className="space-y-4">
          {questions.map((q, i) => (
            <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
              <button
                className="w-full px-6 py-4 text-left flex justify-between items-center"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <span className="font-semibold text-gray-900">{q.question}</span>
                <svg
                  className={`w-5 h-5 text-gray-500 transition-transform ${openIndex === i ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openIndex === i && (
                <div className="px-6 pb-4">
                  <p className="text-gray-600">{q.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const CTA = ({
  title,
  subtitle,
  buttonText,
  buttonHref,
  variant,
}: {
  title: string;
  subtitle: string;
  buttonText: string;
  buttonHref: string;
  variant: "primary" | "secondary" | "gradient";
}) => {
  const backgrounds = {
    primary: "bg-blue-600",
    secondary: "bg-gray-900",
    gradient: "bg-gradient-to-r from-purple-600 to-blue-600",
  };
  return (
    <section className={`py-16 px-4 ${backgrounds[variant]}`}>
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{title}</h2>
        <p className="text-xl text-white/90 mb-8">{subtitle}</p>
        <a
          href={buttonHref}
          className="inline-flex px-8 py-4 bg-white text-gray-900 rounded-lg font-semibold hover:bg-gray-100 transition"
        >
          {buttonText}
        </a>
      </div>
    </section>
  );
};

export const Footer = ({
  companyName,
  description,
  links,
  copyright,
}: {
  companyName: string;
  description: string;
  links: Array<{ title: string; items: string }>;
  copyright: string;
}) => (
  <footer className="bg-gray-900 text-gray-300 py-12 px-4">
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div>
          <h3 className="text-xl font-bold text-white mb-4">{companyName}</h3>
          <p className="text-gray-400">{description}</p>
        </div>
        {links.map((link, i) => (
          <div key={i}>
            <h4 className="font-semibold text-white mb-4">{link.title}</h4>
            <ul className="space-y-2">
              {link.items.split("\n").map((item, j) => (
                <li key={j}>
                  <a href="#" className="hover:text-white transition">{item}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-gray-800 pt-8 text-center">
        <p className="text-gray-400">{copyright}</p>
      </div>
    </div>
  </footer>
);

// Layout Components
export const ImageBlock = ({
  src,
  alt,
  caption,
  rounded,
}: {
  src: string;
  alt: string;
  caption: string;
  rounded: "none" | "small" | "large" | "full";
}) => {
  const roundedClasses = {
    none: "",
    small: "rounded-lg",
    large: "rounded-2xl",
    full: "rounded-full",
  };
  return (
    <figure className="my-4">
      <img src={src} alt={alt} className={`w-full h-auto ${roundedClasses[rounded]}`} />
      {caption && <figcaption className="text-center text-gray-500 text-sm mt-2">{caption}</figcaption>}
    </figure>
  );
};

export const Columns = ({
  columns,
  gap,
}: {
  columns: "2" | "3" | "4";
  gap: "small" | "medium" | "large";
}) => {
  const gridCols = { "2": "md:grid-cols-2", "3": "md:grid-cols-3", "4": "md:grid-cols-4" };
  const gaps = { small: "gap-4", medium: "gap-6", large: "gap-8" };
  return (
    <div className={`grid grid-cols-1 ${gridCols[columns]} ${gaps[gap]}`}>
      <div className="bg-gray-100 p-4 rounded-lg min-h-[100px] flex items-center justify-center text-gray-500">
        Column 1
      </div>
      <div className="bg-gray-100 p-4 rounded-lg min-h-[100px] flex items-center justify-center text-gray-500">
        Column 2
      </div>
      {(columns === "3" || columns === "4") && (
        <div className="bg-gray-100 p-4 rounded-lg min-h-[100px] flex items-center justify-center text-gray-500">
          Column 3
        </div>
      )}
      {columns === "4" && (
        <div className="bg-gray-100 p-4 rounded-lg min-h-[100px] flex items-center justify-center text-gray-500">
          Column 4
        </div>
      )}
    </div>
  );
};

export const Spacer = ({ size }: { size: "xs" | "sm" | "md" | "lg" | "xl" }) => {
  const sizes = { xs: "h-4", sm: "h-8", md: "h-12", lg: "h-16", xl: "h-24" };
  return <div className={sizes[size]} />;
};

export const Divider = ({
  style,
  color,
}: {
  style: "solid" | "dashed" | "dotted";
  color: "light" | "medium" | "dark";
}) => {
  const colors = { light: "border-gray-200", medium: "border-gray-400", dark: "border-gray-600" };
  return <hr className={`border-t ${style === "dashed" ? "border-dashed" : style === "dotted" ? "border-dotted" : ""} ${colors[color]} my-4`} />;
};

// Media Components
export const VideoEmbed = ({
  url,
  title,
  aspectRatio,
}: {
  url: string;
  title: string;
  aspectRatio: "16/9" | "4/3" | "1/1";
}) => (
  <div className="relative w-full" style={{ aspectRatio }}>
    <iframe
      src={url}
      title={title}
      className="absolute inset-0 w-full h-full rounded-lg"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  </div>
);

export const CodeBlock = ({
  code,
  language,
  showLineNumbers,
}: {
  code: string;
  language: string;
  showLineNumbers: string;
}) => (
  <div className="relative">
    <div className="absolute top-2 right-2 text-xs text-gray-400 uppercase">{language}</div>
    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
      <code>
        {showLineNumbers === "true"
          ? code.split("\n").map((line, i) => (
              <div key={i} className="table-row">
                <span className="table-cell text-gray-500 pr-4 select-none">{i + 1}</span>
                <span className="table-cell">{line}</span>
              </div>
            ))
          : code}
      </code>
    </pre>
  </div>
);

export const Alert = ({
  title,
  message,
  type,
}: {
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
}) => {
  const styles = {
    info: "bg-blue-50 border-blue-500 text-blue-800",
    success: "bg-green-50 border-green-500 text-green-800",
    warning: "bg-yellow-50 border-yellow-500 text-yellow-800",
    error: "bg-red-50 border-red-500 text-red-800",
  };
  const icons = {
    info: "ℹ️",
    success: "✅",
    warning: "⚠️",
    error: "❌",
  };
  return (
    <div className={`border-l-4 p-4 rounded-r-lg ${styles[type]}`}>
      <div className="flex items-center mb-1">
        <span className="mr-2">{icons[type]}</span>
        <span className="font-semibold">{title}</span>
      </div>
      <p className="ml-6">{message}</p>
    </div>
  );
};

export const Avatar = ({
  src,
  name,
  size,
}: {
  src: string;
  name: string;
  size: "small" | "medium" | "large";
}) => {
  const sizes = { small: "w-8 h-8", medium: "w-12 h-12", large: "w-16 h-16" };
  return (
    <div className="inline-flex items-center gap-2">
      <img src={src} alt={name} className={`${sizes[size]} rounded-full object-cover`} />
      <span className="text-gray-900 font-medium">{name}</span>
    </div>
  );
};

export const ProgressBar = ({
  value,
  label,
  showValue,
  color,
}: {
  value: number;
  label: string;
  showValue: string;
  color: "primary" | "success" | "warning" | "error";
}) => {
  const colors = {
    primary: "bg-blue-600",
    success: "bg-green-600",
    warning: "bg-yellow-500",
    error: "bg-red-600",
  };
  return (
    <div className="w-full">
      <div className="flex justify-between mb-1">
        <span className="text-gray-700">{label}</span>
        {showValue === "true" && <span className="text-gray-500">{value}%</span>}
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div className={`h-2.5 rounded-full ${colors[color]}`} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
};

export const Accordion = ({
  items,
}: {
  items: Array<{ title: string; content: string }>;
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  return (
    <div className="border rounded-lg divide-y">
      {items.map((item, i) => (
        <div key={i}>
          <button
            className="w-full px-4 py-3 text-left flex justify-between items-center hover:bg-gray-50"
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
          >
            <span className="font-medium text-gray-900">{item.title}</span>
            <svg
              className={`w-5 h-5 text-gray-500 transition-transform ${openIndex === i ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {openIndex === i && (
            <div className="px-4 pb-3 text-gray-600">{item.content}</div>
          )}
        </div>
      ))}
    </div>
  );
};

export const Tabs = ({
  tabs,
}: {
  tabs: Array<{ title: string; content: string }>;
}) => {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <div>
      <div className="flex border-b">
        {tabs.map((tab, i) => (
          <button
            key={i}
            className={`px-4 py-2 font-medium transition ${
              activeTab === i
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab(i)}
          >
            {tab.title}
          </button>
        ))}
      </div>
      <div className="p-4 text-gray-700">{tabs[activeTab]?.content}</div>
    </div>
  );
};

export const Timeline = ({
  title,
  events,
}: {
  title: string;
  events: Array<{ date: string; title: string; description: string }>;
}) => (
  <section className="py-12 px-4">
    <div className="max-w-3xl mx-auto">
      {title && <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">{title}</h2>}
      <div className="relative">
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-blue-200" />
        <div className="space-y-8">
          {events.map((event, i) => (
            <div key={i} className="relative pl-12">
              <div className="absolute left-2 w-5 h-5 bg-blue-600 rounded-full border-4 border-white" />
              <div className="bg-white p-4 rounded-lg shadow">
                <span className="text-sm text-blue-600 font-semibold">{event.date}</span>
                <h3 className="text-lg font-semibold text-gray-900">{event.title}</h3>
                <p className="text-gray-600">{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export const Gallery = ({
  images,
  columns,
}: {
  images: Array<{ src: string; alt: string }>;
  columns: "2" | "3" | "4";
}) => {
  const gridCols = { "2": "md:grid-cols-2", "3": "md:grid-cols-3", "4": "md:grid-cols-4" };
  return (
    <div className={`grid grid-cols-1 ${gridCols[columns]} gap-4`}>
      {images.map((img, i) => (
        <img
          key={i}
          src={img.src}
          alt={img.alt}
          className="w-full h-48 object-cover rounded-lg hover:opacity-90 transition cursor-pointer"
        />
      ))}
    </div>
  );
};

// Form Components
export const Newsletter = ({
  title,
  subtitle,
  buttonText,
  placeholder,
}: {
  title: string;
  subtitle: string;
  buttonText: string;
  placeholder: string;
}) => (
  <section className="py-12 px-4 bg-gray-100">
    <div className="max-w-xl mx-auto text-center">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
      <p className="text-gray-600 mb-6">{subtitle}</p>
      <form className="flex gap-2">
        <input
          type="email"
          placeholder={placeholder}
          className="flex-1 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          {buttonText}
        </button>
      </form>
    </div>
  </section>
);

export const ContactForm = ({
  title,
  subtitle,
  buttonText,
}: {
  title: string;
  subtitle: string;
  buttonText: string;
}) => (
  <section className="py-12 px-4">
    <div className="max-w-xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
        <p className="text-gray-600">{subtitle}</p>
      </div>
      <form className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <input type="text" placeholder="First name" className="px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <input type="text" placeholder="Last name" className="px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <input type="email" placeholder="Email" className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <textarea placeholder="Message" rows={4} className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <button type="submit" className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold">
          {buttonText}
        </button>
      </form>
    </div>
  </section>
);

// Navigation Components
export const SocialLinks = ({
  facebook,
  twitter,
  instagram,
  linkedin,
  youtube,
  github,
}: {
  facebook: string;
  twitter: string;
  instagram: string;
  linkedin: string;
  youtube: string;
  github: string;
}) => {
  const links = [
    { name: "Facebook", url: facebook, icon: "📘" },
    { name: "Twitter", url: twitter, icon: "🐦" },
    { name: "Instagram", url: instagram, icon: "📷" },
    { name: "LinkedIn", url: linkedin, icon: "💼" },
    { name: "YouTube", url: youtube, icon: "▶️" },
    { name: "GitHub", url: github, icon: "🐙" },
  ].filter((l) => l.url);
  return (
    <div className="flex gap-4 justify-center">
      {links.map((link, i) => (
        <a
          key={i}
          href={link.url}
          title={link.name}
          className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200 transition text-xl"
        >
          {link.icon}
        </a>
      ))}
    </div>
  );
};

export const LogoCloud = ({
  title,
  logos,
}: {
  title: string;
  logos: Array<{ name: string; url: string }>;
}) => (
  <section className="py-12 px-4 bg-gray-50">
    <div className="max-w-6xl mx-auto">
      {title && <p className="text-center text-gray-600 mb-8">{title}</p>}
      <div className="flex flex-wrap justify-center items-center gap-8">
        {logos.map((logo, i) => (
          <div key={i} className="px-6 py-3 bg-white rounded-lg shadow-sm">
            <span className="text-xl font-bold text-gray-400">{logo.name}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export const Breadcrumbs = ({
  items,
}: {
  items: Array<{ label: string; href: string }>;
}) => (
  <nav className="flex items-center gap-2 text-sm text-gray-600">
    {items.map((item, i) => (
      <React.Fragment key={i}>
        {i > 0 && <span className="text-gray-400">/</span>}
        {item.href ? (
          <a href={item.href} className="hover:text-blue-600">{item.label}</a>
        ) : (
          <span className="text-gray-900">{item.label}</span>
        )}
      </React.Fragment>
    ))}
  </nav>
);

// Re-export BlogList from separate file
export { BlogList } from "./puck-components/BlogList";
