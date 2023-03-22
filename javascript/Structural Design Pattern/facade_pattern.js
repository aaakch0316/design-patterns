class Kichen {
  cookBurger() {
    console.log("Cooking Burger");
  }

  cookSide() {
    console.log("Cooking side dishes");
  }
}

class FoodService {
  ServiceWorker() {
    console.log("Order is ready. Serve the dish");
  }
}

class RestaurantFacade {
  newOrder() {
    const kitchen = new Kitchen();
    kitchen.cookBurger();
    kitchen.cookSide();
    const foodService = new FoodService();
    return foodService.ServiceWorker();
  }
}

const facade = new RestaurantFacade();
facade.newOrder();
