import handlebars  from "express-handlebars"
import path from 'path'

 const hb = (app,__dirname) => {

app.engine("hbs", handlebars({
    extname: "hbs",
    defaultLayout: "index",
    layoutsDir: path.join(__dirname, "/src/views/layouts"),
    partialsDir: path.join(__dirname, "/src/views/partials"),
  }));
  app.set('views', path.join(__dirname, 'src/views'))
  app.set('view engine', 'hbs');
}
export default hb

