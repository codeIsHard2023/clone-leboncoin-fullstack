import {
  Arg,
  Query,
  Resolver,
  ID,
  Mutation,
  Info,
  Authorized,
  Ctx,
} from "type-graphql";
import {
  Category,
  CreateCategoryInput,
  UpdateCategoryInput,
} from "../entities/Category";
import { validate } from "class-validator";
import { GraphQLResolveInfo } from "graphql";
import { hasRelation } from "../utils/relationCheck";
import { ContextType } from "../utils/auth";
import { In } from "typeorm";

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
        createdBy: true,
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
        createdBy: true,
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

  @Authorized()
  @Mutation(() => Category)
  async createCategory(
    @Arg("data", () => CreateCategoryInput) data: CreateCategoryInput,
    @Ctx() context: ContextType
  ): Promise<Category | null> {
    const newCategory = new Category();
    Object.assign(newCategory, data, { createdBy: context.user });

    const errors = await validate(newCategory);

    if (errors.length) {
      throw new Error(
        errors.map((e) => Object.values(e.constraints!)).join(", ")
      );
    } else {
      await newCategory.save();
      return newCategory;
    }
  }

  @Authorized()
  @Mutation(() => Category, { nullable: true })
  async updateCategory(
    @Arg("id", () => ID) id: number,
    @Arg("data", () => UpdateCategoryInput) data: UpdateCategoryInput,
    @Ctx() context: ContextType
  ): Promise<Category | null> {
    const categoryToUpdate = await Category.findOneBy({
      id,
      createdBy: { id: context.user?.id },
    });

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

  @Authorized()
  @Mutation(() => Category, { nullable: true })
  async deleteCategory(
    @Arg("id", () => ID) id: number,
    @Ctx() context: ContextType
  ): Promise<Category | null> {
    const categoryToDelete = await Category.findOneBy({
      id,
      createdBy: { id: context.user?.id },
    });

    if (categoryToDelete) {
      const category = { ...categoryToDelete };
      await categoryToDelete.remove();
      return category as Category;
    } else {
      return null;
    }
  }
  @Authorized()
  @Mutation(() => [Category])
  async deleteCategories(
    @Arg("ids", () => [ID]) ids: number[],
    @Ctx() context: ContextType
  ): Promise<Category[]> {
    const categories = await Category.findBy({
      id: In(ids),
      createdBy: { id: context.user?.id },
    });
    await Category.delete({
      id: In(ids),
      createdBy: { id: context.user?.id },
    });
    return categories;
  }
}
