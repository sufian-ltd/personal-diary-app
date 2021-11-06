package com.impel.diary.model.domain;

import lombok.Data;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;

@Data
@Entity
@EntityListeners(AuditingEntityListener.class)
public class Note extends BaseEntity {

    private String title;
    private String content;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;
}
