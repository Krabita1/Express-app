module.exports = mongoose => {
    const Mountain = mongoose.model(
      "mountain",
      mongoose.Schema(
        {
          name: String,
          height: String,
        }
      )
    );
  
    return Mountain;
  };