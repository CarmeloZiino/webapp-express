export default function handleImagePath(req, res, next) {
    req.imagePath = `${req.protocol}://${req.get('host')}/img/movie/movies_cover/`;
    next();
  }
  
