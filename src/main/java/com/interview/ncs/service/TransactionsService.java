package com.interview.ncs.service;

import com.interview.ncs.domain.Transactions;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link Transactions}.
 */
public interface TransactionsService {

    /**
     * Save a transactions.
     *
     * @param transactions the entity to save.
     * @return the persisted entity.
     */
    Transactions save(Transactions transactions);

    /**
     * Get all the transactions.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Transactions> findAll(Pageable pageable);


    /**
     * Get the "id" transactions.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Transactions> findOne(Long id);

    /**
     * Delete the "id" transactions.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
