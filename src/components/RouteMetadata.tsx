import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const configuredSiteUrl = import.meta.env.VITE_SITE_URL?.trim();
const SITE_URL = (
  configuredSiteUrl || "https://ezequiel-melo.netlify.app"
).replace(/\/+$/, "");

const DEFAULT_METADATA = {
  title: "Ezequiel Melo • Backend Developer · .NET & DevOps",
  description:
    "Portfolio de Ezequiel Melo, desarrollador backend especializado en C#, .NET, arquitectura de software, bases de datos, contenedores y despliegues automatizados.",
  canonicalUrl: `${SITE_URL}/`,
  type: "website",
};

const ECOMMERCE_METADATA = {
  title: "ECommerce Modular | Ezequiel Melo",
  description:
    "Plataforma e-commerce modular desarrollada con .NET 10, Angular y PostgreSQL, con arquitectura modular, Docker, CI/CD y despliegue automatizado.",
  canonicalUrl: `${SITE_URL}/projects/ecommerce-modular`,
  type: "article",
  image: `${SITE_URL}/portada-ecommerce.webp`,
  imageAlt:
    "Tienda Core Gamer presentada en una notebook y un teléfono para mostrar su diseño responsive",
};

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
    const isEcommerceCaseStudy = pathname === "/projects/ecommerce-modular";
    const metadata = isEcommerceCaseStudy
      ? ECOMMERCE_METADATA
      : DEFAULT_METADATA;

    document.title = metadata.title;
    setCanonical(metadata.canonicalUrl);
    setMeta("name", "description", metadata.description);
    setMeta("property", "og:locale", "es_AR");
    setMeta("property", "og:site_name", "Ezequiel Melo");
    setMeta("property", "og:type", metadata.type);
    setMeta("property", "og:title", metadata.title);
    setMeta("property", "og:description", metadata.description);
    setMeta("property", "og:url", metadata.canonicalUrl);
    setMeta(
      "property",
      "og:image",
      isEcommerceCaseStudy ? ECOMMERCE_METADATA.image : undefined,
    );
    setMeta(
      "property",
      "og:image:alt",
      isEcommerceCaseStudy ? ECOMMERCE_METADATA.imageAlt : undefined,
    );
    setMeta(
      "property",
      "og:image:type",
      isEcommerceCaseStudy ? "image/webp" : undefined,
    );
    setMeta(
      "property",
      "og:image:width",
      isEcommerceCaseStudy ? "1672" : undefined,
    );
    setMeta(
      "property",
      "og:image:height",
      isEcommerceCaseStudy ? "941" : undefined,
    );
    setMeta(
      "name",
      "twitter:card",
      isEcommerceCaseStudy ? "summary_large_image" : "summary",
    );
    setMeta("name", "twitter:title", metadata.title);
    setMeta("name", "twitter:description", metadata.description);
    setMeta(
      "name",
      "twitter:image",
      isEcommerceCaseStudy ? ECOMMERCE_METADATA.image : undefined,
    );
    setMeta(
      "name",
      "twitter:image:alt",
      isEcommerceCaseStudy ? ECOMMERCE_METADATA.imageAlt : undefined,
    );
  }, [pathname]);

  return null;
}

export default RouteMetadata;
