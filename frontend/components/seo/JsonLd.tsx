import { person } from "@/data/portfolio";

export default function JsonLd() {
  const jsonLdData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://hemandu.com/#website",
        "url": "https://hemandu.com/",
        "name": "Hemandu",
        "alternateName": ["Hemandu Tapraniya", "hemandu.com"],
        "description":
          "Portfolio of Hemandu Tapraniya — AI/ML & Full Stack Developer.",
        "publisher": {
          "@id": "https://hemandu.com/#person",
        },
      },
      {
        "@type": "Person",
        "@id": "https://hemandu.com/#person",
        "name": person.name,
        "alternateName": "Hemandu",
        "url": "https://hemandu.com/",
        "image": "https://hemandu.com/images/portrait.jpeg",
        "jobTitle": "AI/ML & Full Stack Developer",
        "worksFor": {
          "@type": "Organization",
          "name": "Digital India Corporation",
        },
        "sameAs": [person.github, person.linkedin],
        "knowsAbout": [
          "Full Stack Development",
          "Artificial Intelligence",
          "Machine Learning",
          "Next.js",
          "TypeScript",
          "React",
          "Node.js",
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
    />
  );
}