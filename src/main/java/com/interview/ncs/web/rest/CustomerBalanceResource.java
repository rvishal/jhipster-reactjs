package com.interview.ncs.web.rest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class CustomerBalanceResource {

	
	 private final Logger log = LoggerFactory.getLogger(CustomerBalanceResource.class);
	 
	 @Value("${jhipster.clientApp.name}")
	    private String applicationName;
	 
	 
}
