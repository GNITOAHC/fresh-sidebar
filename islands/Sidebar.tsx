import type { ComponentChildren } from "preact";
import { createContext, FunctionalComponent } from "preact";
import { useContext, useState } from "preact/hooks";
import { twMerge } from "https://esm.sh/tailwind-merge@2.5.4";
import { type ClassValue, clsx } from "https://esm.sh/clsx@2.1.1";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface SidebarContextProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(
  undefined,
);

export const SidebarProvider: FunctionalComponent = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen((prev) => !prev);

  return (
    <SidebarContext.Provider value={{ isOpen, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within SidebarProvider");
  }
  return context;
};

interface SidebarProps {
  children: ComponentChildren;
  class?: string;
}
export const Sidebar: FunctionalComponent<SidebarProps> = (
  props: SidebarProps,
) => {
  const { isOpen } = useSidebar();

  return (
    <aside
      class={cn(
        "transition-all duration-300 ease-in-out" + (isOpen ? " w-64" : " w-0"),
        props.class,
      )}
    >
      {props.children}
    </aside>
  );
};

interface SidebarToggleButtonProps {
  children?: ComponentChildren;
  class?: string;
}
export const SidebarToggleButton: FunctionalComponent<
  SidebarToggleButtonProps
> = (props: SidebarToggleButtonProps) => {
  const { toggleSidebar } = useSidebar();

  return (
    <button
      class={cn("p-2 bg-blue-500 text-white rounded", props.class)}
      onClick={toggleSidebar}
    >
      {props.children ?? (
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-panel-left"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="M9 3v18" />
          </svg>
        </div>
      )}
    </button>
  );
};
