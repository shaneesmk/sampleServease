package com.diviso.repository;

import com.diviso.domain.Cart;
import org.springframework.stereotype.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Cart entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {
	
	public List<Cart>findByCustomerId(Long id);

}
