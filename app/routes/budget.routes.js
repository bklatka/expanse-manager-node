module.exports = (app, db) => {
  app.post('/add', (req, res) => {
    console.log(req.body);
    res.send('Hello world');
  });
};
