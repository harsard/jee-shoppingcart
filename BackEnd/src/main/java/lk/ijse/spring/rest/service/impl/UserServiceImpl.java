package lk.ijse.spring.rest.service.impl;

import lk.ijse.spring.rest.entity.User;
import lk.ijse.spring.rest.repository.UserRepository;
import lk.ijse.spring.rest.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 * Date : 7/8/18
 *
 * @author ranjith-suranga (sura-boy)
 */
@Service
@Transactional(propagation = Propagation.SUPPORTS, readOnly =  true)
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public boolean canAuthenticate(String username, String password) {

        boolean exists = userRepository.existsById(username);

        if (!exists){
            return false;
        }

        User user = userRepository.findById(username).get();

        return user.getPassword().equals(password);

    }
}
