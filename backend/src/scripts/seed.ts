import { cafeRepository } from "../features/cafes/repositories/cafe.repository.js";
import { reviewRepository } from "../features/reviews/repositories/review.repository.js";
import { searchRepository } from "../features/search/repositories/search.repository.js";
import { connectMongoDB, disconnectMongoDB } from "../shared/database/mongodb.js";
import { cafeSeedData, gameSeedData, reviewSeedData } from "./seed-data.js";

async function seed() {
  await connectMongoDB();

  await cafeRepository.upsertMany([...cafeSeedData]);
  await reviewRepository.upsertMany([...reviewSeedData]);
  await searchRepository.upsertGames([...gameSeedData]);

  console.info("Database seeded successfully.");
  await disconnectMongoDB();
}

seed().catch((error) => {
  console.error("Seed failed", error);
  process.exit(1);
});
