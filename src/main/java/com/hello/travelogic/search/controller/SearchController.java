package com.hello.travelogic.search.controller;

import com.hello.travelogic.search.dto.SearchDTO;
import com.hello.travelogic.search.service.SearchService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/search")
public class SearchController {
    private final SearchService searchService;

    @GetMapping
    public List<SearchDTO> search(@RequestParam("query") String query){
        return searchService.unifiedSearch(query);
    }
}
