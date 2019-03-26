package hello;


import java.sql.Date;


public class User {


    private Long userId;


    private String userName;


    private String userPass;

    private String userMail;


    private Date creationDate;


    private Date unsubDate;


    private String userAvatar;


    private Roles userRole;


    public User(String userName, String userPass, String userMail) {
        this.userName = userName;
        this.userPass = userPass;
        this.userMail = userMail;
        this.userRole = Roles.NORMAL;
    }

    public User(String name) {
        this.userName = name;
    }

    public String getUserName() {
        return userName;
    }

    public String getUserPass() {
        return userPass;
    }

    public String getUserMail() {
        return userMail;
    }

    public String getUserAvatar() {
        return userAvatar;
    }

    public Roles getUserRole() {
        return userRole;
    }

    public String getUserId() {
        return userId.toString();
    }

    public void setUserId(String userId) {
        this.userId = Long.parseLong( userId);
    }

    public void setUserAvatar(String avatar) {
        this.userAvatar = avatar;
    }
}
