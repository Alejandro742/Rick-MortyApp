import fetchData from 'node-fetch';
export class API {
    //constructor para declarar cómo buscar el objeto (personaje)
    constructor(personaje){
        this.personaje = personaje;
    }
    getPersonaje(){
        return this.personaje;
    }
    async traerPersonaje(){
        const res = await fetchData(`https://rickandmortyapi.com/api/character/?name=${this.personaje}`);
        const data = await res.json();
        return data;
    }
}