import { createRouter, createWebHistory } from "vue-router";

const SUBJECT_LABELS: Record<string, string> = {
  matematyka: "Matematyka",
  fizyka: "Fizyka",
  chemia: "Chemia",
  geografia: "Geografia",
};

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/WzornikView.vue"),
      props: { subject: undefined },
    },
    {
      path: "/wzornik/:subject?",
      name: "wzornik",
      component: () => import("../views/WzornikView.vue"),
      props: true,
    },
    {
      path: "/wzornik/:subject/:formula",
      name: "solver",
      component: () => import("../views/SolverView.vue"),
      props: true,
    },
    {
      path: "/historia",
      name: "historia",
      component: () => import("../views/HistoriaView.vue"),
    },
    {
      path: "/konwerter",
      name: "konwerter",
      component: () => import("../views/ConverterView.vue"),
    },
    {
      path: "/ustawienia",
      name: "ustawienia",
      component: () => import("../views/SettingsView.vue"),
    },
    {
      path: "/kalkulatory/:subject?/:formula?",
      redirect: (to) => {
        const subject = typeof to.params.subject === "string" ? `/${to.params.subject}` : "";
        const formula = typeof to.params.formula === "string" ? `/${to.params.formula}` : "";
        return `/wzornik${subject}${formula}`;
      },
    },
    {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: () => import("../views/NotFoundView.vue"),
    },
  ],
});

const BASE_DESC = "Wzory i kalkulatory maturalne — działa offline, dokładność szkolna.";

function titleFor(
  name: string | symbol | null | undefined,
  params: Record<string, string | string[]>,
): string {
  const subject = typeof params.subject === "string" ? SUBJECT_LABELS[params.subject] : undefined;
  switch (name) {
    case "home":
      return "Wzornik Maturalny — wzory i kalkulatory maturalne offline";
    case "wzornik":
      return subject
        ? `Wzornik — ${subject} | Wzornik Maturalny`
        : "Wzornik — wszystkie wzory | Wzornik Maturalny";
    case "solver":
      return typeof params.formula === "string"
        ? `Kalkulator — ${params.formula} | Wzornik Maturalny`
        : "Kalkulator | Wzornik Maturalny";
    case "historia":
      return "Historia i ulubione | Wzornik Maturalny";
    case "konwerter":
      return "Konwerter jednostek | Wzornik Maturalny";
    case "ustawienia":
      return "Ustawienia | Wzornik Maturalny";
    default:
      return "Wzornik Maturalny";
  }
}

router.afterEach((to) => {
  document.title = titleFor(to.name, to.params as Record<string, string | string[]>);
  document.querySelector('meta[name="description"]')?.setAttribute("content", BASE_DESC);
});

export default router;
