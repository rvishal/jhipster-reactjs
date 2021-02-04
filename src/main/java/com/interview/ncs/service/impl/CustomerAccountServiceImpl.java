package com.interview.ncs.service.impl;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.interview.ncs.domain.Customer;
import com.interview.ncs.domain.CustomerAccount;
import com.interview.ncs.domain.Transactions;
import com.interview.ncs.domain.enumeration.DebitCredit;
import com.interview.ncs.domain.enumeration.TransactionType;
import com.interview.ncs.repository.CustomerAccountRepository;
import com.interview.ncs.repository.CustomerRepository;
import com.interview.ncs.service.CustomerAccountService;

/**
 * Service Implementation for managing {@link CustomerAccount}.
 */
@Service
@Transactional
public class CustomerAccountServiceImpl implements CustomerAccountService {

    private final Logger log = LoggerFactory.getLogger(CustomerAccountServiceImpl.class);

    private final CustomerAccountRepository customerAccountRepository;
    
    private final CustomerRepository customerRepository;

    public CustomerAccountServiceImpl(CustomerAccountRepository customerAccountRepository,CustomerRepository customerRepository) {
        this.customerAccountRepository = customerAccountRepository;
        this.customerRepository = customerRepository;
    }

    @Override
    public CustomerAccount save(CustomerAccount customerAccount) {
        log.debug("Request to save CustomerAccount : {}", customerAccount);
        return customerAccountRepository.save(customerAccount);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<CustomerAccount> findAll(Pageable pageable) {
        log.debug("Request to get all CustomerAccounts");
        return customerAccountRepository.findAll(pageable);
    }


    @Override
    @Transactional(readOnly = true)
    public Optional<CustomerAccount> findOne(Long id) {
        log.debug("Request to get CustomerAccount : {}", id);
        return customerAccountRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete CustomerAccount : {}", id);
        customerAccountRepository.deleteById(id);
    }

	@Override
	public CustomerAccount updateBalances(Transactions transactions) {
		 log.debug("Request to update CustomerAccount for Transaction : {}", transactions);
		CustomerAccount ca = customerAccountRepository.findById(transactions.getAccountNumber().getId()).orElse(null);
		
		LocalDate today = LocalDate.now();
		if(transactions.getTransactionType().equals(TransactionType.CHECK)){
			if(transactions.getValueDate().isAfter(today)) {
				Double holdBalance = ca.getFullDayBalance()!=0.0?ca.getFullDayBalance():ca.getFinalBalance();
				
				if(transactions.getDebitCredit().equals(DebitCredit.DEBIT)) {
					holdBalance -=transactions.getTransactionAmount();
				}else {
					holdBalance +=transactions.getTransactionAmount();
				}
				ca.setFullDayBalance(holdBalance);
				
			}else if (transactions.getValueDate().isEqual(today)) {
				Double holdBalance = ca.getHalfDayBalance()!=0.0?ca.getHalfDayBalance():ca.getFinalBalance();
				
				if(transactions.getDebitCredit().equals(DebitCredit.DEBIT)) {
					holdBalance -=transactions.getTransactionAmount();
				}else {
					holdBalance +=transactions.getTransactionAmount();
				}
				ca.setHalfDayBalance(holdBalance);
			}else {
				Double finalBalance = ca.getFinalBalance();
				
				if(transactions.getDebitCredit().equals(DebitCredit.DEBIT)) {
					finalBalance -=transactions.getTransactionAmount();
				}else {
					finalBalance +=transactions.getTransactionAmount();
				}
				ca.setFinalBalance(finalBalance);
			}
			
		}else {
			Double finalBalance = ca.getFinalBalance();
			
			if(transactions.getDebitCredit().equals(DebitCredit.DEBIT)) {
				finalBalance -=transactions.getTransactionAmount();
			}else {
				finalBalance +=transactions.getTransactionAmount();
			}
			ca.setFinalBalance(finalBalance);
		}
		
		
		
		return customerAccountRepository.save(ca);
	}

	@Override
	public Optional<CustomerAccount>  findByaccountNumberAndCustomerId(Integer accountNumber, Integer customerID) {
		Customer customer = customerRepository.getOne(Long.valueOf(customerID));
		return customerAccountRepository.findByaccountNumberAndCustomerID(accountNumber, customer);
	}

	@Override
	public Optional<List<CustomerAccount>>  findByCustomerID(Integer customerID) {
		Customer customer = customerRepository.getOne(Long.valueOf(customerID));
		return customerAccountRepository.findByCustomerID(customer);
	}
}
