import { Arg, Query, Resolver, ID, Mutation } from "type-graphql";
import { CreateTagInput, Tag, UpdateTagInput } from "../entities/Tag";
import { validate } from "class-validator";

@Resolver()
export class TagsResolver {
  @Query(() => [Tag])
  async tags(): Promise<Tag[]> {
    const tags = await Tag.find();
    return tags;
  }

  @Query(() => Tag, { nullable: true })
  async tag(@Arg("id", () => ID) id: number): Promise<Tag | null> {
    const tag = await Tag.findOneBy({ id });
    if (tag) {
      return tag;
    } else {
      return null;
    }
  }

  //   @Query(() => [Tag], { nullable: true })
  //   async getAdsTag(@Arg("id", () => ID) id: number): Promise<Tag[] | null> {
  //     const ads = await Tag.find({
  //       relations: {
  //         ads: true,
  //       },
  //       where: {
  //         id,
  //       },
  //     });

  //     return ads;
  //   }

  @Mutation(() => Tag)
  async addTag(@Arg("data") data: CreateTagInput): Promise<Tag | null> {
    const newTag = new Tag();
    Object.assign(newTag, data);
    const errors = await validate(newTag);

    if (errors.length) {
      return null;
    } else {
      await newTag.save();
      return newTag;
    }
  }

  @Mutation(() => Tag, { nullable: true })
  async updateTag(
    @Arg("id", () => ID) id: number,
    @Arg("data", () => UpdateTagInput) data: UpdateTagInput
  ): Promise<Tag | null> {
    const tagToUpdate = await Tag.findOneBy({ id });
    console.log(tagToUpdate);
    if (tagToUpdate) {
      Object.assign(tagToUpdate, data);

      const errors = await validate(tagToUpdate);

      if (errors.length) {
        return null;
      } else {
        await tagToUpdate.save();
        console.log("updated");
      }
    }
    return tagToUpdate;
  }

  @Mutation(() => Tag, { nullable: true })
  async deleteTag(@Arg("id", () => ID) id: number): Promise<Tag | null> {
    const tagToDelete = await Tag.findOneBy({ id });

    if (tagToDelete) {
      const tag = { ...tagToDelete };
      await tagToDelete.remove();
      return tag as Tag;
    } else {
      return null;
    }
  }
}