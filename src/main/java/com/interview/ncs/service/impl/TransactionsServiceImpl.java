package com.interview.ncs.service.impl;

import com.interview.ncs.service.TransactionsService;
import com.interview.ncs.domain.Transactions;
import com.interview.ncs.repository.TransactionsRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link Transactions}.
 */
@Service
@Transactional
public class TransactionsServiceImpl implements TransactionsService {

    private final Logger log = LoggerFactory.getLogger(TransactionsServiceImpl.class);

    private final TransactionsRepository transactionsRepository;

    public TransactionsServiceImpl(TransactionsRepository transactionsRepository) {
        this.transactionsRepository = transactionsRepository;
    }

    @Override
    public Transactions save(Transactions transactions) {
        log.debug("Request to save Transactions : {}", transactions);
        return transactionsRepository.save(transactions);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Transactions> findAll(Pageable pageable) {
        log.debug("Request to get all Transactions");
        return transactionsRepository.findAll(pageable);
    }


    @Override
    @Transactional(readOnly = true)
    public Optional<Transactions> findOne(Long id) {
        log.debug("Request to get Transactions : {}", id);
        return transactionsRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Transactions : {}", id);
        transactionsRepository.deleteById(id);
    }
}
