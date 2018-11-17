package lk.ijse.spring.rest.controller;

import lk.ijse.spring.rest.dto.UserDTO;
import lk.ijse.spring.rest.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

/**
 * Date : 7/8/18
 *
 * @author ranjith-suranga (sura-boy)
 */
@RestController
@CrossOrigin
public class UserController {

    @Autowired
    UserService userService;

    @PostMapping(value="api/v1/login", consumes = MediaType.APPLICATION_JSON_VALUE,
    produces = MediaType.APPLICATION_JSON_VALUE)
    public boolean canAuthenticate(@RequestBody UserDTO user){
        return userService.canAuthenticate(user.getUsername(), user.getPassword());
    }

}
