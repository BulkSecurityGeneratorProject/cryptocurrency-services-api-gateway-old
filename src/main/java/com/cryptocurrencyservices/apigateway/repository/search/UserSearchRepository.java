package com.cryptocurrencyservices.apigateway.repository.search;

import com.cryptocurrencyservices.apigateway.domain.User;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the User entity.
 */
public interface UserSearchRepository extends ElasticsearchRepository<User, String> {
}
