import {API} from './api.js';
 
const query = new API('Insurance Rick');
query.traerPersonaje()
.then((data)=>{
    console.log(data.results[0]);
})
.catch((e)=>{
    console.error(new Error(e));
});


