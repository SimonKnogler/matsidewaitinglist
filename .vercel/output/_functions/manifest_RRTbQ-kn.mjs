import 'piccolore';
import { p as decodeKey } from './chunks/astro/server_DvjbA6nf.mjs';
import 'clsx';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_BuNSh1Vt.mjs';
import 'es-module-lexer';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///Users/simonknogler/Desktop/SportApp-Landing/","cacheDir":"file:///Users/simonknogler/Desktop/SportApp-Landing/node_modules/.astro/","outDir":"file:///Users/simonknogler/Desktop/SportApp-Landing/dist/","srcDir":"file:///Users/simonknogler/Desktop/SportApp-Landing/src/","publicDir":"file:///Users/simonknogler/Desktop/SportApp-Landing/public/","buildClientDir":"file:///Users/simonknogler/Desktop/SportApp-Landing/dist/client/","buildServerDir":"file:///Users/simonknogler/Desktop/SportApp-Landing/dist/server/","adapterName":"@astrojs/vercel","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/survey","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/survey\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"survey","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/survey.ts","pathname":"/api/survey","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/waitlist","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/waitlist\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"waitlist","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/waitlist.ts","pathname":"/api/waitlist","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.CF_J7F39.css"}],"routeData":{"route":"/survey","isIndex":false,"type":"page","pattern":"^\\/survey\\/?$","segments":[[{"content":"survey","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/survey.astro","pathname":"/survey","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.CF_J7F39.css"},{"type":"inline","content":".curve-path[data-astro-cid-oo6sugl5]{stroke-dasharray:500;stroke-dashoffset:500;animation:draw-curve 2s ease-out forwards}.data-point[data-astro-cid-oo6sugl5]{opacity:0;animation:fade-in .3s ease-out forwards}.data-point[data-astro-cid-oo6sugl5]:nth-child(1){animation-delay:.4s}.data-point[data-astro-cid-oo6sugl5]:nth-child(2){animation-delay:.8s}.data-point[data-astro-cid-oo6sugl5]:nth-child(3){animation-delay:1.2s}.data-point[data-astro-cid-oo6sugl5]:nth-child(4){animation-delay:1.6s}.data-point[data-astro-cid-oo6sugl5]:nth-child(5){animation-delay:2s}@keyframes draw-curve{to{stroke-dashoffset:0}}@keyframes fade-in{to{opacity:1}}\n"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/Users/simonknogler/Desktop/SportApp-Landing/src/pages/index.astro",{"propagation":"none","containsHead":true}],["/Users/simonknogler/Desktop/SportApp-Landing/src/pages/survey.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000virtual:astro:actions/noop-entrypoint":"noop-entrypoint.mjs","\u0000@astro-page:src/pages/api/survey@_@ts":"pages/api/survey.astro.mjs","\u0000@astro-page:src/pages/api/waitlist@_@ts":"pages/api/waitlist.astro.mjs","\u0000@astro-page:src/pages/survey@_@astro":"pages/survey.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_RRTbQ-kn.mjs","/Users/simonknogler/Desktop/SportApp-Landing/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_CisQFdxA.mjs","/Users/simonknogler/Desktop/SportApp-Landing/src/pages/survey.astro?astro&type=script&index=0&lang.ts":"_astro/survey.astro_astro_type_script_index_0_lang.BRZADiOp.js","/Users/simonknogler/Desktop/SportApp-Landing/src/components/Hero.astro?astro&type=script&index=0&lang.ts":"_astro/Hero.astro_astro_type_script_index_0_lang.80rDFwdv.js","/Users/simonknogler/Desktop/SportApp-Landing/src/components/FinalCTA.astro?astro&type=script&index=0&lang.ts":"_astro/FinalCTA.astro_astro_type_script_index_0_lang.CRRDngs3.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["/Users/simonknogler/Desktop/SportApp-Landing/src/pages/survey.astro?astro&type=script&index=0&lang.ts","const t=document.getElementById(\"survey-form\"),s=document.getElementById(\"survey-success\"),o=document.getElementById(\"skip-survey\"),r=new URLSearchParams(window.location.search),d=r.get(\"id\");t?.addEventListener(\"submit\",async i=>{i.preventDefault();const e=new FormData(t),a={waitlist_id:d,training_frequency:e.get(\"training_frequency\"),biggest_pain_point:e.get(\"biggest_pain_point\"),role:e.get(\"role\"),would_pay:e.get(\"would_pay\"),most_exciting_feature:e.get(\"most_exciting_feature\"),heard_about_us:e.get(\"heard_about_us\")};try{if(!(await fetch(\"/api/survey\",{method:\"POST\",headers:{\"Content-Type\":\"application/json\"},body:JSON.stringify(a)})).ok)throw new Error(\"Failed to submit survey\");t.classList.add(\"hidden\"),s?.classList.remove(\"hidden\")}catch(n){console.error(n),t.classList.add(\"hidden\"),s?.classList.remove(\"hidden\")}});o?.addEventListener(\"click\",()=>{t.classList.add(\"hidden\"),s?.classList.remove(\"hidden\")});"],["/Users/simonknogler/Desktop/SportApp-Landing/src/components/Hero.astro?astro&type=script&index=0&lang.ts","const e=document.getElementById(\"waitlist-form\"),m=document.getElementById(\"additional-fields\"),d=document.getElementById(\"success-message\"),l=document.getElementById(\"error-message\"),o=document.getElementById(\"error-text\"),s=e.querySelector('input[name=\"email\"]'),u=e.querySelector('button[type=\"submit\"]');let r=1;e.addEventListener(\"submit\",async c=>{if(c.preventDefault(),r===1){if(!s.value||!s.validity.valid){s.focus();return}m?.classList.remove(\"hidden\"),u.classList.add(\"hidden\"),r=2;return}const a=new FormData(e),n={email:a.get(\"email\"),martial_art:a.get(\"martial_art\"),experience_level:a.get(\"experience_level\"),utm_source:new URLSearchParams(window.location.search).get(\"utm_source\")||\"\",utm_medium:new URLSearchParams(window.location.search).get(\"utm_medium\")||\"\",utm_campaign:new URLSearchParams(window.location.search).get(\"utm_campaign\")||\"\"};try{const t=await fetch(\"/api/waitlist\",{method:\"POST\",headers:{\"Content-Type\":\"application/json\"},body:JSON.stringify(n)}),i=await t.json();if(!t.ok)throw new Error(i.error||\"Failed to join waitlist\");e.classList.add(\"hidden\"),d?.classList.remove(\"hidden\"),localStorage.setItem(\"waitlist_signup\",JSON.stringify({email:n.email,id:i.id})),setTimeout(()=>{window.location.href=`/survey?id=${i.id}`},2e3)}catch(t){l?.classList.remove(\"hidden\"),o&&(o.textContent=t.message||\"Something went wrong. Please try again.\")}});"],["/Users/simonknogler/Desktop/SportApp-Landing/src/components/FinalCTA.astro?astro&type=script&index=0&lang.ts","const t=document.getElementById(\"cta-waitlist-form\"),s=document.getElementById(\"cta-success-message\");t?.addEventListener(\"submit\",async a=>{a.preventDefault();const n=new FormData(t).get(\"email\");try{const e=await fetch(\"/api/waitlist\",{method:\"POST\",headers:{\"Content-Type\":\"application/json\"},body:JSON.stringify({email:n,martial_art:\"unknown\",experience_level:\"unknown\",utm_source:new URLSearchParams(window.location.search).get(\"utm_source\")||\"\",utm_medium:new URLSearchParams(window.location.search).get(\"utm_medium\")||\"\",utm_campaign:new URLSearchParams(window.location.search).get(\"utm_campaign\")||\"\"})});if(!e.ok){const o=await e.json();throw new Error(o.error||\"Failed to join waitlist\")}t.classList.add(\"hidden\"),s?.classList.remove(\"hidden\")}catch(e){console.error(e),alert(\"Something went wrong. Please try again.\")}});"]],"assets":["/_astro/index.CF_J7F39.css","/favicon.ico","/favicon.svg"],"buildFormat":"directory","checkOrigin":true,"allowedDomains":[],"serverIslandNameMap":[],"key":"Ku28vxlvKwz6yms/9LZTzQoKM6BxFyHs8l31SdtGnUg="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
