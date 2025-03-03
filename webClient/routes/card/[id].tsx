import { Handlers, PageProps } from "$fresh/server.ts";
import { getEntry, ContentfulEntry } from "../../utils/contentful.ts";

interface CardTemplate {
  data: {}
}

interface PageData {
  post: ContentfulEntry<CardTemplate>;
}

export const handler: Handlers<PageData> = {
  async GET(_req, ctx) {
    try {
      const card = await getEntry<CardTemplate>(ctx.params.id);
      return ctx.render({ card });
    } catch (error) {
      console.error("Failed to fetch card:", error);
      return new Response("Card not found", { status: 404 });
    }
  },
};

export default function CardVisitPage({ data }: PageProps<PageData>) {
  const { card } = data;

  return (
    <article class="p-4 max-w-2xl mx-auto">
      {JSON.stringify(card.fields.data)}
    </article>  
  );
} 