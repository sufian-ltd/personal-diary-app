package com.impel.diary.service;

import com.impel.diary.web.dto.CategoryDTO;
import com.impel.diary.web.dto.NoteDTO;
import com.impel.diary.web.dto.PageableRequestBodyDTO;
import org.springframework.data.domain.Page;

import java.util.List;

public interface NoteService {

    NoteDTO createNote(NoteDTO noteDTO);

    NoteDTO updateNote(NoteDTO noteDTO);

    void deleteNote(Long id);

    NoteDTO getNote(Long id);

    List<NoteDTO> getNoteList();

    Page<NoteDTO> getList(PageableRequestBodyDTO pageableRequestBodyDTO);

    Page<NoteDTO> getNoteListByCategory(Long id,PageableRequestBodyDTO pageableRequestBodyDTO);
}
