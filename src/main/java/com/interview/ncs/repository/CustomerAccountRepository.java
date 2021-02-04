package com.interview.ncs.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.interview.ncs.domain.Customer;
import com.interview.ncs.domain.CustomerAccount;

/**
 * Spring Data  repository for the CustomerAccount entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CustomerAccountRepository extends JpaRepository<CustomerAccount, Long> {

	Optional<CustomerAccount> findByaccountNumberAndCustomerID(Integer accountNumber, Customer customerID);
	
	Optional<List<CustomerAccount>> findByCustomerID(Customer customerID);
}
