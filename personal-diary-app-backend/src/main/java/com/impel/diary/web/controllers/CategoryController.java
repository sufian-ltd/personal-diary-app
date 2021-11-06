package com.impel.diary.web.controllers;

import com.impel.diary.config.annotations.RestApiController;
import com.impel.diary.constants.CategoryConstant;
import com.impel.diary.service.CategoryService;
import com.impel.diary.web.dto.CategoryDTO;
import com.impel.diary.web.dto.PageableRequestBodyDTO;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestApiController
@AllArgsConstructor
@RequestMapping(CategoryConstant.CATEGORY_ENDPOINT)
public class CategoryController {

    private final CategoryService categoryService;

    @PostMapping(path = CategoryConstant.CREATE)
    public ResponseEntity<?> createCategory(@RequestBody CategoryDTO categoryDTO) {
        return new ResponseEntity<>(categoryService.createCategory(categoryDTO), HttpStatus.CREATED);
    }

    @PutMapping(path = CategoryConstant.UPDATE + "/" + "{id}")
    public ResponseEntity<?> updateCategory(@PathVariable Long id, @RequestBody CategoryDTO categoryDTO) {
        return new ResponseEntity<>(categoryService.updateCategory(id, categoryDTO), HttpStatus.OK);
    }

    @DeleteMapping(path = CategoryConstant.DELETE + "/" + "{id}")
    public ResponseEntity<?> deleteCategory(@PathVariable Long id) {
        categoryService.deleteCategory(id);
        return new ResponseEntity<>(true, HttpStatus.OK);
    }

    @GetMapping(path = CategoryConstant.GET_BY_ID + "/" + "{id}")
    public ResponseEntity<?> getCategory(@PathVariable Long id) {
        return new ResponseEntity<>(categoryService.getCategory(id), HttpStatus.OK);
    }

    @GetMapping(path = CategoryConstant.GET_LIST)
    public ResponseEntity<?> getCategoryList() {
        return new ResponseEntity<>(categoryService.getCategoryList(), HttpStatus.OK);
    }

    @GetMapping(path = CategoryConstant.GET_LIST + "/{page}" + "/{size}", produces = "application/json")
    public Page<CategoryDTO> getList(@PathVariable("page") int page, @PathVariable("size") int size) {
        return categoryService.getList(new PageableRequestBodyDTO() {{
            setPage(page);
            setSize(size);
        }});
    }
}
