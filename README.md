# Headless Sidebar for Deno Fresh

A headless sidebar island for Deno Fresh.

## Usage

1.  Import the island

    ```json
    {
        "imports": {
            "sidebar/": "https://deno.land/x/fresh_sidebar@vx.x.x/"
        }
    }
    ```

2.  Add the plugin to `fresh.config.ts`

    ```typescript
    import { defineConfig } from "$fresh/server.ts";
    import tailwind from "$fresh/plugins/tailwind.ts";
    import sidebar from "sidebar/plugin.ts";

    export default defineConfig({
      plugins: [tailwind(), sidebar()],
    });
    ```

3.  Re-export the `Sidebar` component

    ```typescript
    // <project>/islands/Sidebar.tsx
    export {
      Sidebar,
      SidebarProvider,
      SidebarToggleButton,
    } from "sidebar/islands/Sidebar.tsx";
    ```

4.  Setup sidebar for the frontend.

    ```tsx
    // _app.tsx
    import { type PageProps } from "$fresh/server.ts";
    import { Sidebar, SidebarProvider } from "../islands/Sidebar.tsx";

    export default function App({ Component }: PageProps) {
      return (
        <html>
          <head>
            <meta charset="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>fresh-test</title>
            <link rel="stylesheet" href="/styles.css" />
          </head>
          <body>
            <div class="flex flex-row">
              <SidebarProvider>
                <Sidebar>
                  {/* Your sidebar shildren here */}
                </Sidebar>
                <Component />
              </SidebarProvider>
            </div>
          </body>
        </html>
      );
    }
    ```

    Last but not least, add the `<SidebarToggleButton />` wherever inside the Sidebar Provider. (Even inside nested component)

## Customization

The plugin use tailwindcss and twMerge to compose the island, so make sure your Fresh app support tailwindcss.

```typescript
/**
 * The class passed in will overwrite the default styles.
 */
interface SidebarProps {
  children: ComponentChildren;
  class?: string;
}

/**
 * If `children` is not specified, default button will use svg from lucide.dev/icons/panel-left
 */
interface SidebarToggleButtonProps {
  children?: ComponentChildren;
  class?: string;
}
```

## Minimum Reproduce Example

For the following demo, the `routes/_app.tsx` and `routes/index.tsx` look like this.

```tsx
// routes/_app.tsx
import { type PageProps } from "$fresh/server.ts";
import { Sidebar, SidebarProvider } from "../islands/Sidebar.tsx";

export default function App({ Component }: PageProps) {
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>fresh-test</title>
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body>
        <div class="flex flex-row">
          <SidebarProvider>
            <Sidebar>
              <p>sidebar!!</p>
            </Sidebar>
            <Component />
          </SidebarProvider>
        </div>
      </body>
    </html>
  );
}
```

```tsx
// routes/index.tsx
import { useSignal } from "@preact/signals";
import Counter from "../islands/Counter.tsx";

import { SidebarToggleButton } from "../islands/Sidebar.tsx";

export default function Home() {
  const count = useSignal(3);
  return (
    <div class="w-full bg-[#86efac]">
      <SidebarToggleButton>Button</SidebarToggleButton>
      <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
        <img
          class="my-6"
          src="/logo.svg"
          width="128"
          height="128"
          alt="the Fresh logo: a sliced lemon dripping with juice"
        />
        <h1 class="text-4xl font-bold">Welcome to Fresh</h1>
        <p class="my-4">
          Try updating this message in the
          <code class="mx-2">./routes/index.tsx</code> file, and refresh.
        </p>
        <Counter count={count} />
      </div>
    </div>
  );
}
```

https://github.com/user-attachments/assets/29f2c895-1eb3-4efb-a955-a6c34863391e
