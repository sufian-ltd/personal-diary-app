package com.impel.diary.model.repositories;

import com.impel.diary.model.domain.Note;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NoteRepository extends JpaRepository<Note, Long> {
    void deleteAllByCategoryId(Long id);

    Page<Note> findByCategoryIdAndCreatedBy(Long id, String createdBy, Pageable pageable);

    List<Note> findByCreatedBy(String createdBy);

    Page<Note> findByCreatedBy(String createdBy, Pageable pageable);
}
