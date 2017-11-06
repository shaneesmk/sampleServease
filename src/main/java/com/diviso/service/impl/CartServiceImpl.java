package com.diviso.service.impl;

import com.diviso.service.CartService;
import com.diviso.domain.Cart;
import com.diviso.repository.CartRepository;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing Cart.
 */
@Service
@Transactional
public class CartServiceImpl implements CartService{

    private final Logger log = LoggerFactory.getLogger(CartServiceImpl.class);

    private final CartRepository cartRepository;

    public CartServiceImpl(CartRepository cartRepository) {
        this.cartRepository = cartRepository;
    }

    /**
     * Save a cart.
     *
     * @param cart the entity to save
     * @return the persisted entity
     */
    @Override
    public Cart save(Cart cart) {
        log.debug("Request to save Cart : {}", cart);
        return cartRepository.save(cart);
    }

    /**
     *  Get all the carts.
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<Cart> findAll(Pageable pageable) {
        log.debug("Request to get all Carts");
        return cartRepository.findAll(pageable);
    }

    /**
     *  Get one cart by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Cart findOne(Long id) {
        log.debug("Request to get Cart : {}", id);
        return cartRepository.findOne(id);
    }

    /**
     *  Delete the  cart by id.
     *
     *  @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Cart : {}", id);
        cartRepository.delete(id);
    }

	@Override
	public List<Cart> findByCustomerId(Long id) {
		
		return cartRepository.findByCustomerId(id);
	}
}
