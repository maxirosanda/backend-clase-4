import mongoose from 'mongoose'

 const conectarDB = async () => {
    try {
  
      await mongoose.connect("mongodb://localhost:27017/ecommerce", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
      })
      console.log(`database connected`)
    } catch (e) {
      console.log(`error ${e}`)
      process.exit(1)
    }
  }
  export default conectarDB