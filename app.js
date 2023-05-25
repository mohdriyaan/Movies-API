import express from "express";
import config from "config"
import axios from "axios";

const PORT = config.get("PORT")
const moviesAPI = config.get("MOVIES_API")

const app = express();
app.use(express.json())

app.get("/", (req, res) => {
  res.status(200).json({message:"Home Page"})
});

app.get("/movies/upcoming",async(req,res)=>{
  try {
    const moviesData = await axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${moviesAPI}`)
    let data = moviesData.data.results
    let moviesName = data.map((x)=>x.original_title)
    res.status(200).json({"Upcoming Movies": moviesName})
  } catch (error) {
    res.status(500).json({message:"Internal Server Error"})
  }
})

app.use((req,res)=>{
  res.status(200).json({message:"Invalid Route"})
})

app.listen(PORT, () => {
  console.log(`Server is Running at PORT Number ${PORT}`);
});
