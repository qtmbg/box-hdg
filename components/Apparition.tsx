"use client";

import { useEffect } from "react";

/**
 * Apparition en fondu montant : 200 ms, 8 px. Rien d'autre.
 *
 * Un point mérite d'être explicité, parce que la première version s'y est
 * cassé les dents : on ne masque jamais ce qui est déjà peint. Poser une
 * classe globale après l'hydratation faisait disparaître le héros pour le
 * refaire apparaître — un clignotement, un nouveau candidat au LCP, et un
 * décalage de mise en page pour rien.
 *
 * Ici, seuls les blocs situés sous la ligne de flottaison reçoivent l'état
 * masqué, et seulement une fois le script exécuté. Ce qui est visible au
 * chargement le reste. Sans JavaScript, rien n'est masqué du tout.
 */
export function Apparition() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const cibles = document.querySelectorAll<HTMLElement>("[data-apparition]");
    if (!cibles.length) return;

    const hauteur = window.innerHeight;
    const aAnimer: HTMLElement[] = [];

    // Une seule passe de lecture, puis une seule passe d'écriture : on ne
    // provoque pas de recalcul de mise en page à chaque élément.
    const positions = Array.from(cibles, (cible) => cible.getBoundingClientRect().top);
    cibles.forEach((cible, i) => {
      if (positions[i] < hauteur * 0.92) return;
      cible.setAttribute("data-anime", "");
      aAnimer.push(cible);
    });

    if (!aAnimer.length) return;

    const observateur = new IntersectionObserver(
      (entrees) => {
        for (const entree of entrees) {
          if (!entree.isIntersecting) continue;
          entree.target.setAttribute("data-visible", "");
          observateur.unobserve(entree.target);
        }
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.01 },
    );

    aAnimer.forEach((cible, i) => {
      // Les blocs d'une même rangée s'échelonnent légèrement.
      cible.style.setProperty("--retard", `${Math.min(i % 4, 3) * 60}ms`);
      observateur.observe(cible);
    });

    return () => observateur.disconnect();
  }, []);

  return null;
}
