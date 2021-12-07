import Product from '../models/products.js'

export const viewProducts = async (req,res)=>{
  try {
   let products = await Product.find({}).lean()
   res.status(200).render('products',{products:products})
  } 
  catch (e) { console.log(e) }
  
}

export const view = async  (req,res)=>{
  try {
    let products = await Product.find({}).lean()
    res.status(200).render('editProducts',{productosparaver:products})
  } 
  catch (e) { console.log(e) }
    

  
  }

  export const create =  async (req,res)=>{
    
    req.body.url = Math.floor(Math.random()*10000000000) + ".jpg" 

    req.files.url.mv(`./public/img/products/${req.body.url}`,err => {
      if(err) return res.status(500).send({ message : err })
      return res.status(200).render("nofound",{message:"no se encontro el Producto"})
      })

      try {
        const product= new Product(req.body)
        await product.save()
        res.status(200).redirect('/editproductos')
        
      } 
      catch (e) { console.log(e) }
    

  
  }

  export const del = async (req,res) =>{
    try {
      const productfound = await Product.find({_id:req.body._id}).lean()
         if ((Object.entries(productfound).length === 0)) {
           return res.status(200).render("nofound",{message:"no se encontro el Producto"})
         }
         await Product.deleteOne({ _id: req.body._id })
         res.status(200).redirect('/editproductos')
     
   } 
   catch (e) { console.log(e) }
    

  }

  export const update = async (req,res) =>{

    let product = {}
    if(req.body.name)  product.name = req.body.name
    if(req.body.price) product.price = req.body.price
    if(req.body.stock) product.stock = req.body.stock

    try {
      const productfound = await Product.find({_id:req.body._id}).lean()
      if ((Object.entries(productfound).length === 0)) {
        return res.status(200).render("nofound",{message:"no se encontro el Producto"})
      }
      
      if(req.files){
        const EDFile = req.files.url
      EDFile.mv(`./public/img/products/${productfound[0].url}`,err => {
        if(err) return res.status(500).send({ message : err })
        return res.status(200).render("nofound",{message:"no se encontro el Producto"})
        })
      }

      await Product.findOneAndUpdate(
        { _id: req.body._id },
        { $set: product},
        { new: true }
      )
       res.status(200).redirect('/editproductos')
    } 
    catch (e) { console.log(e) }
    
  }

