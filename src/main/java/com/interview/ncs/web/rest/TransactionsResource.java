package com.interview.ncs.web.rest;

import com.interview.ncs.domain.Transactions;
import com.interview.ncs.service.CustomerAccountService;
import com.interview.ncs.service.TransactionsService;
import com.interview.ncs.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.interview.ncs.domain.Transactions}.
 */
@RestController
@RequestMapping("/api")
public class TransactionsResource {

    private final Logger log = LoggerFactory.getLogger(TransactionsResource.class);

    private static final String ENTITY_NAME = "transactions";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TransactionsService transactionsService;
    
    
    private final CustomerAccountService customerAccountService;
    
    

    public TransactionsResource(TransactionsService transactionsService , CustomerAccountService customerAccountService) {
        this.transactionsService = transactionsService;
        this.customerAccountService = customerAccountService;
    }

    /**
     * {@code POST  /transactions} : Create a new transactions.
     *
     * @param transactions the transactions to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new transactions, or with status {@code 400 (Bad Request)} if the transactions has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/transactions")
    public ResponseEntity<Transactions> createTransactions(@RequestBody Transactions transactions) throws URISyntaxException {
        log.debug("REST request to save Transactions : {}", transactions);
        if (transactions.getId() != null) {
            throw new BadRequestAlertException("A new transactions cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Transactions result = transactionsService.save(transactions);
        // Update the balance of the transaction on Customer Account
        customerAccountService.updateBalances(transactions);
        
        return ResponseEntity.created(new URI("/api/transactions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /transactions} : Updates an existing transactions.
     *
     * @param transactions the transactions to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated transactions,
     * or with status {@code 400 (Bad Request)} if the transactions is not valid,
     * or with status {@code 500 (Internal Server Error)} if the transactions couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/transactions")
    public ResponseEntity<Transactions> updateTransactions(@RequestBody Transactions transactions) throws URISyntaxException {
        log.debug("REST request to update Transactions : {}", transactions);
        if (transactions.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Transactions result = transactionsService.save(transactions);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, transactions.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /transactions} : get all the transactions.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of transactions in body.
     */
    @GetMapping("/transactions")
    public ResponseEntity<List<Transactions>> getAllTransactions(Pageable pageable) {
        log.debug("REST request to get a page of Transactions");
        Page<Transactions> page = transactionsService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /transactions/:id} : get the "id" transactions.
     *
     * @param id the id of the transactions to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the transactions, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/transactions/{id}")
    public ResponseEntity<Transactions> getTransactions(@PathVariable Long id) {
        log.debug("REST request to get Transactions : {}", id);
        Optional<Transactions> transactions = transactionsService.findOne(id);
        return ResponseUtil.wrapOrNotFound(transactions);
    }

    /**
     * {@code DELETE  /transactions/:id} : delete the "id" transactions.
     *
     * @param id the id of the transactions to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/transactions/{id}")
    public ResponseEntity<Void> deleteTransactions(@PathVariable Long id) {
        log.debug("REST request to delete Transactions : {}", id);
        transactionsService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
