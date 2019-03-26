package hello;

public class Quantity {
    int id;
    Recipe recipe;
    Ingredients ingredient;
    int quantity;

    public Quantity(int id, Recipe recipe, Ingredients ingredient, int quantity) {
        this.id = id;
        this.recipe = recipe;
        this.ingredient = ingredient;
        this.quantity = quantity;
    }
}
