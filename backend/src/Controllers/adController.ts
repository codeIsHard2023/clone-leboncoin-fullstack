import express from "express"
import { Ad } from "../../db/entities/Ad"
import { validate} from "class-validator"

export const router = express.Router(); 

router.get("/", async (req, res) => {
    try {
      // let ads : Ad[] ;
      // const query = req.query
      // const tags: string[] = [...Object.values(query)] 

      // if(tags.length > 0){
      //   ads = await Ad.find({
      //     relations: {
      //       tags:true
      //     },
      //         where: {
      //           tags: {
      //             name: tags[0].forEach(element => {
      //               return element
      //             })
      //           }
      //         }
      //   })
      //   console.log(tags)
      //  } else {
      //   ads = await Ad.find({
      //     relations: {
      //       tags: true
      //     }
      //  })}
       
      //  ,
      //     where: {
      //       tags: {
      //         name: tags.forEach(element => {
      //           return element
      //         })
      //       }
      //     }
   
      const ads = await Ad.find()

      if(ads){
        console.log(ads)
        res.status(200).json(ads)
      } else {
        res.status(404).json({message: 'Data not found'})
      }
    } catch(e){
      console.error(e);
      res.status(500).json({message: 'Internal Server Error'})
    }
  })

  router.get("/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id)
      const ad = await Ad.findOneBy({ id })
  
      if(ad) {
        console.log(ad)
        res.status(200).json(ad)
      } else {
        res.status(404).json({message: 'Data not found'})
      }
    } catch(e){
      console.error(e);
      res.status(500).json({message: 'Internal Server Error'})
    }
  })

  router.get("/category/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id)
      const ads = await Ad.find({
        relations:{
          category: true,
        },
        where: {
          category: {
            id
          }
        }
       })
  
      if(ads) {
        console.log(ads)
        res.status(200).json(ads)
      } else {
        res.status(404).json({message: 'Data not found'})
      }
    } catch(e){
      console.error(e);
      res.status(500).json({message: 'Internal Server Error'})
    }
  })
  
  router.post("/", async (req, res) => {
    try {
      const newAd = new Ad()
      Object.assign(newAd, req.body)
      
      const errors = await validate(newAd); 

      if(errors.length){
        res.status(400).json(errors)
      } else {
        console.log(newAd)
        await newAd.save()
        res.status(200).json({ message: 'Ad created succesfully'})
      }
    } catch(e){
      console.error(e);
      res.status(500).json({message: 'Internal Server Error'})
    }
  })
  
  router.put("/:id", async (req, res) => {
    try {
      const id: number = parseInt(req.params.id)
      const adToUpdate = await Ad.findOneBy({ id })
    
      if(adToUpdate) {
        Object.assign(adToUpdate, req.body, {id : adToUpdate.id, createdAt: adToUpdate.createdAt})

        const errors = await validate(adToUpdate)
        
        if(errors.length){
           res.status(400).json(errors)
        } else {
            await adToUpdate.save()
            console.log(adToUpdate)
            res.status(200).json({ message: 'Ad updated succesfully'})
        }
      } else {
        res.status(404).json({message: 'Update failed'})
      }
    } catch(e){
      console.error(e);
      res.status(500).json({message: 'Internal Server Error'})
    }
    
  })
  
  router.patch("/:id", async (req, res) => {
    try{
      const id = parseInt(req.params.id)
      const adToModify = await Ad.findOneBy({ id})
      console.log(adToModify)
      
      if(adToModify){
        Object.assign(adToModify, req.body)

        const errors = await validate(adToModify)

        if(errors) {
            res.status(400).json(errors)
        } else {
            await adToModify.save()
            console.log(adToModify)
            res.status(200).json({ message: 'Ad updated succesfully'})
        }
      } else{
        res.status(404).json({message: 'Update failed'})
      }
    } catch(e){
      console.error(e);
      res.status(500).json({message: 'Internal Server Error'})
    }
  })
  
  router.delete("/:id", async (req, res) => {
    try {
      const id: number = parseInt(req.params.id)
      const adToDelete = await Ad.findOneBy({ id })
  
      if(adToDelete){
        await adToDelete.remove()
        res.status(200).json({message: 'Ad removed succesfully'})
      } else {
        res.status(404).json({message: 'Ad is not found'})
      }
    } catch(e){
      console.error(e);
      res.status(500).json({message: 'Internal Server Error'})
    }  
  
  
  })