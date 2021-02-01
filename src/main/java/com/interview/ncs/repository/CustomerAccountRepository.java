package com.interview.ncs.repository;

import com.interview.ncs.domain.CustomerAccount;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the CustomerAccount entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CustomerAccountRepository extends JpaRepository<CustomerAccount, Long> {

	CustomerAccount findByaccountNumber(Integer accountNumber);
}
