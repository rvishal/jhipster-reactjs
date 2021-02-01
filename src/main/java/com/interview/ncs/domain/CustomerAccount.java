package com.interview.ncs.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.annotations.ApiModelProperty;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import com.interview.ncs.domain.enumeration.AccountType;

/**
 * A CustomerAccount.
 */
@Entity
@Table(name = "customer_account")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class CustomerAccount implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "account_number")
    private Integer accountNumber;

    @Enumerated(EnumType.STRING)
    @Column(name = "account_type")
    private AccountType accountType;

    @Column(name = "full_day_balance")
    private Double fullDayBalance;

    @Column(name = "half_day_balance")
    private Double halfDayBalance;

    @Column(name = "final_balance")
    private Double finalBalance;

    /**
     * A relationship
     */
    @ApiModelProperty(value = "A relationship")
    @OneToMany(mappedBy = "accountNumber")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Transactions> transactions = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = "customerAccounts", allowSetters = true)
    private Customer customerID;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getAccountNumber() {
        return accountNumber;
    }

    public CustomerAccount accountNumber(Integer accountNumber) {
        this.accountNumber = accountNumber;
        return this;
    }

    public void setAccountNumber(Integer accountNumber) {
        this.accountNumber = accountNumber;
    }

    public AccountType getAccountType() {
        return accountType;
    }

    public CustomerAccount accountType(AccountType accountType) {
        this.accountType = accountType;
        return this;
    }

    public void setAccountType(AccountType accountType) {
        this.accountType = accountType;
    }

    public Double getFullDayBalance() {
        return fullDayBalance;
    }

    public CustomerAccount fullDayBalance(Double fullDayBalance) {
        this.fullDayBalance = fullDayBalance;
        return this;
    }

    public void setFullDayBalance(Double fullDayBalance) {
        this.fullDayBalance = fullDayBalance;
    }

    public Double getHalfDayBalance() {
        return halfDayBalance;
    }

    public CustomerAccount halfDayBalance(Double halfDayBalance) {
        this.halfDayBalance = halfDayBalance;
        return this;
    }

    public void setHalfDayBalance(Double halfDayBalance) {
        this.halfDayBalance = halfDayBalance;
    }

    public Double getFinalBalance() {
        return finalBalance;
    }

    public CustomerAccount finalBalance(Double finalBalance) {
        this.finalBalance = finalBalance;
        return this;
    }

    public void setFinalBalance(Double finalBalance) {
        this.finalBalance = finalBalance;
    }

    public Set<Transactions> getTransactions() {
        return transactions;
    }

    public CustomerAccount transactions(Set<Transactions> transactions) {
        this.transactions = transactions;
        return this;
    }

    public CustomerAccount addTransactions(Transactions transactions) {
        this.transactions.add(transactions);
        transactions.setAccountNumber(this);
        return this;
    }

    public CustomerAccount removeTransactions(Transactions transactions) {
        this.transactions.remove(transactions);
        transactions.setAccountNumber(null);
        return this;
    }

    public void setTransactions(Set<Transactions> transactions) {
        this.transactions = transactions;
    }

    public Customer getCustomerID() {
        return customerID;
    }

    public CustomerAccount customerID(Customer customer) {
        this.customerID = customer;
        return this;
    }

    public void setCustomerID(Customer customer) {
        this.customerID = customer;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof CustomerAccount)) {
            return false;
        }
        return id != null && id.equals(((CustomerAccount) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "CustomerAccount{" +
            "id=" + getId() +
            ", accountNumber=" + getAccountNumber() +
            ", accountType='" + getAccountType() + "'" +
            ", fullDayBalance=" + getFullDayBalance() +
            ", halfDayBalance=" + getHalfDayBalance() +
            ", finalBalance=" + getFinalBalance() +
            "}";
    }
}
