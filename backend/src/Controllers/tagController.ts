import express from 'express'
import { Tag } from '../../db/entities/Tag'
import {validate} from 'class-validator'

export const router = express.Router()

router.get("/", async (req, res) => {
    const tags = await Tag.find()
    console.log(tags)
    res.status(204).json(tags)
  
  })
  
  router.get("/:id", async (req, res) => {
    try {
      const id: number = parseInt(req.params.id)
      const tag = await Tag.findOneBy({ id })
  
      if(tag){
        res.status(200).json(tag)
      } else{
        res.status(404).json({message: 'Tag not found'})
      }
    } catch(e){
      console.error(e)
      res.status(500).json({message: 'Internal Server Error'})
    }
  })
  
  // router.get("/:id/ads", (req, res) => {

  //   const ads = Tag.find({
  //     relations: {
  //       ads: true,
  //     }
  //   })

  //   res.json(ads)
  
  // })
  
  router.post("/", async (req, res) => {
    try {
      const newTag = new Tag();
      newTag.name = req.body.name

      const errors = await validate(newTag)

      if(errors.length){
        res.status(400).json(errors)
      } else {
        await newTag.save() 
        console.log(newTag)
        res.status(204).json({message: 'New tag added'})
      }
    } catch(e){
      console.error(e);
      res.status(500).json({ message: 'Internal Server Error'})
    }
  })
  
  router.put("/:id", async (req, res) => {
    try {
      const id: number = parseInt(req.params.id)
      const tagToUpdate = await Tag.findOneBy({ id })
    
    if(tagToUpdate){
      Object.assign(tagToUpdate, req.body)

      const errors = await validate(tagToUpdate)

      if(errors.length) {
        res.status(400).json(errors)
      } else {
        tagToUpdate.save()
        res.status(200).json({message: 'Tag updade is succesfull'})
      }
    } else {
      res.status(404).json({ message: 'Tag updade is failed'})
    }
    } catch(e) {
      console.error(e)
      res.status(500).json({ message: 'Internal Server Error'})
    }
  })
  
  router.delete("/:id", async (req, res) => {
    try {
      const id: number = parseInt(req.params.id)
      const tagToDelete = await Tag.findOneBy({ id })
    
    if(tagToDelete){
      await tagToDelete.remove()
      res.status(200).json({message: 'Tag delete is succesfull'})
    } else {
      res.status(404).json({ message: 'Tag delete is failed'})
    }
    } catch(e) {
      console.error(e)
      res.status(500).json({ message: 'Internal Server Error'})
    }
  })