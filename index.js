// global datastore
let store = { 
  neighborhoods:[],
  meals: [], 
  customers: [],
  deliveries: [] };
  
let neighborhoodID=0;
class Neighborhood{
  
  constructor(name){
    this.id =++neighborhoodID;
    this.name = name;
    
    store.neighborhoods.push(this)

  }
  
}