package com.interview.ncs.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.annotations.ApiModelProperty;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;

import com.interview.ncs.domain.enumeration.DebitCredit;

import com.interview.ncs.domain.enumeration.TransactionType;

/**
 * A Transactions.
 */
@Entity
@Table(name = "transactions")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Transactions implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "transaction_id")
    private Double transactionID;

    @Enumerated(EnumType.STRING)
    @Column(name = "debit_credit")
    private DebitCredit debitCredit;

    @Column(name = "transaction_amount")
    private Double transactionAmount;

    @Enumerated(EnumType.STRING)
    @Column(name = "transaction_type")
    private TransactionType transactionType;

    @Column(name = "value_date")
    private LocalDate valueDate;

    @Column(name = "remarks")
    private String remarks;

    /**
     * Another side of the same relationship
     */
    @ApiModelProperty(value = "Another side of the same relationship")
    @ManyToOne
  //  @JsonIgnoreProperties(value = "transactions", allowSetters = true)
    private CustomerAccount accountNumber;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getTransactionID() {
        return transactionID;
    }

    public Transactions transactionID(Double transactionID) {
        this.transactionID = transactionID;
        return this;
    }

    public void setTransactionID(Double transactionID) {
        this.transactionID = transactionID;
    }

    public DebitCredit getDebitCredit() {
        return debitCredit;
    }

    public Transactions debitCredit(DebitCredit debitCredit) {
        this.debitCredit = debitCredit;
        return this;
    }

    public void setDebitCredit(DebitCredit debitCredit) {
        this.debitCredit = debitCredit;
    }

    public Double getTransactionAmount() {
        return transactionAmount;
    }

    public Transactions transactionAmount(Double transactionAmount) {
        this.transactionAmount = transactionAmount;
        return this;
    }

    public void setTransactionAmount(Double transactionAmount) {
        this.transactionAmount = transactionAmount;
    }

    public TransactionType getTransactionType() {
        return transactionType;
    }

    public Transactions transactionType(TransactionType transactionType) {
        this.transactionType = transactionType;
        return this;
    }

    public void setTransactionType(TransactionType transactionType) {
        this.transactionType = transactionType;
    }

    public LocalDate getValueDate() {
        return valueDate;
    }

    public Transactions valueDate(LocalDate valueDate) {
        this.valueDate = valueDate;
        return this;
    }

    public void setValueDate(LocalDate valueDate) {
        this.valueDate = valueDate;
    }

    public String getRemarks() {
        return remarks;
    }

    public Transactions remarks(String remarks) {
        this.remarks = remarks;
        return this;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }

    public CustomerAccount getAccountNumber() {
        return accountNumber;
    }

    public Transactions accountNumber(CustomerAccount customerAccount) {
        this.accountNumber = customerAccount;
        return this;
    }

    public void setAccountNumber(CustomerAccount customerAccount) {
        this.accountNumber = customerAccount;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Transactions)) {
            return false;
        }
        return id != null && id.equals(((Transactions) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Transactions{" +
            "id=" + getId() +
            ", transactionID=" + getTransactionID() +
            ", debitCredit='" + getDebitCredit() + "'" +
            ", transactionAmount=" + getTransactionAmount() +
            ", transactionType='" + getTransactionType() + "'" +
            ", valueDate='" + getValueDate() + "'" +
            ", customerAccount='" + getAccountNumber() + "'" +
            "}";
    }
}
