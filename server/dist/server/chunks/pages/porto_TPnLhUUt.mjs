import { A as AstroError, l as UnknownContentCollectionError, d as createComponent, n as renderUniqueStylesheet, o as renderScriptElement, p as createHeadAndContent, r as renderTemplate, h as renderComponent, u as unescapeHTML, c as createAstro, f as renderHead, g as renderSlot, m as maybeRenderHead, e as addAttribute } from '../astro_DYrfCiJh.mjs';
import 'kleur/colors';
import 'clsx';
import 'cssesc';
import { prependForwardSlash } from '@astrojs/internal-helpers/path';
/* empty css                          */

function createCollectionToGlobResultMap({
  globResult,
  contentDir
}) {
  const collectionToGlobResultMap = {};
  for (const key in globResult) {
    const keyRelativeToContentDir = key.replace(new RegExp(`^${contentDir}`), "");
    const segments = keyRelativeToContentDir.split("/");
    if (segments.length <= 1)
      continue;
    const collection = segments[0];
    collectionToGlobResultMap[collection] ??= {};
    collectionToGlobResultMap[collection][key] = globResult[key];
  }
  return collectionToGlobResultMap;
}
function createGetEntry({
  getEntryImport,
  getRenderEntryImport
}) {
  return async function getEntry(collectionOrLookupObject, _lookupId) {
    let collection, lookupId;
    if (typeof collectionOrLookupObject === "string") {
      collection = collectionOrLookupObject;
      if (!_lookupId)
        throw new AstroError({
          ...UnknownContentCollectionError,
          message: "`getEntry()` requires an entry identifier as the second argument."
        });
      lookupId = _lookupId;
    } else {
      collection = collectionOrLookupObject.collection;
      lookupId = "id" in collectionOrLookupObject ? collectionOrLookupObject.id : collectionOrLookupObject.slug;
    }
    const entryImport = await getEntryImport(collection, lookupId);
    if (typeof entryImport !== "function")
      return void 0;
    const entry = await entryImport();
    if (entry._internal.type === "content") {
      return {
        id: entry.id,
        slug: entry.slug,
        body: entry.body,
        collection: entry.collection,
        data: entry.data,
        async render() {
          return render({
            collection: entry.collection,
            id: entry.id,
            renderEntryImport: await getRenderEntryImport(collection, lookupId)
          });
        }
      };
    } else if (entry._internal.type === "data") {
      return {
        id: entry.id,
        collection: entry.collection,
        data: entry.data
      };
    }
    return void 0;
  };
}
async function render({
  collection,
  id,
  renderEntryImport
}) {
  const UnexpectedRenderError = new AstroError({
    ...UnknownContentCollectionError,
    message: `Unexpected error while rendering ${String(collection)} → ${String(id)}.`
  });
  if (typeof renderEntryImport !== "function")
    throw UnexpectedRenderError;
  const baseMod = await renderEntryImport();
  if (baseMod == null || typeof baseMod !== "object")
    throw UnexpectedRenderError;
  const { default: defaultMod } = baseMod;
  if (isPropagatedAssetsModule(defaultMod)) {
    const { collectedStyles, collectedLinks, collectedScripts, getMod } = defaultMod;
    if (typeof getMod !== "function")
      throw UnexpectedRenderError;
    const propagationMod = await getMod();
    if (propagationMod == null || typeof propagationMod !== "object")
      throw UnexpectedRenderError;
    const Content = createComponent({
      factory(result, baseProps, slots) {
        let styles = "", links = "", scripts = "";
        if (Array.isArray(collectedStyles)) {
          styles = collectedStyles.map((style) => {
            return renderUniqueStylesheet(result, {
              type: "inline",
              content: style
            });
          }).join("");
        }
        if (Array.isArray(collectedLinks)) {
          links = collectedLinks.map((link) => {
            return renderUniqueStylesheet(result, {
              type: "external",
              src: prependForwardSlash(link)
            });
          }).join("");
        }
        if (Array.isArray(collectedScripts)) {
          scripts = collectedScripts.map((script) => renderScriptElement(script)).join("");
        }
        let props = baseProps;
        if (id.endsWith("mdx")) {
          props = {
            components: propagationMod.components ?? {},
            ...baseProps
          };
        }
        return createHeadAndContent(
          unescapeHTML(styles + links + scripts),
          renderTemplate`${renderComponent(
            result,
            "Content",
            propagationMod.Content,
            props,
            slots
          )}`
        );
      },
      propagation: "self"
    });
    return {
      Content,
      headings: propagationMod.getHeadings?.() ?? [],
      remarkPluginFrontmatter: propagationMod.frontmatter ?? {}
    };
  } else if (baseMod.Content && typeof baseMod.Content === "function") {
    return {
      Content: baseMod.Content,
      headings: baseMod.getHeadings?.() ?? [],
      remarkPluginFrontmatter: baseMod.frontmatter ?? {}
    };
  } else {
    throw UnexpectedRenderError;
  }
}
function isPropagatedAssetsModule(module) {
  return typeof module === "object" && module != null && "__astroPropagation" in module;
}

// astro-head-inject

const contentDir = '/src/content/';

const contentEntryGlob = /* #__PURE__ */ Object.assign({});
createCollectionToGlobResultMap({
	globResult: contentEntryGlob,
	contentDir,
});

