package hello;


import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.concurrent.atomic.AtomicLong;


@RestController
public class ControllerUser {
    private  User template = new User("valen","1234","aloha@gmail.com") ;
    private final AtomicLong counter = new AtomicLong();

    @RequestMapping("/login")
    public User user(@RequestParam(value="name", defaultValue="World") String name){
        template.setUserId("0001");
        return new User(String.format(name, template));
    }

}

