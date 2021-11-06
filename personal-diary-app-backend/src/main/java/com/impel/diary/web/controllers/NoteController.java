package com.impel.diary.web.controllers;

import com.impel.diary.config.annotations.RestApiController;
import com.impel.diary.constants.NoteConstant;
import com.impel.diary.service.NoteService;
import com.impel.diary.web.dto.NoteDTO;
import com.impel.diary.web.dto.PageableRequestBodyDTO;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestApiController
@AllArgsConstructor
@RequestMapping(NoteConstant.NOTE_ENDPOINT)
public class NoteController {

    private final NoteService noteService;

    @PostMapping(path = NoteConstant.CREATE)
    public ResponseEntity<?> createNote(@RequestBody NoteDTO noteDTO) {
        return new ResponseEntity<>(noteService.createNote(noteDTO), HttpStatus.CREATED);
    }

    @PutMapping(path = NoteConstant.UPDATE)
    public ResponseEntity<?> updateNote(@RequestBody NoteDTO noteDTO) {
        return new ResponseEntity<>(noteService.updateNote(noteDTO), HttpStatus.OK);
    }

    @DeleteMapping(path = NoteConstant.DELETE + "/" + "{id}")
    public ResponseEntity<?> deleteNote(@PathVariable Long id) {
        noteService.deleteNote(id);
        return new ResponseEntity<>(true, HttpStatus.OK);
    }

    @GetMapping(path = NoteConstant.GET_BY_ID + "/" + "{id}")
    public ResponseEntity<?> getNote(@PathVariable Long id) {
        return new ResponseEntity<>(noteService.getNote(id), HttpStatus.FOUND);
    }

    @GetMapping(path = NoteConstant.GET_LIST)
    public ResponseEntity<?> getNoteList() {
        return new ResponseEntity<>(noteService.getNoteList(), HttpStatus.FOUND);
    }

    @GetMapping(path = NoteConstant.GET_LIST + "/{page}" + "/{size}", produces = "application/json")
    public Page<NoteDTO> getList(@PathVariable("page") int page, @PathVariable("size") int size) {
        return noteService.getList(new PageableRequestBodyDTO() {{
            setPage(page);
            setSize(size);
        }});
    }

    @GetMapping(path = NoteConstant.NOTE_LIST_BY_CATEGORY + "/{id}" + "/{page}" + "/{size}", produces = "application/json")
    public Page<NoteDTO> getNoteListByCategory(@PathVariable("id") Long id, @PathVariable("page") int page, @PathVariable("size") int size) {
        return noteService.getNoteListByCategory(id, new PageableRequestBodyDTO() {{
            setPage(page);
            setSize(size);
        }});
    }
}
