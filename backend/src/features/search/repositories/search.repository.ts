import { CafeModel } from "../../cafes/models/cafe.model.js";
import { ReviewModel } from "../../reviews/models/review.model.js";
import { GameModel } from "../models/game.model.js";
import type { SearchResultDto } from "../utils/search-utils.js";

export const searchRepository = {
  async findCafeResults(term: string) {
    const filter = term
      ? { $text: { $search: term } }
      : {};

    const cafes = await CafeModel.find(filter).limit(100);
    return cafes.map<SearchResultDto>((cafe) => ({
      id: cafe.slug,
      type: "cafe",
      title: cafe.name,
      subtitle: `${cafe.neighborhood}, ${cafe.city}`,
      description: cafe.description,
      rating: cafe.rating,
      location: cafe.neighborhood,
      tags: [...cafe.featuredGames, ...cafe.amenities],
      popularity: Math.round(cafe.rating * 20),
    }));
  },

  async findGameResults(term: string) {
    const filter = term ? { $text: { $search: term } } : {};
    const games = await GameModel.find(filter).limit(100);

    return games.map<SearchResultDto>((game) => ({
      id: game.slug,
      type: "game",
      title: game.title,
      subtitle: game.subtitle,
      description: game.description,
      rating: game.rating,
      tags: game.tags,
      popularity: game.popularity,
    }));
  },

  async findReviewResults(term: string) {
    const filter = term ? { $text: { $search: term } } : {};
    const reviews = await ReviewModel.find(filter).limit(100);

    return reviews.map<SearchResultDto>((review) => ({
      id: review.slug,
      type: "review",
      title: review.title,
      subtitle: `Review for ${review.cafeName}`,
      description: review.comment,
      rating: review.rating,
      location: review.cafeName,
      tags: review.tags,
      popularity: review.helpfulCount,
    }));
  },

  async upsertGames(games: Array<Record<string, unknown>>) {
    for (const game of games) {
      await GameModel.findOneAndUpdate({ slug: game.slug }, game, {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true,
      });
    }
  },
};
