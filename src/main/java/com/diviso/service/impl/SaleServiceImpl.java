package com.diviso.service.impl;

import com.diviso.service.SaleService;
import com.diviso.domain.Cart;
import com.diviso.domain.Sale;
import com.diviso.repository.SaleRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * Service Implementation for managing Sale.
 */
@Service
@Transactional
public class SaleServiceImpl implements SaleService {

	private final Logger log = LoggerFactory.getLogger(SaleServiceImpl.class);

	private final SaleRepository saleRepository;

	public SaleServiceImpl(SaleRepository saleRepository) {
		this.saleRepository = saleRepository;
	}

	/**
	 * Save a sale.
	 *
	 * @param sale
	 *            the entity to save
	 * @return the persisted entity
	 */
	@Override
	public Sale save(Sale sale) {
		log.debug("Request to save Sale : {}", sale);
		return saleRepository.save(sale);
	}

	/**
	 * Get all the sales.
	 *
	 * @param pageable
	 *            the pagination information
	 * @return the list of entities
	 */
	@Override
	@Transactional(readOnly = true)
	public Page<Sale> findAll(Pageable pageable) {
		log.debug("Request to get all Sales");
		return saleRepository.findAll(pageable);
	}

	/**
	 * Get one sale by id.
	 *
	 * @param id
	 *            the id of the entity
	 * @return the entity
	 */
	@Override
	@Transactional(readOnly = true)
	public Sale findOne(Long id) {
		log.debug("Request to get Sale : {}", id);
		return saleRepository.findOne(id);
	}

	/**
	 * Delete the sale by id.
	 *
	 * @param id
	 *            the id of the entity
	 */
	@Override
	public void delete(Long id) {
		log.debug("Request to delete Sale : {}", id);
		saleRepository.delete(id);
	}

	
}
