package com.interview.ncs.repository;

import com.interview.ncs.domain.Customer;

import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Customer entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {
	
	@Query(value = "SELECT EXTRACT(YEAR from c.dateOfBirth) as year,count(*) as count FROM Customer c GROUP BY  EXTRACT(YEAR from c.dateOfBirth) ")
	public List<Map<String, Object>> getCustomerByYear();
}
