package lk.ijse.spring.rest.service;

/**
 * Date : 7/8/18
 *
 * @author ranjith-suranga (sura-boy)
 */
public interface UserService {

    boolean canAuthenticate(String username, String password);

}
