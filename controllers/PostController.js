module.exports.postNews = (req, res) => {
  res.json({
    post: {
      title: "My post",
      description: "Random post",
    },
  });
};
