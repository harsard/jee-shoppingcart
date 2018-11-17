package lk.ijse.spring.rest.main;

import lk.ijse.spring.rest.repository.CustomerRepository;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.web.servlet.config.annotation.DefaultServletHandlerConfigurer;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Date : 6/24/18
 *
 * @author ranjith-suranga (sura-boy)
 */
@Configuration
@ComponentScan("lk.ijse.spring.rest")
@EnableWebMvc
@EnableJpaRepositories(basePackageClasses = CustomerRepository.class)
@EnableTransactionManagement
public class WebAppConfig implements WebMvcConfigurer {

    @Override
    public void configureDefaultServletHandling(DefaultServletHandlerConfigurer configurer) {
        configurer.enable();
    }
}
