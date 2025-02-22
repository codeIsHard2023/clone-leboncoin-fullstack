import {
  Arg,
  Query,
  Resolver,
  ID,
  Mutation,
  Authorized,
  Ctx,
} from "type-graphql";

import { validate } from "class-validator";
import { Ad, AdCreateInput, AdUpdateInput } from "../entities/Ad";
import { Tag } from "../entities/Tag";
import { ContextType } from "../utils/auth";

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
  @Authorized()
  @Mutation(() => Ad)
  async createAd(
    @Arg("data", () => AdCreateInput) data: AdCreateInput,
    @Ctx() context: ContextType
  ): Promise<Ad> {
    const newAd = new Ad();
    Object.assign(newAd, data, { createdBy: context.user });

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
        const { tags, ...restData } = data;

        Object.assign(adToUpdate, restData);

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
        throw new Error(`Error validation : ${errors}`);
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

  @Authorized()
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
