package com.impel.diary.model.repositories;

import com.impel.diary.model.domain.Category;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    List<Category> findByCreatedBy(String createdBy);

    Page<Category> findByCreatedBy(String createdBy, Pageable pageable);
}
