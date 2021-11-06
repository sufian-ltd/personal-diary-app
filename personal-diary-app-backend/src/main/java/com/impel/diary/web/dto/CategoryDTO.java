package com.impel.diary.web.dto;

import com.impel.diary.web.dto.response.DateHolderResponse;
import lombok.Data;

@Data
public class CategoryDTO extends DateHolderResponse {
    private Long id;
    private String name;
}
