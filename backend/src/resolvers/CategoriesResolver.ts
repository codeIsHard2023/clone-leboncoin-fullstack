import { Arg, Query, Resolver, ID, Mutation, Info } from "type-graphql";
import {
  Category,
  CreateCategoryInput,
  UpdateCategoryInput,
} from "../entities/Category";
import { validate } from "class-validator";
import { GraphQLResolveInfo } from "graphql";
import { hasRelation } from "../utils/relationCheck";

@Resolver()
export class CategoriesResolver {
  @Query(() => [Category])
  async categories(@Info() info: GraphQLResolveInfo): Promise<Category[]> {
    const categories = await Category.find({
      relations: {
        ads: hasRelation(info, "ads")
          ? {
              tags: hasRelation(info, "tags"),
            }
          : false,
      },
    });
    return categories;
  }

  @Query(() => Category, { nullable: true })
  async category(
    @Arg("id", () => ID) id: number,
    @Info() info: GraphQLResolveInfo
  ): Promise<Category | null> {
    const category = await Category.findOne({
      where: { id },
      relations: {
        ads: hasRelation(info, "ads")
          ? {
              tags: hasRelation(info, "tags"),
            }
          : false,
      },
    });
    if (category) {
      return category;
    } else {
      return null;
    }
  }

  @Query(() => [Category], { nullable: true })
  async getAdsCategory(
    @Arg("id", () => ID) id: number
  ): Promise<Category[] | null> {
    const ads = await Category.find({
      relations: {
        ads: {
          tags: true,
        },
      },
      where: {
        id,
      },
    });

    return ads;
  }

  @Mutation(() => Category)
  async createCategory(
    @Arg("data", () => CreateCategoryInput) data: CreateCategoryInput
  ): Promise<Category | null> {
    const newCategory = new Category();
    Object.assign(newCategory, data);
    const errors = await validate(newCategory);

    if (errors.length) {
      throw new Error(
        errors.map((e) => Object.values(e.constraints!)).join(", ")
      );
      // return null;
    } else {
      await newCategory.save();
      return newCategory;
    }
  }

  @Mutation(() => Category, { nullable: true })
  async updateCategory(
    @Arg("id", () => ID) id: number,
    @Arg("data", () => UpdateCategoryInput) data: UpdateCategoryInput
  ): Promise<Category | null> {
    const categoryToUpdate = await Category.findOneBy({ id });

    if (categoryToUpdate) {
      Object.assign(categoryToUpdate, data);

      const errors = await validate(categoryToUpdate);

      if (errors.length) {
        return null;
      } else {
        await categoryToUpdate.save();
      }
    }
    return categoryToUpdate;
  }

  @Mutation(() => Category, { nullable: true })
  async deleteCategory(
    @Arg("id", () => ID) id: number
  ): Promise<Category | null> {
    const categoryToDelete = await Category.findOneBy({ id });

    if (categoryToDelete) {
      const category = { ...categoryToDelete };
      await categoryToDelete.remove();
      return category as Category;
    } else {
      return null;
    }
  }
}
