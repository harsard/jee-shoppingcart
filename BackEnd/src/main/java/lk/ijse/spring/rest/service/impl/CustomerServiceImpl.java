package lk.ijse.spring.rest.service.impl;

import lk.ijse.spring.rest.dto.CustomerDTO;
import lk.ijse.spring.rest.entity.Customer;
import lk.ijse.spring.rest.repository.CustomerRepository;
import lk.ijse.spring.rest.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

/**
 * Date : 6/24/18
 *
 * @author ranjith-suranga (sura-boy)
 */
@Service
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
public class CustomerServiceImpl implements CustomerService {

    @Autowired
    private CustomerRepository repository;

    @Override
    public ArrayList<CustomerDTO> getAllCustomers() {
        List<Customer> customers = repository.findAll();

        ArrayList<CustomerDTO> alCustomers = new ArrayList<>();

        for (Customer customer : customers) {
            CustomerDTO customerDTO = new CustomerDTO(customer.getId(),
                    customer.getName(),
                    customer.getAddress());

            alCustomers.add(customerDTO);
        }

        return alCustomers;
    }

    @Override
    public CustomerDTO getCustomer(String customerId) {
        Customer customer = repository.findById(customerId).get();
        CustomerDTO customerDTO = new CustomerDTO(customer.getId(), customer.getName(), customer.getAddress());
        return customerDTO;
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED)
    public boolean deleteCustomer(String customerId) {
        repository.deleteById(customerId);
        return true;
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED)
    public boolean saveCustomer(CustomerDTO dto) {

        Customer customer = new Customer(dto.getId(), dto.getName(), dto.getAddress());
        repository.save(customer);

        return true;
    }

    @Override
    public long getTotalCustomers() {
        return repository.getTotalCustomers();
    }
}
