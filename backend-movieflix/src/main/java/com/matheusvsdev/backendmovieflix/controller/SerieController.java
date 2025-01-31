package com.matheusvsdev.backendmovieflix.controller;

import com.matheusvsdev.backendmovieflix.dto.SerieDTO;
import com.matheusvsdev.backendmovieflix.service.SerieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SerieController {

    @Autowired
    private SerieService serieService;

    @GetMapping(value = "/series")
    public ResponseEntity<Page<SerieDTO>> findSeriesByCategoryIdAndTitle(
            @RequestParam(value = "categoryId", required = false) Long categoryId,
            @RequestParam(value = "title", required = false) String title,
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "5") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<SerieDTO> result = serieService.findSeriesByCategoryAndTitle(categoryId, title, pageable);
        return ResponseEntity.ok(result);
    }
}
