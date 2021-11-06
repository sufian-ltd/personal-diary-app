package com.impel.diary.service.implementation;

import com.impel.diary.model.domain.Category;
import com.impel.diary.model.repositories.CategoryRepository;
import com.impel.diary.model.repositories.NoteRepository;
import com.impel.diary.service.CategoryService;
import com.impel.diary.utils.Utils;
import com.impel.diary.web.dto.CategoryDTO;
import com.impel.diary.web.dto.PageableRequestBodyDTO;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.BeanUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
@Slf4j
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;
    private final NoteRepository noteRepository;
    private final ModelMapper modelMapper;
    private final Utils utils;

    @Override
    public CategoryDTO createCategory(CategoryDTO categoryDTO) {
        Category category = modelMapper.map(categoryDTO, Category.class);
        categoryRepository.save(category);
        return modelMapper.map(category, CategoryDTO.class);
    }

    @Override
    public CategoryDTO updateCategory(Long id, CategoryDTO categoryDTO) {
        Optional<Category> category = categoryRepository.findById(id);
        category.ifPresent(value -> {
            BeanUtils.copyProperties(categoryDTO, value);
            categoryRepository.save(value);
        });
        return categoryDTO;
    }

    @Transactional
    @Override
    public void deleteCategory(Long id) {
        noteRepository.deleteAllByCategoryId(id);
        categoryRepository.deleteById(id);
    }

    @Override
    public CategoryDTO getCategory(Long id) {
        Optional<Category> category = categoryRepository.findById(id);
        return category.isPresent() ? modelMapper.map(category, CategoryDTO.class) : null;
    }

    @Override
    public List<CategoryDTO> getCategoryList() {
        String userName = utils.getLoggedInUserName();
        List<Category> categories = categoryRepository.findByCreatedBy(userName);
        return categories.stream().map(e -> modelMapper.map(e, CategoryDTO.class)).collect(Collectors.toList());
    }

    @Override
    public Page<CategoryDTO> getList(PageableRequestBodyDTO pageableRequestBodyDTO) {
        String userName = utils.getLoggedInUserName();
        Pageable pageable = utils.getPageable(pageableRequestBodyDTO);
        Page<Category> ePage = categoryRepository.findByCreatedBy(userName, pageable);
        return new PageImpl<>(ePage.getContent().stream().map(e -> modelMapper.map(e, CategoryDTO.class)).collect(Collectors.toList()), pageable, ePage.getTotalElements());
    }
}
