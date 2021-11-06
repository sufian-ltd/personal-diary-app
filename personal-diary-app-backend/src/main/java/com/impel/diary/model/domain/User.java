package com.impel.diary.model.domain;

import com.sun.istack.NotNull;
import lombok.Data;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.Entity;
import javax.persistence.EntityListeners;

@Data
@Entity
@EntityListeners(AuditingEntityListener.class)
public class User extends BaseEntity {

    @NotNull
    private String userName;

    @NotNull
    private String password;

    @NotNull
    private String email;

}
