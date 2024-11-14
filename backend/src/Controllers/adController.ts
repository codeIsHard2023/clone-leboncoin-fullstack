import express from "express";
import { Ad } from "../entities/Ad";

export const router = express.Router();

router.get("/category/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const ads = await Ad.find({
      relations: {
        category: true,
        tags: true,
      },
      where: {
        category: {
          id,
        },
      },
    });

    if (ads) {
      console.log(ads);
      res.status(200).json(ads);
    } else {
      res.status(404).json({ message: "Data not found" });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
