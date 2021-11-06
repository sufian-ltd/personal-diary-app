package com.impel.diary.web.dto;

import lombok.Data;

@Data
public class PageableRequestBodyDTO {

    private Integer page;
    private Integer size;
}
