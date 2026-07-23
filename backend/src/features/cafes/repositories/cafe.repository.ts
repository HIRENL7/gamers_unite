import { CafeModel } from "../models/cafe.model.js";

export const cafeRepository = {
  async findPaginated(input: { page: number; pageSize: number; city?: string }) {
    const filter = input.city ? { city: new RegExp(input.city, "i") } : {};
    const skip = (input.page - 1) * input.pageSize;

    const [items, totalItems] = await Promise.all([
      CafeModel.find(filter).sort({ rating: -1 }).skip(skip).limit(input.pageSize),
      CafeModel.countDocuments(filter),
    ]);

    return { items, totalItems };
  },

  async findBySlug(slug: string) {
    return CafeModel.findOne({ slug });
  },

  async upsertMany(cafes: Array<Record<string, unknown>>) {
    for (const cafe of cafes) {
      await CafeModel.findOneAndUpdate({ slug: cafe.slug }, cafe, {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true,
      });
    }
  },

  async updateImageUrl(slug: string, imageUrl: string) {
    return CafeModel.findOneAndUpdate({ slug }, { imageUrl }, { new: true });
  },
};
