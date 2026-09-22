import { createRouter, createWebHistory } from "vue-router";
import { metaFor } from "../lib/seo";

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
      path: "/zadanie",
      name: "zadanie",
      component: () => import("../views/ZadanieView.vue"),
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

router.afterEach((to) => {
  const meta = metaFor(to.name, to.params as Record<string, string | string[]>);
  document.title = meta.title;
  const setContent = (selector: string, content: string) =>
    document.querySelector(selector)?.setAttribute("content", content);
  setContent('meta[name="description"]', meta.description);
  setContent('meta[property="og:title"]', meta.title);
  setContent('meta[property="og:description"]', meta.description);
  setContent('meta[property="og:url"]', meta.url);
  document.querySelector('link[rel="canonical"]')?.setAttribute("href", meta.url);
});

export default router;
