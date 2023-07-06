module.exports.send = (req,res)=>{
  console.log('Este es el nuevo body enviando archivo', req.body);
  res.status(200).json({...req.body})
}