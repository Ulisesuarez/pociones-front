package hello;

import java.util.concurrent.atomic.AtomicLong;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class GreetingController {

    private static final String template = "Hello, %s!";
    private final AtomicLong counter = new AtomicLong();
    private static final  User usuario1 = new User ("Lazaro","1234", "tralala@gmail.com");

    @RequestMapping("/greeting")
    public Greeting greeting(@RequestParam(value="name", defaultValue="World") String name) {
        return new Greeting(counter.incrementAndGet(),
                            String.format(template, name));
    }

    @RequestMapping("/lazaro")
    public Greeting HolaLazaro(@RequestParam(value="enter Number", defaultValue="Lazaro") String numero) {
        return new Greeting(counter.incrementAndGet(),
                String.format(template, numero));
    }

    @RequestMapping("/usuario")
    public User user(@RequestParam(value="user") String name) {
        usuario1.setUserId("123");
        return usuario1;
    }
    @RequestMapping("/usuarioEscrito")
    public String userB() {
        return transformUserToString(usuario1);
    }

    private String transformUserToString(User usuario){
        return "hola soy "+usuario.getUserName()+" mi pass es "+usuario.getUserPass()+" y mi correo es "+usuario.getUserMail();
    }
}
