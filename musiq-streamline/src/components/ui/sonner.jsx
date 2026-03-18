import { jsx as _jsx } from "react/jsx-runtime";
import { Toaster as Sonner, toast } from "sonner";
const getTheme = () => {
    const root = document.documentElement;
    if (root.classList.contains("dark"))
        return "dark";
    if (root.classList.contains("light"))
        return "light";
    return "system";
};
const Toaster = ({ ...props }) => {
    const theme = typeof document === "undefined" ? "system" : getTheme();
    return (_jsx(Sonner, { theme: theme, className: "toaster group", toastOptions: {
            classNames: {
                toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
                description: "group-[.toast]:text-muted-foreground",
                actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
                cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
            },
        }, ...props }));
};
export { Toaster, toast };
