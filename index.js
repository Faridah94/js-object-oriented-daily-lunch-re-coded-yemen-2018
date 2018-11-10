let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodID = 0;
class Neighborhood{
  constructor (name){
    this.id = ++neighborhoodID;
    this.name = name;
    store.neighborhoods.push(this);
  }

  deliveries(){
      return store.deliveries.filter(delivery => {
        return delivery.neighborhoodId === this.id;
          }
      );
  }
  customers(){
      return store.customers.filter(customer => {
              return customer.neighborhoodId === this.id;
          }
      )
  }

  meals(){
    let mealsList = this.deliveries().map(function(delivery) {
      return delivery.meal();
    });
    return mealsList.map(meal => meal).filter((value, index, self) => self.indexOf(value) === index);
  }
}

let customerID = 0;

class Customer{
  constructor(name, nh){
    this.id = ++customerID;
    this.name = name;
    this.neighborhoodId = nh;

    store.customers.push(this);

  }
  deliveries(){
      return store.deliveries.filter(delivery =>{
              return delivery.customerId === this.id;
          }
      );
  }
  meals(){
      return this.deliveries().map(meal => {
        return meal.meal();

          }
      );
  }
  accumulator(total, meal){
    console.log(meal);
    console.log(meal.price);
      return total + meal.price;

  }
  totalSpent(){
    let sum = this.meals().reduce((total,meal) => {
          return total + meal.price;
      }, 0);
      return sum;
  }


}

let mealID = 0;

class Meal{
  constructor(title, price){
    this.id = ++mealID;
    this.title = title;
    this.price = price;

    store.meals.push(this);
  }
  deliveries(){
      return store.deliveries.filter(delivery => {
              return delivery.mealId === this.id;
          }
      );
  }
  customers(){
     return this.deliveries().map(customer => {
              return customer.customer();
          }
      );
  }
  static byPrice(){
      return store.meals.sort(function (a,b) {
        return b.price - a.price;
      });
  }



}

let deliveryID = 0;

class Delivery{
  constructor(meal, neighborhood, customer){
    this.id = ++deliveryID;
    this.mealId = meal;
    this.neighborhoodId = neighborhood;
    this.customerId = customer;

    store.deliveries.push(this);
  }
  meal(){
      return store.meals.find(meal => {
              return meal.id === this.mealId;
          }
      );
  }
  customer(){
      return store.customers.find(customer => {
              return customer.id === this.customerId;
          }
      );
  }
  neighborhood(){
      return store.neighborhoods.find(neighborhood => {
              return neighborhood.id === this.neighborhoodId;
          }
      )
  }
}