package lk.ijse.spring.rest.entity;

import javax.persistence.Entity;
import javax.persistence.Id;

/**
 * Date : 6/24/18
 *
 * @author ranjith-suranga (sura-boy)
 */
@Entity
public class Customer {

    @Id
    private String id;
    private String name;
    private String address;

    public Customer() {
    }

    public Customer(String id, String name, String address) {
        this.setId(id);
        this.setName(name);
        this.setAddress(address);
    }


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    @Override
    public String toString() {
        return "Customer{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", address='" + address + '\'' +
                '}';
    }
}
