import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { projects } from "../data/projects";

const configuredSiteUrl = import.meta.env.VITE_SITE_URL?.trim();
const SITE_URL = (
  configuredSiteUrl || "https://ezequiel-melo.netlify.app"
).replace(/\/+$/, "");

interface PageMetadata {
  title: string;
  description: string;
  canonicalUrl: string;
  type: "website" | "article";
  image?: string;
  imageAlt?: string;
}

const DEFAULT_METADATA: PageMetadata = {
  title: "Ezequiel Melo • Backend Developer · .NET & DevOps",
  description:
    "Portfolio de Ezequiel Melo, desarrollador backend especializado en C#, .NET, arquitectura de software, bases de datos, contenedores y despliegues automatizados.",
  canonicalUrl: `${SITE_URL}/`,
  type: "website",
};

function absoluteAssetUrl(asset?: string) {
  if (!asset) return undefined;
  return /^https?:\/\//.test(asset) ? asset : `${SITE_URL}${asset}`;
}

function getMetadata(pathname: string): PageMetadata {
  const match = pathname.match(/^\/projects\/([^/]+)\/?$/);
  if (!match) return DEFAULT_METADATA;

  const project = projects.find(({ id }) => id === match[1]);
  if (!project) return DEFAULT_METADATA;

  const description =
    project.detailType === "case-study"
      ? project.metadataDescription ?? project.summary
      : project.description;

  return {
    title: `${project.title} | Ezequiel Melo`,
    description,
    canonicalUrl: `${SITE_URL}/projects/${project.id}`,
    type: "article",
    image: absoluteAssetUrl(project.image),
    imageAlt: project.image ? project.title : undefined,
  };
}

function setMeta(
  attribute: "name" | "property",
  key: string,
  content?: string,
) {
  const selector = `meta[${attribute}="${key}"]`;
  const existing = document.head.querySelector<HTMLMetaElement>(selector);

  if (!content) {
    existing?.remove();
    return;
  }

  const element = existing ?? document.createElement("meta");
  element.setAttribute(attribute, key);
  element.content = content;

  if (!existing) document.head.appendChild(element);
}

function setCanonical(url: string) {
  const existing =
    document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  const element = existing ?? document.createElement("link");

  element.rel = "canonical";
  element.href = url;

  if (!existing) document.head.appendChild(element);
}

function RouteMetadata() {
  const { pathname } = useLocation();

  useEffect(() => {
    const metadata = getMetadata(pathname);

    document.title = metadata.title;
    setCanonical(metadata.canonicalUrl);
    setMeta("name", "description", metadata.description);
    setMeta("property", "og:locale", "es_AR");
    setMeta("property", "og:site_name", "Ezequiel Melo");
    setMeta("property", "og:type", metadata.type);
    setMeta("property", "og:title", metadata.title);
    setMeta("property", "og:description", metadata.description);
    setMeta("property", "og:url", metadata.canonicalUrl);
    setMeta("property", "og:image", metadata.image);
    setMeta("property", "og:image:alt", metadata.imageAlt);
    setMeta(
      "name",
      "twitter:card",
      metadata.image ? "summary_large_image" : "summary",
    );
    setMeta("name", "twitter:title", metadata.title);
    setMeta("name", "twitter:description", metadata.description);
    setMeta("name", "twitter:image", metadata.image);
    setMeta("name", "twitter:image:alt", metadata.imageAlt);
  }, [pathname]);

  return null;
}

export default RouteMetadata;