const dataEntryGlob = /* #__PURE__ */ Object.assign({"/src/content/portofolio/caesar.json": () => import('../caesar_ChOHW0Me.mjs')});
createCollectionToGlobResultMap({
	globResult: dataEntryGlob,
	contentDir,
});
const collectionToEntryMap = createCollectionToGlobResultMap({
	globResult: { ...contentEntryGlob, ...dataEntryGlob },
	contentDir,
});

let lookupMap = {};
lookupMap = {"portofolio":{"type":"data","entries":{"caesar":"/src/content/portofolio/caesar.json"}}};

function createGlobLookup(glob) {
	return async (collection, lookupId) => {
		const filePath = lookupMap[collection]?.entries[lookupId];

		if (!filePath) return undefined;
		return glob[collection][filePath];
	};
}

const renderEntryGlob = /* #__PURE__ */ Object.assign({});
const collectionToRenderEntryMap = createCollectionToGlobResultMap({
	globResult: renderEntryGlob,
	contentDir,
});

const getEntry = createGetEntry({
	getEntryImport: createGlobLookup(collectionToEntryMap),
	getRenderEntryImport: createGlobLookup(collectionToRenderEntryMap),
});

const $$Astro$5 = createAstro();
const $$LayoutPorto = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$LayoutPorto;
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>MyPorto</title>${renderHead()}</head> <body> ${renderSlot($$result, $$slots["default"])} </body></html>`;
}, "C:/cesar/project/myporto/astro/src/layouts/LayoutPorto.astro", void 0);

const $$Astro$4 = createAstro();
const $$BoxListLayout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$BoxListLayout;
  const { title } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="box-list-container" data-astro-cid-3bw2m5cc> <h2 id="sub-title" data-astro-cid-3bw2m5cc>${title}</h2> <div class="box-container" data-astro-cid-3bw2m5cc> ${renderSlot($$result, $$slots["default"])} </div> </div> `;
}, "C:/cesar/project/myporto/astro/src/layouts/BoxListLayout.astro", void 0);

const $$Astro$3 = createAstro();
const $$Box = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Box;
  const { image_url, content_title, content_describe } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="box" data-astro-cid-wezlmloa> <div class="for-content" data-astro-cid-wezlmloa> <div class="image-box-container" data-astro-cid-wezlmloa> <img${addAttribute(image_url, "src")} data-astro-cid-wezlmloa> </div> <div class="content-box-container" data-astro-cid-wezlmloa> <h3 data-astro-cid-wezlmloa>${content_title}</h3> <p data-astro-cid-wezlmloa>${content_describe}</p> </div> </div> <div class="for-animation" data-astro-cid-wezlmloa></div> </div> `;
}, "C:/cesar/project/myporto/astro/src/components/Box.astro", void 0);

const $$Astro$2 = createAstro();
const $$Header = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Header;
  return renderTemplate`${maybeRenderHead()}<div class="header-container" data-astro-cid-3ef6ksr2> <div class="header-background" data-astro-cid-3ef6ksr2></div> <div class="menu-container" data-astro-cid-3ef6ksr2> <div class="pure-menu pure-menu-horizontal" data-astro-cid-3ef6ksr2> <ul class="pure-menu-list" data-astro-cid-3ef6ksr2> <li class="pure-menu-item" data-astro-cid-3ef6ksr2><a class="pure-menu-link" href="/" data-astro-cid-3ef6ksr2>Home</a></li> <li class="pure-menu-item" data-astro-cid-3ef6ksr2><a class="pure-menu-link" href="/" data-astro-cid-3ef6ksr2>Kosong</a></li> <li class="pure-menu-item" data-astro-cid-3ef6ksr2><a class="pure-menu-link" href="/porto" data-astro-cid-3ef6ksr2>About</a></li> </ul> </div> </div> </div> `;
}, "C:/cesar/project/myporto/astro/src/components/Header.astro", void 0);

const $$Astro$1 = createAstro();
const $$Banner = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Banner;
  const { name, identity } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="caesar-porto-page" data-astro-cid-kggsjsm4> <div class="porto-banner" data-astro-cid-kggsjsm4> <h1 class="welcome-word" id="name-word" data-astro-cid-kggsjsm4>Hi I'm ${name}</h1> <p class="welcome-word" id="identity-word" data-astro-cid-kggsjsm4>I'm a ${identity}</p> <p class="welcome-word" id="welcome-page-word" data-astro-cid-kggsjsm4>Welcome to my portofolio web pages</p> </div> </div> `;
}, "C:/cesar/project/myporto/astro/src/components/Banner.astro", void 0);

const $$Astro = createAstro();
const $$Porto = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Porto;
  const entry = await getEntry("portofolio", "caesar");
  const portofolio = entry.data.portofolio;
  return renderTemplate`${renderComponent($$result, "Layout", $$LayoutPorto, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", $$Header, {})} ${renderComponent($$result2, "Banner", $$Banner, { "name": entry.data.name, "identity": entry.data.identity })} ${renderComponent($$result2, "ListLayout", $$BoxListLayout, { "title": entry.collection }, { "default": ($$result3) => renderTemplate`${portofolio.map((data) => {
    console.log(data);
    return renderTemplate`${renderComponent($$result3, "Box", $$Box, { "image_url": data.project_image, "content_title": data.project_name, "content_describe": data.description })}`;
  })}` })} ` })}`;
}, "C:/cesar/project/myporto/astro/src/pages/porto.astro", void 0);

const $$file = "C:/cesar/project/myporto/astro/src/pages/porto.astro";
const $$url = "/porto";

export { $$Porto as default, $$file as file, $$url as url };
