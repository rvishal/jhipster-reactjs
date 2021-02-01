package com.interview.ncs.web.rest;

import com.interview.ncs.NcsInterviewApp;
import com.interview.ncs.domain.CustomerAccount;
import com.interview.ncs.repository.CustomerAccountRepository;
import com.interview.ncs.service.CustomerAccountService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.interview.ncs.domain.enumeration.AccountType;
/**
 * Integration tests for the {@link CustomerAccountResource} REST controller.
 */
@SpringBootTest(classes = NcsInterviewApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class CustomerAccountResourceIT {

    private static final Integer DEFAULT_ACCOUNT_NUMBER = 1;
    private static final Integer UPDATED_ACCOUNT_NUMBER = 2;

    private static final AccountType DEFAULT_ACCOUNT_TYPE = AccountType.SAVING;
    private static final AccountType UPDATED_ACCOUNT_TYPE = AccountType.CURRENT;

    private static final Double DEFAULT_FULL_DAY_BALANCE = 1D;
    private static final Double UPDATED_FULL_DAY_BALANCE = 2D;

    private static final Double DEFAULT_HALF_DAY_BALANCE = 1D;
    private static final Double UPDATED_HALF_DAY_BALANCE = 2D;

    private static final Double DEFAULT_FINAL_BALANCE = 1D;
    private static final Double UPDATED_FINAL_BALANCE = 2D;

    @Autowired
    private CustomerAccountRepository customerAccountRepository;

    @Autowired
    private CustomerAccountService customerAccountService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restCustomerAccountMockMvc;

    private CustomerAccount customerAccount;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CustomerAccount createEntity(EntityManager em) {
        CustomerAccount customerAccount = new CustomerAccount()
            .accountNumber(DEFAULT_ACCOUNT_NUMBER)
            .accountType(DEFAULT_ACCOUNT_TYPE)
            .fullDayBalance(DEFAULT_FULL_DAY_BALANCE)
            .halfDayBalance(DEFAULT_HALF_DAY_BALANCE)
            .finalBalance(DEFAULT_FINAL_BALANCE);
        return customerAccount;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CustomerAccount createUpdatedEntity(EntityManager em) {
        CustomerAccount customerAccount = new CustomerAccount()
            .accountNumber(UPDATED_ACCOUNT_NUMBER)
            .accountType(UPDATED_ACCOUNT_TYPE)
            .fullDayBalance(UPDATED_FULL_DAY_BALANCE)
            .halfDayBalance(UPDATED_HALF_DAY_BALANCE)
            .finalBalance(UPDATED_FINAL_BALANCE);
        return customerAccount;
    }

    @BeforeEach
    public void initTest() {
        customerAccount = createEntity(em);
    }

    @Test
    @Transactional
    public void createCustomerAccount() throws Exception {
        int databaseSizeBeforeCreate = customerAccountRepository.findAll().size();
        // Create the CustomerAccount
        restCustomerAccountMockMvc.perform(post("/api/customer-accounts")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(customerAccount)))
            .andExpect(status().isCreated());

        // Validate the CustomerAccount in the database
        List<CustomerAccount> customerAccountList = customerAccountRepository.findAll();
        assertThat(customerAccountList).hasSize(databaseSizeBeforeCreate + 1);
        CustomerAccount testCustomerAccount = customerAccountList.get(customerAccountList.size() - 1);
        assertThat(testCustomerAccount.getAccountNumber()).isEqualTo(DEFAULT_ACCOUNT_NUMBER);
        assertThat(testCustomerAccount.getAccountType()).isEqualTo(DEFAULT_ACCOUNT_TYPE);
        assertThat(testCustomerAccount.getFullDayBalance()).isEqualTo(DEFAULT_FULL_DAY_BALANCE);
        assertThat(testCustomerAccount.getHalfDayBalance()).isEqualTo(DEFAULT_HALF_DAY_BALANCE);
        assertThat(testCustomerAccount.getFinalBalance()).isEqualTo(DEFAULT_FINAL_BALANCE);
    }

    @Test
    @Transactional
    public void createCustomerAccountWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = customerAccountRepository.findAll().size();

        // Create the CustomerAccount with an existing ID
        customerAccount.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCustomerAccountMockMvc.perform(post("/api/customer-accounts")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(customerAccount)))
            .andExpect(status().isBadRequest());

        // Validate the CustomerAccount in the database
        List<CustomerAccount> customerAccountList = customerAccountRepository.findAll();
        assertThat(customerAccountList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllCustomerAccounts() throws Exception {
        // Initialize the database
        customerAccountRepository.saveAndFlush(customerAccount);

        // Get all the customerAccountList
        restCustomerAccountMockMvc.perform(get("/api/customer-accounts?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(customerAccount.getId().intValue())))
            .andExpect(jsonPath("$.[*].accountNumber").value(hasItem(DEFAULT_ACCOUNT_NUMBER)))
            .andExpect(jsonPath("$.[*].accountType").value(hasItem(DEFAULT_ACCOUNT_TYPE.toString())))
            .andExpect(jsonPath("$.[*].fullDayBalance").value(hasItem(DEFAULT_FULL_DAY_BALANCE.doubleValue())))
            .andExpect(jsonPath("$.[*].halfDayBalance").value(hasItem(DEFAULT_HALF_DAY_BALANCE.doubleValue())))
            .andExpect(jsonPath("$.[*].finalBalance").value(hasItem(DEFAULT_FINAL_BALANCE.doubleValue())));
    }
    
    @Test
    @Transactional
    public void getCustomerAccount() throws Exception {
        // Initialize the database
        customerAccountRepository.saveAndFlush(customerAccount);

        // Get the customerAccount
        restCustomerAccountMockMvc.perform(get("/api/customer-accounts/{id}", customerAccount.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(customerAccount.getId().intValue()))
            .andExpect(jsonPath("$.accountNumber").value(DEFAULT_ACCOUNT_NUMBER))
            .andExpect(jsonPath("$.accountType").value(DEFAULT_ACCOUNT_TYPE.toString()))
            .andExpect(jsonPath("$.fullDayBalance").value(DEFAULT_FULL_DAY_BALANCE.doubleValue()))
            .andExpect(jsonPath("$.halfDayBalance").value(DEFAULT_HALF_DAY_BALANCE.doubleValue()))
            .andExpect(jsonPath("$.finalBalance").value(DEFAULT_FINAL_BALANCE.doubleValue()));
    }
    @Test
    @Transactional
    public void getNonExistingCustomerAccount() throws Exception {
        // Get the customerAccount
        restCustomerAccountMockMvc.perform(get("/api/customer-accounts/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCustomerAccount() throws Exception {
        // Initialize the database
        customerAccountService.save(customerAccount);

        int databaseSizeBeforeUpdate = customerAccountRepository.findAll().size();

        // Update the customerAccount
        CustomerAccount updatedCustomerAccount = customerAccountRepository.findById(customerAccount.getId()).get();
        // Disconnect from session so that the updates on updatedCustomerAccount are not directly saved in db
        em.detach(updatedCustomerAccount);
        updatedCustomerAccount
            .accountNumber(UPDATED_ACCOUNT_NUMBER)
            .accountType(UPDATED_ACCOUNT_TYPE)
            .fullDayBalance(UPDATED_FULL_DAY_BALANCE)
            .halfDayBalance(UPDATED_HALF_DAY_BALANCE)
            .finalBalance(UPDATED_FINAL_BALANCE);

        restCustomerAccountMockMvc.perform(put("/api/customer-accounts")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedCustomerAccount)))
            .andExpect(status().isOk());

        // Validate the CustomerAccount in the database
        List<CustomerAccount> customerAccountList = customerAccountRepository.findAll();
        assertThat(customerAccountList).hasSize(databaseSizeBeforeUpdate);
        CustomerAccount testCustomerAccount = customerAccountList.get(customerAccountList.size() - 1);
        assertThat(testCustomerAccount.getAccountNumber()).isEqualTo(UPDATED_ACCOUNT_NUMBER);
        assertThat(testCustomerAccount.getAccountType()).isEqualTo(UPDATED_ACCOUNT_TYPE);
        assertThat(testCustomerAccount.getFullDayBalance()).isEqualTo(UPDATED_FULL_DAY_BALANCE);
        assertThat(testCustomerAccount.getHalfDayBalance()).isEqualTo(UPDATED_HALF_DAY_BALANCE);
        assertThat(testCustomerAccount.getFinalBalance()).isEqualTo(UPDATED_FINAL_BALANCE);
    }

    @Test
    @Transactional
    public void updateNonExistingCustomerAccount() throws Exception {
        int databaseSizeBeforeUpdate = customerAccountRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCustomerAccountMockMvc.perform(put("/api/customer-accounts")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(customerAccount)))
            .andExpect(status().isBadRequest());

        // Validate the CustomerAccount in the database
        List<CustomerAccount> customerAccountList = customerAccountRepository.findAll();
        assertThat(customerAccountList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCustomerAccount() throws Exception {
        // Initialize the database
        customerAccountService.save(customerAccount);

        int databaseSizeBeforeDelete = customerAccountRepository.findAll().size();

        // Delete the customerAccount
        restCustomerAccountMockMvc.perform(delete("/api/customer-accounts/{id}", customerAccount.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<CustomerAccount> customerAccountList = customerAccountRepository.findAll();
        assertThat(customerAccountList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
