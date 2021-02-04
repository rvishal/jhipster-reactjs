package com.interview.ncs.service;

import com.interview.ncs.domain.Customer;
import com.interview.ncs.domain.CustomerAccount;
import com.interview.ncs.domain.Transactions;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link CustomerAccount}.
 */
public interface CustomerAccountService {

    /**
     * Save a customerAccount.
     *
     * @param customerAccount the entity to save.
     * @return the persisted entity.
     */
    CustomerAccount save(CustomerAccount customerAccount);

    /**
     * Get all the customerAccounts.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<CustomerAccount> findAll(Pageable pageable);


    /**
     * Get the "id" customerAccount.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<CustomerAccount> findOne(Long id);

    /**
     * Delete the "id" customerAccount.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
    

    CustomerAccount updateBalances(Transactions transactions);
    
    
    Optional<CustomerAccount> findByaccountNumberAndCustomerId(Integer accountNumber , Integer CustomerId);
    
    Optional<List<CustomerAccount>>  findByCustomerID(Integer customerID);
    
    
}
