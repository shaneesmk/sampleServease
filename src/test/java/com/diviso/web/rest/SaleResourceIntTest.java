package com.diviso.web.rest;

import com.diviso.ServeaseApp;

import com.diviso.domain.Sale;
import com.diviso.repository.SaleRepository;
import com.diviso.service.SaleService;
import com.diviso.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static com.diviso.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the SaleResource REST controller.
 *
 * @see SaleResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ServeaseApp.class)
public class SaleResourceIntTest {

    private static final String DEFAULT_CUSTOMER_NAME = "AAAAAAAAAA";
    private static final String UPDATED_CUSTOMER_NAME = "BBBBBBBBBB";

    private static final Double DEFAULT_TOTAL_CASH = 1D;
    private static final Double UPDATED_TOTAL_CASH = 2D;

    private static final String DEFAULT_PAYMENT_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_PAYMENT_TYPE = "BBBBBBBBBB";

    @Autowired
    private SaleRepository saleRepository;

    @Autowired
    private SaleService saleService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restSaleMockMvc;

    private Sale sale;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SaleResource saleResource = new SaleResource(saleService);
        this.restSaleMockMvc = MockMvcBuilders.standaloneSetup(saleResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Sale createEntity(EntityManager em) {
        Sale sale = new Sale()
            .customerName(DEFAULT_CUSTOMER_NAME)
            .totalCash(DEFAULT_TOTAL_CASH)
            .paymentType(DEFAULT_PAYMENT_TYPE);
        return sale;
    }

    @Before
    public void initTest() {
        sale = createEntity(em);
    }

    @Test
    @Transactional
    public void createSale() throws Exception {
        int databaseSizeBeforeCreate = saleRepository.findAll().size();

        // Create the Sale
        restSaleMockMvc.perform(post("/api/sales")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sale)))
            .andExpect(status().isCreated());

        // Validate the Sale in the database
        List<Sale> saleList = saleRepository.findAll();
        assertThat(saleList).hasSize(databaseSizeBeforeCreate + 1);
        Sale testSale = saleList.get(saleList.size() - 1);
        assertThat(testSale.getCustomerName()).isEqualTo(DEFAULT_CUSTOMER_NAME);
        assertThat(testSale.getTotalCash()).isEqualTo(DEFAULT_TOTAL_CASH);
        assertThat(testSale.getPaymentType()).isEqualTo(DEFAULT_PAYMENT_TYPE);
    }

    @Test
    @Transactional
    public void createSaleWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = saleRepository.findAll().size();

        // Create the Sale with an existing ID
        sale.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSaleMockMvc.perform(post("/api/sales")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sale)))
            .andExpect(status().isBadRequest());

        // Validate the Sale in the database
        List<Sale> saleList = saleRepository.findAll();
        assertThat(saleList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllSales() throws Exception {
        // Initialize the database
        saleRepository.saveAndFlush(sale);

        // Get all the saleList
        restSaleMockMvc.perform(get("/api/sales?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(sale.getId().intValue())))
            .andExpect(jsonPath("$.[*].customerName").value(hasItem(DEFAULT_CUSTOMER_NAME.toString())))
            .andExpect(jsonPath("$.[*].totalCash").value(hasItem(DEFAULT_TOTAL_CASH.doubleValue())))
            .andExpect(jsonPath("$.[*].paymentType").value(hasItem(DEFAULT_PAYMENT_TYPE.toString())));
    }

    @Test
    @Transactional
    public void getSale() throws Exception {
        // Initialize the database
        saleRepository.saveAndFlush(sale);

        // Get the sale
        restSaleMockMvc.perform(get("/api/sales/{id}", sale.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(sale.getId().intValue()))
            .andExpect(jsonPath("$.customerName").value(DEFAULT_CUSTOMER_NAME.toString()))
            .andExpect(jsonPath("$.totalCash").value(DEFAULT_TOTAL_CASH.doubleValue()))
            .andExpect(jsonPath("$.paymentType").value(DEFAULT_PAYMENT_TYPE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingSale() throws Exception {
        // Get the sale
        restSaleMockMvc.perform(get("/api/sales/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSale() throws Exception {
        // Initialize the database
        saleService.save(sale);

        int databaseSizeBeforeUpdate = saleRepository.findAll().size();

        // Update the sale
        Sale updatedSale = saleRepository.findOne(sale.getId());
        updatedSale
            .customerName(UPDATED_CUSTOMER_NAME)
            .totalCash(UPDATED_TOTAL_CASH)
            .paymentType(UPDATED_PAYMENT_TYPE);

        restSaleMockMvc.perform(put("/api/sales")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedSale)))
            .andExpect(status().isOk());

        // Validate the Sale in the database
        List<Sale> saleList = saleRepository.findAll();
        assertThat(saleList).hasSize(databaseSizeBeforeUpdate);
        Sale testSale = saleList.get(saleList.size() - 1);
        assertThat(testSale.getCustomerName()).isEqualTo(UPDATED_CUSTOMER_NAME);
        assertThat(testSale.getTotalCash()).isEqualTo(UPDATED_TOTAL_CASH);
        assertThat(testSale.getPaymentType()).isEqualTo(UPDATED_PAYMENT_TYPE);
    }

    @Test
    @Transactional
    public void updateNonExistingSale() throws Exception {
        int databaseSizeBeforeUpdate = saleRepository.findAll().size();

        // Create the Sale

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restSaleMockMvc.perform(put("/api/sales")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sale)))
            .andExpect(status().isCreated());

        // Validate the Sale in the database
        List<Sale> saleList = saleRepository.findAll();
        assertThat(saleList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteSale() throws Exception {
        // Initialize the database
        saleService.save(sale);

        int databaseSizeBeforeDelete = saleRepository.findAll().size();

        // Get the sale
        restSaleMockMvc.perform(delete("/api/sales/{id}", sale.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Sale> saleList = saleRepository.findAll();
        assertThat(saleList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Sale.class);
        Sale sale1 = new Sale();
        sale1.setId(1L);
        Sale sale2 = new Sale();
        sale2.setId(sale1.getId());
        assertThat(sale1).isEqualTo(sale2);
        sale2.setId(2L);
        assertThat(sale1).isNotEqualTo(sale2);
        sale1.setId(null);
        assertThat(sale1).isNotEqualTo(sale2);
    }
}
