package com.impel.diary.utils;

import com.impel.diary.web.dto.PageableRequestBodyDTO;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class Utils {

    private static final int DEFAULT_PAGE_SIZE = 1000000;

    public Pageable getPageable(PageableRequestBodyDTO requestDTO) {
        PageableRequestBodyDTO pageSettings = new PageableRequestBodyDTO() {{
            setPage(0);
            setSize(DEFAULT_PAGE_SIZE);
        }};
        if (requestDTO != null && requestDTO.getPage() != null && requestDTO.getSize() != null) {
            pageSettings = requestDTO;
        }
        return PageRequest.of(pageSettings.getPage(), pageSettings.getSize());
    }

    public String getLoggedInUserName() {
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }

}
