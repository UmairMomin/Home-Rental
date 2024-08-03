let express = require('express');
let port = 3000;
let app = express();
const path = require('path');
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static(__dirname + "/public"));


app.listen(port, (err) => {
    if (err)
        throw err
    else
        console.log(`server started on ${port}`);
});