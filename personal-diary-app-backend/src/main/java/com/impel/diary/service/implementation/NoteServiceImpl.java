package com.impel.diary.service.implementation;

import com.impel.diary.model.domain.Note;
import com.impel.diary.model.repositories.NoteRepository;
import com.impel.diary.service.NoteService;
import com.impel.diary.utils.Utils;
import com.impel.diary.web.dto.NoteDTO;
import com.impel.diary.web.dto.PageableRequestBodyDTO;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.BeanUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
@Slf4j
public class NoteServiceImpl implements NoteService {

    private final NoteRepository noteRepository;
    private final ModelMapper modelMapper;
    private final Utils utils;

    @Override
    public NoteDTO createNote(NoteDTO noteDTO) {
        Note note = modelMapper.map(noteDTO, Note.class);
        noteRepository.save(note);
        return modelMapper.map(note, NoteDTO.class);
    }

    @Override
    public NoteDTO updateNote(NoteDTO noteDTO) {
        Optional<Note> noteOptional = noteRepository.findById(noteDTO.getId());
        if (noteOptional.isEmpty()) {
            return noteDTO;
        } else {
            Note note = noteOptional.get();
            BeanUtils.copyProperties(modelMapper.map(noteDTO, Note.class), note);
            noteRepository.save(note);
            return modelMapper.map(note, NoteDTO.class);
        }
    }

    @Override
    public void deleteNote(Long id) {
        noteRepository.deleteById(id);
    }

    @Override
    public NoteDTO getNote(Long id) {
        Optional<Note> note = noteRepository.findById(id);
        return note.isPresent() ? modelMapper.map(note, NoteDTO.class) : null;
    }

    @Override
    public List<NoteDTO> getNoteList() {
        List<Note> notes = noteRepository.findAll();
        return notes.stream().map(e -> modelMapper.map(e, NoteDTO.class)).collect(Collectors.toList());
    }

    @Override
    public Page<NoteDTO> getList(PageableRequestBodyDTO pageableRequestBodyDTO) {
        String userName = utils.getLoggedInUserName();
        Pageable pageable = utils.getPageable(pageableRequestBodyDTO);
        Page<Note> ePage = noteRepository.findByCreatedBy(userName, pageable);
        return new PageImpl<>(ePage.getContent().stream().map(e -> modelMapper.map(e, NoteDTO.class)).collect(Collectors.toList()), pageable, ePage.getTotalElements());
    }

    @Override
    public Page<NoteDTO> getNoteListByCategory(Long id, PageableRequestBodyDTO pageableRequestBodyDTO) {
        String userName = utils.getLoggedInUserName();
        Pageable pageable = utils.getPageable(pageableRequestBodyDTO);
        Page<Note> ePage = noteRepository.findByCategoryIdAndCreatedBy(id, userName, pageable);
        return new PageImpl<>(ePage.getContent().stream().map(e -> modelMapper.map(e, NoteDTO.class)).collect(Collectors.toList()), pageable, ePage.getTotalElements());
    }
}
