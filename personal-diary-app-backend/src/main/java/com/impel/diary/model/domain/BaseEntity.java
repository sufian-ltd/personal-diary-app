package com.impel.diary.model.domain;

import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import javax.persistence.*;
import java.time.LocalDateTime;

@MappedSuperclass
@Data
public class BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String createdBy;

    @CreationTimestamp
    private LocalDateTime createdOn;

    @UpdateTimestamp
    private LocalDateTime updatedOn;

    @PrePersist
    public void onCreate() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        setCreatedBy(authentication.getName());
    }

    @PreUpdate
    public void onUpdate() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        setCreatedBy(authentication.getName());
    }

}
