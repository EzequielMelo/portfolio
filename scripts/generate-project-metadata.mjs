import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const siteUrl = (
  process.env.VITE_SITE_URL || "https://ezequiel-melo.netlify.app"
).replace(/\/+$/, "");
const projectPath = "/projects/ecommerce-modular";

const metadata = {
  title: "ECommerce Modular | Ezequiel Melo",
  description:
    "Plataforma e-commerce modular desarrollada con .NET 10, Angular y PostgreSQL, con arquitectura modular, Docker, CI/CD y despliegue automatizado.",
  canonicalUrl: `${siteUrl}${projectPath}`,
  image: `${siteUrl}/portada-ecommerce.webp`,
  imageAlt:
    "Tienda Core Gamer presentada en una notebook y un teléfono para mostrar su diseño responsive",
};

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function setTitle(html, title) {
  return html.replace(/<title>.*?<\/title>/is, `<title>${title}</title>`);
}

function setMeta(html, attribute, key, content) {
  const pattern = new RegExp(
    `<meta\\s+[^>]*${attribute}=["']${escapeRegExp(key)}["'][^>]*>`,
    "i",
  );
  const tag = `<meta ${attribute}="${key}" content="${content}" />`;

  return pattern.test(html)
    ? html.replace(pattern, tag)
    : html.replace("</head>", `  ${tag}\n</head>`);
}

function setCanonical(html, url) {
  const pattern = /<link\s+[^>]*rel=["']canonical["'][^>]*>/i;
  const tag = `<link rel="canonical" href="${url}" />`;

  return pattern.test(html)
    ? html.replace(pattern, tag)
    : html.replace("</head>", `  ${tag}\n</head>`);
}

const outputDirectory = "dist";
const sourceHtml = await readFile(join(outputDirectory, "index.html"), "utf8");

let projectHtml = setTitle(sourceHtml, metadata.title);
projectHtml = setCanonical(projectHtml, metadata.canonicalUrl);
projectHtml = setMeta(
  projectHtml,
  "name",
  "description",
  metadata.description,
);
projectHtml = setMeta(projectHtml, "property", "og:locale", "es_AR");
projectHtml = setMeta(projectHtml, "property", "og:site_name", "Ezequiel Melo");
projectHtml = setMeta(projectHtml, "property", "og:type", "article");
projectHtml = setMeta(projectHtml, "property", "og:title", metadata.title);
projectHtml = setMeta(
  projectHtml,
  "property",
  "og:description",
  metadata.description,
);
projectHtml = setMeta(projectHtml, "property", "og:url", metadata.canonicalUrl);
projectHtml = setMeta(projectHtml, "property", "og:image", metadata.image);
projectHtml = setMeta(
  projectHtml,
  "property",
  "og:image:alt",
  metadata.imageAlt,
);
projectHtml = setMeta(projectHtml, "property", "og:image:type", "image/webp");
projectHtml = setMeta(projectHtml, "property", "og:image:width", "1672");
projectHtml = setMeta(projectHtml, "property", "og:image:height", "941");
projectHtml = setMeta(
  projectHtml,
  "name",
  "twitter:card",
  "summary_large_image",
);
projectHtml = setMeta(projectHtml, "name", "twitter:title", metadata.title);
projectHtml = setMeta(
  projectHtml,
  "name",
  "twitter:description",
  metadata.description,
);
projectHtml = setMeta(projectHtml, "name", "twitter:image", metadata.image);
projectHtml = setMeta(
  projectHtml,
  "name",
  "twitter:image:alt",
  metadata.imageAlt,
);

const projectDirectory = join(
  outputDirectory,
  "projects",
  "ecommerce-modular",
);
await mkdir(projectDirectory, { recursive: true });
await writeFile(join(projectDirectory, "index.html"), projectHtml);
await writeFile(
  join(outputDirectory, "projects", "ecommerce-modular.html"),
  projectHtml,
);

console.log(`Generated social metadata for ${metadata.canonicalUrl}`);
