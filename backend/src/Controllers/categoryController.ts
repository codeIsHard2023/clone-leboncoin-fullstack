import express from "express";
import { Category } from "../entities/Category";
import { validate } from "class-validator";

export const router = express.Router();

router.get("/:id/ads", async (req, res) => {
  const id = parseInt(req.params.id);
  const ads = await Category.find({
    relations: {
      ads: true,
    },
    where: {
      id,
    },
  });

  res.json(ads);
});

router.delete("/:id", async (req, res) => {
  try {
    const id: number = parseInt(req.params.id);
    const categoryToDelete = await Category.findOneBy({ id });

    if (categoryToDelete) {
      await categoryToDelete.remove();
      res.status(200).json({ message: "Category delete is succesfull" });
    } else {
      res.status(404).json({ message: "Category delete is failed" });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
