package hello;

import javax.swing.text.html.HTML;
import java.util.ArrayList;

public class Recipe {
    int id;
    String name;
    String description;
    ArrayList <Ingredients> ingredients;
    Tag tag;
    String image;
    Opinion Opinion;
    int likes;

    public Recipe(int id, String name, String description, ArrayList<Ingredients> ingredients) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.ingredients = ingredients;
    }
}
