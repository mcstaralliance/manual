import { defineClientConfig } from "vuepress/client";
import SponsorCatalog from "./components/SponsorCatalog.vue";

export default defineClientConfig({
  enhance({ app }) {
    app.component("SponsorCatalog", SponsorCatalog);
  },
});
