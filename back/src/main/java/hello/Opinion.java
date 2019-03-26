package hello;

public class Opinion {
    int id;
    String opinion;
    User user;

    public Opinion(int id, String opinion, User user) {
        this.id = id;
        this.opinion = opinion;
        this.user = user;
    }
}
