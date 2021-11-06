package com.impel.diary.web.dto.response;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class DateHolderResponse {

    private LocalDateTime createdOn;
    private LocalDateTime updatedOn;
}
