const app = require('./utils/createApp');

async function main(){
  try {
    app.set('port',process.env.PORT || 5000);
    app.listen(app.get('port'), () => {
      console.log("Server Started on port", app.get('port'));
    })
  } catch (error) {
    console.log(error);
  }
}

main();

module.exports = app;