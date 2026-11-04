import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const siteUrl = (
  process.env.VITE_SITE_URL || "https://ezequiel-melo.netlify.app"
).replace(/\/+$/, "");

const projects = [
  {
    slug: "b2b-autopartes",
    title: "Plataforma B2B H&A | Ezequiel Melo",
    description:
      "Plataforma B2B desarrollada para una distribuidora mayorista de autopartes, con cuentas corrientes, crédito, proveedores, inventario, automatización y despliegue continuo.",
  },
  {
    slug: "ecommerce-modular",
    title: "ECommerce Modular | Ezequiel Melo",
    description:
      "Plataforma e-commerce modular desarrollada con .NET 10, Angular y PostgreSQL, con arquitectura modular, Docker, CI/CD y despliegue automatizado.",
    image: `${siteUrl}/portada-ecommerce.webp`,
    imageAlt:
      "Tienda Core Gamer presentada en una notebook y un teléfono para mostrar su diseño responsive",
  },
];

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

  if (!content) return html.replace(pattern, "");

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

for (const project of projects) {
  const canonicalUrl = `${siteUrl}/projects/${project.slug}`;
  let projectHtml = setTitle(sourceHtml, project.title);
  projectHtml = setCanonical(projectHtml, canonicalUrl);
  projectHtml = setMeta(
    projectHtml,
    "name",
    "description",
    project.description,
  );
  projectHtml = setMeta(projectHtml, "property", "og:locale", "es_AR");
  projectHtml = setMeta(
    projectHtml,
    "property",
    "og:site_name",
    "Ezequiel Melo",
  );
  projectHtml = setMeta(projectHtml, "property", "og:type", "article");
  projectHtml = setMeta(
    projectHtml,
    "property",
    "og:title",
    project.title,
  );
  projectHtml = setMeta(
    projectHtml,
    "property",
    "og:description",
    project.description,
  );
  projectHtml = setMeta(projectHtml, "property", "og:url", canonicalUrl);
  projectHtml = setMeta(
    projectHtml,
    "property",
    "og:image",
    project.image,
  );
  projectHtml = setMeta(
    projectHtml,
    "property",
    "og:image:alt",
    project.imageAlt,
  );
  projectHtml = setMeta(
    projectHtml,
    "name",
    "twitter:card",
    project.image ? "summary_large_image" : "summary",
  );
  projectHtml = setMeta(
    projectHtml,
    "name",
    "twitter:title",
    project.title,
  );
  projectHtml = setMeta(
    projectHtml,
    "name",
    "twitter:description",
    project.description,
  );
  projectHtml = setMeta(
    projectHtml,
    "name",
    "twitter:image",
    project.image,
  );
  projectHtml = setMeta(
    projectHtml,
    "name",
    "twitter:image:alt",
    project.imageAlt,
  );

  const projectDirectory = join(
    outputDirectory,
    "projects",
    project.slug,
  );
  await mkdir(projectDirectory, { recursive: true });
  await writeFile(join(projectDirectory, "index.html"), projectHtml);
  await writeFile(
    join(outputDirectory, "projects", `${project.slug}.html`),
    projectHtml,
  );

  console.log(`Generated social metadata for ${canonicalUrl}`);
}
