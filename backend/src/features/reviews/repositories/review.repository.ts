import { ReviewModel } from "../models/review.model.js";

export const reviewRepository = {
  async findPaginated(input: { page: number; pageSize: number; cafeName?: string }) {
    const filter = input.cafeName
      ? { cafeName: new RegExp(input.cafeName, "i") }
      : {};
    const skip = (input.page - 1) * input.pageSize;

    const [items, totalItems] = await Promise.all([
      ReviewModel.find(filter).sort({ createdAt: -1 }).skip(skip).limit(input.pageSize),
      ReviewModel.countDocuments(filter),
    ]);

    return { items, totalItems };
  },

  async createReview(input: Record<string, unknown>) {
    return ReviewModel.create(input);
  },

  async upsertMany(reviews: Array<Record<string, unknown>>) {
    for (const review of reviews) {
      await ReviewModel.findOneAndUpdate({ slug: review.slug }, review, {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true,
      });
    }
  },
};
