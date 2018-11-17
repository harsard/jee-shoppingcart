package lk.ijse.spring.rest.service;

import lk.ijse.spring.rest.dto.CustomerDTO;

import java.util.ArrayList;

/**
 * Date : 6/24/18
 *
 * @author ranjith-suranga (sura-boy)
 */
public interface CustomerService {

    public ArrayList<CustomerDTO> getAllCustomers();

    public CustomerDTO getCustomer(String customerId);

    public boolean deleteCustomer(String customerId);

    public boolean saveCustomer(CustomerDTO customer);

    public long getTotalCustomers();

}
