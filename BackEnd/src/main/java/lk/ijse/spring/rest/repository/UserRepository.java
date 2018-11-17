package lk.ijse.spring.rest.repository;

import lk.ijse.spring.rest.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Date : 7/8/18
 *
 * @author ranjith-suranga (sura-boy)
 */
public interface UserRepository extends JpaRepository<User,String> {
}
