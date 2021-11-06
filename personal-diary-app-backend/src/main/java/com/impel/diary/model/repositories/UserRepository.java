package com.impel.diary.model.repositories;

import com.impel.diary.model.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByUserName(String userName);
}
