import {
  Arg,
  Query,
  Resolver,
  ID,
  Mutation,
  InputType,
  Field,
} from "type-graphql";
import { Category } from "../entities/Category";
import { validate } from "class-validator";

@InputType()
export class CategoryUpdateInput {
  @Field(() => String)
  name!: string;
}

@Resolver()
export class CategoryResolver {
  @Query(() => [Category])
  async categories(): Promise<Category[]> {
    const categories = await Category.find();
    return categories;
  }

  @Query(() => Category, { nullable: true })
  async category(@Arg("id", () => ID) id: number): Promise<Category | null> {
    const category = await Category.findOneBy({ id });
    if (category) {
      return category;
    } else {
      return null;
    }
  }

  @Mutation(() => Category)
  async addCategory(@Arg("name") name: string): Promise<Category | null> {
    const newCategory = new Category();
    newCategory.name = name;
    const errors = await validate(newCategory);

    if (errors.length) {
      return null;
    } else {
      await newCategory.save();
      return newCategory;
    }
  }

  @Mutation(() => Category)
  async updateCategory(
    @Arg("id", () => ID) id: number,
    @Arg("data", () => CategoryUpdateInput) data: CategoryUpdateInput
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

  @Mutation(() => Boolean)
  async deleteCategory(@Arg("id", () => ID) id: number): Promise<boolean> {
    const categoryToDelete = await Category.findOneBy({ id });

    if (categoryToDelete) {
      await categoryToDelete.remove();
      return true;
    } else {
      return false;
    }
  }
}
