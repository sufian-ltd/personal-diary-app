package com.impel.diary.web.dto;

import com.impel.diary.web.dto.response.DateHolderResponse;
import lombok.Data;

@Data
public class NoteDTO extends DateHolderResponse {
    private Long id;
    private String title;
    private String content;
    private CategoryDTO category;
}
