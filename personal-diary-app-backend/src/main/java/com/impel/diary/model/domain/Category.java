package com.impel.diary.model.domain;

import lombok.Data;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.Entity;
import javax.persistence.EntityListeners;

@Data
@Entity
@EntityListeners(AuditingEntityListener.class)
public class Category extends BaseEntity {

    private String name;
}
