import type { Plugin, PluginRenderContext } from "$fresh/server.ts";

export default function plugin(): Plugin {
  return {
    name: "fresh_sidebar",
    islands: {
      baseLocation: import.meta.url,
      paths: ["./islands/Sidebar.tsx"],
    },
    render: (ctx: PluginRenderContext) => {
      ctx.render();
      return {
        links: [
          {
            rel: "stylesheet",
            href:
              "https://cdn.jsdelivr.net/gh/GNITOAHC/fresh-sidebar@main/styles.css",
          },
          {
            rel: "stylesheet",
            href:
              "https://cdn.jsdelivr.net/gh/GNITOAHC/blog-data@main/styles.css",
          },
        ],
      };
    },
  };
}
