let mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
class Database{
    static async dbConnection(){
        const uri = 'mongodb+srv://kausic:Kausic@1224@cluster0.wg4bw.mongodb.net/Blog?retryWrites=true&w=majority';
        const connectionParameters ={
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        }
        mongoose.connect(uri, connectionParameters)
        .then(function(){
            console.log('Connected to mongodb successful');
        })
        .catch(function(err) {
            console.log('Error connecting to mongodb'+err);
        });
    }
}

module.exports = Database;