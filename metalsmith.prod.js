require('./metalsmith.common').build(function (err) {
  if (err) {
    console.log(err);
  }
  else {
    console.log('Blog built!');
  }
});