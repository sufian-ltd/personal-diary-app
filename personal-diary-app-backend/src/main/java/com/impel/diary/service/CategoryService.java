package com.impel.diary.service;

import com.impel.diary.web.dto.CategoryDTO;
import com.impel.diary.web.dto.PageableRequestBodyDTO;
import org.springframework.data.domain.Page;

import java.util.List;

public interface CategoryService {

    CategoryDTO createCategory(CategoryDTO categoryDTO);

    CategoryDTO updateCategory(Long id, CategoryDTO categoryDTO);

    void deleteCategory(Long id);

    CategoryDTO getCategory(Long id);

    List<CategoryDTO> getCategoryList();

    Page<CategoryDTO> getList(PageableRequestBodyDTO pageableRequestBodyDTO);
}
