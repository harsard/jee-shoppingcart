package lk.ijse.spring.rest.repository;

import lk.ijse.spring.rest.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

/**
 * Date : 6/24/18
 *
 * @author ranjith-suranga (sura-boy)
 */
public interface CustomerRepository extends JpaRepository<Customer, String> {

    @Query("SELECT count(c.id) FROM Customer c")
    long getTotalCustomers();

}
