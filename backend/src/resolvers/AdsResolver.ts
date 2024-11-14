import { Arg, Query, Resolver, ID, Mutation } from "type-graphql";

import { validate } from "class-validator";
import { Ad, AdCreateInput, AdUpdateInput } from "../entities/Ad";
import { Tag } from "../entities/Tag";

@Resolver()
export class AdsResolver {
  @Query(() => [Ad])
  async ads(): Promise<Ad[]> {
    const ads = await Ad.find({
      relations: {
        category: true,
        tags: true,
      },
    });
    return ads;
  }

  @Query(() => Ad, { nullable: true })
  async ad(@Arg("id", () => ID) id: number): Promise<Ad | null> {
    const ad = await Ad.findOne({
      relations: {
        category: true,
        tags: true,
      },
      where: {
        id,
      },
    });

    if (ad) {
      return ad;
    } else {
      return null;
    }
  }

  @Mutation(() => Ad)
  async addAd(
    @Arg("data", () => AdCreateInput) data: AdCreateInput
  ): Promise<Ad> {
    const newAd = new Ad();
    Object.assign(newAd, data);

    const errors = await validate(newAd);

    if (errors.length) {
      throw new Error(`Error validation : ${errors}`);
    } else {
      await newAd.save();
      return newAd;
    }
  }

  @Mutation(() => Ad, { nullable: true })
  async updateAdd(
    @Arg("id", () => ID) id: number,
    @Arg("data", () => AdUpdateInput) data: AdUpdateInput
  ): Promise<Ad | null> {
    const adToUpdate = await Ad.findOne({
      where: { id },
      relations: {
        category: true,
        tags: true,
      },
    });

    if (adToUpdate) {
      if (data.tags) {
        const { tags, ...resData } = data;

        Object.assign(adToUpdate, resData);

        adToUpdate.tags = [];
        const tagsToAdd = await Promise.all(
          tags.map((tagInput) => Tag.findOneBy({ id: tagInput.id }))
        );
        adToUpdate.tags = tagsToAdd.filter((tag): tag is Tag => tag !== null);
      } else {
        Object.assign(adToUpdate, data);
      }

      const errors = await validate(adToUpdate);
      if (errors.length) {
        return null;
      }

      await adToUpdate.save();

      return Ad.findOne({
        where: { id },
        relations: {
          category: true,
          tags: true,
        },
      });
    }
    return null;
  }

  @Mutation(() => Ad, { nullable: true })
  async deleteAd(@Arg("id", () => ID) id: number): Promise<Ad | null> {
    const adToDelete = await Ad.findOneBy({ id });

    if (adToDelete) {
      const ad = { ...adToDelete };

      await adToDelete.remove();
      return ad as Ad;
    } else {
      return null;
    }
  }
}
