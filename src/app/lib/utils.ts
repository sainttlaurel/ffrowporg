// Re-export cn from the canonical shadcn/ui utils location
export { cn } from "@/app/components/ui/utils";

/** Smooth-scroll to a section by its HTML id. */
export function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}
