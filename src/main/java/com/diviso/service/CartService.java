package com.diviso.service;

import com.diviso.domain.Cart;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing Cart.
 */
public interface CartService {

    /**
     * Save a cart.
     *
     * @param cart the entity to save
     * @return the persisted entity
     */
    Cart save(Cart cart);

    /**
     *  Get all the carts.
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    Page<Cart> findAll(Pageable pageable);

    /**
     *  Get the "id" cart.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    Cart findOne(Long id);

    /**
     *  Delete the "id" cart.
     *
     *  @param id the id of the entity
     */
    void delete(Long id);
    public List<Cart>findByCustomerId(Long id);
}
