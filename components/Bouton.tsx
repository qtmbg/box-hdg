import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variante = "principal" | "secondaire";

const classes: Record<Variante, string> = {
  principal: "bouton bouton-principal",
  secondaire: "bouton bouton-secondaire",
};

export function BoutonLien({
  href,
  variante = "principal",
  children,
  className = "",
  ...reste
}: {
  href: string;
  variante?: Variante;
  children: ReactNode;
  className?: string;
} & Omit<ComponentProps<typeof Link>, "href" | "className" | "children">) {
  const interne = href.startsWith("/");
  const cn = `${classes[variante]} ${className}`.trim();

  if (interne) {
    return (
      <Link href={href} className={cn} {...reste}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={cn}>
      {children}
    </a>
  );
}
