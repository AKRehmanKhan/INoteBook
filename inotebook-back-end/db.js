const mongoses=require('mongoose');
const UrlMongo="mongodb://localhost:27017/inotebook";


const ConnectToMonge=()=>
{
    mongoses.connect(UrlMongo,()=>
    {
        console.log("connected to mongoose");
    })
}

module.exports=ConnectToMonge;