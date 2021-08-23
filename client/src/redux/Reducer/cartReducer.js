const initialState = {
  items: [],
  totalQty: 0,
  totalPrice: 0,
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CartItems":
      const pizzas = action.payload;
      let counter = {};
      pizzas.map((pizza) => {
        // ternary operator
        return counter.hasOwnProperty(pizza.pizzaId)
          ? (counter[pizza.pizzaId].qty += 1)
          : (counter[pizza.pizzaId] = {
              pizza: pizza,
              qty: 1,
            });
      });
    //   pizza with quantity of each type.
      const cartPizza = Object.keys(counter).map((val) => { return counter[val]});
      // sorting in alphabatical order of pizza name.
     cartPizza.sort((a,b)=>{
        if(a.pizza.name<b.pizza.name){
          return -1
        }
        return 0;
      });
      return {
        item: [...cartPizza],
        totalQty: pizzas.length,
        totalPrice: pizzas.reduce((sum, value) => sum + value.price, 0),
      };
      case "AddError": return action.payload
    default:
      return state;
  }
};


export default cartReducer;
