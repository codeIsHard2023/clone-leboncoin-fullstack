import express from 'express'

const app = express()

const port : number = 3000

app.use(express.json())

type Ad = {
    id:number,
    title: string, 
    description: string, 
    owner: string, 
    price: number, 
    picture: string, 
    location: string, 
    createdAt: string
}

const ads : Ad[] = [
    {
      id: 1,
      title: "Bike to sell",
      description:
        "My bike is blue, working fine. I'm selling it because I've got a new one",
      owner: "bike.seller@gmail.com",
      price: 100,
      picture: 
        "https://images.lecho.be/view?iid=dc:113129565&context=ONLINE&ratio=16/9&width=640&u=1508242455000",
      location: "Paris",
      createdAt: "2023-09-05T10:13:14.755Z",
    },
    {
      id: 2,
      title: "Car to sell",
      description:
        "My car is blue, working fine. I'm selling it because I've got a new one",
      owner: "car.seller@gmail.com",
      price: 10000,
      picture:
        "https://www.automobile-magazine.fr/asset/cms/34973/config/28294/apres-plusieurs-prototypes-la-bollore-bluecar-a-fini-par-devoiler-sa-version-definitive.jpg",
      location: "Paris",
      createdAt: "2023-10-05T10:14:15.922Z",
    },
  ];

app.get("/api/ads", (req, res) => {
    res.send(ads)
})

app.post("/api/ads", (req, res) => {
    const ad: any = req.body
    const id = ads[ads.length -1].id + 1  
    ads.push({id, ...ad})
    res.send(`succes: ${id}`)
})

app.put("/api/ads/:id", (req, res) => {
  const id: number = Number(req.params.id)
  const updateValues: Ad = req.body
  
  let adToUpdate: Ad | undefined
  let index = -1
  for(let i = 0; i < ads.length; i++){
    if(ads[i].id === id){
      adToUpdate = ads[i]
      index = i
      break;
    }
  }
  
  if(adToUpdate && index !== -1){
    ads[index] = adToUpdate
  } else{
    res.status(400).json(`Update refused as id : ${id} not found`)
  }
})

app.patch("/api/ads/:id", (req, res) => {
  const id : number = Number(req.params.id)
  const editValues = req.body
  
  let adToEdit: Ad | undefined; 
  for(let i = 0; i < ads.length; i++){
    if(ads[i].id === id){
      adToEdit = ads[i]
      break;
    }
  }

  if(adToEdit){
    Object.assign(adToEdit, editValues, {id: adToEdit.id})
    res.status(200).json(adToEdit)
  } else{
    res.status(404).json("Error while updating data")
  }
})

app.delete("/api/ads/:id", (req, res) => {
    const id : number = Number(req.params.id)
    let index : number = -1

    for(let i = 0; i < ads.length; i++){
        if(ads[i].id === id){
            index = i
            break;  
        }
    }
    
    if(index >= 0){
      ads.splice(index, 1)
      res.send(`Delete successful on id ${id}`)
    } else{
      res.send(`Error has occured: id:${id} doesn't exist`)
    } 
})

app.listen(port, () => {
    console.log(`Listen on port ${port}`)
})