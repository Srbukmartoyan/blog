exports.uploadFile = (req, res) => {
  res.json({
      success: 1,
      image_url: `http://localhost:${process.env.PORT}/images/${req.file.filename}`
  });
};