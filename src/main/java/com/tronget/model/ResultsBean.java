package com.tronget.model;


import com.tronget.service.ResultService;
import jakarta.annotation.PostConstruct;
import jakarta.enterprise.context.SessionScoped;
import jakarta.inject.Inject;
import jakarta.inject.Named;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Named
@SessionScoped
public class ResultsBean implements Serializable {

    @Inject
    private ResultService resultService;

    private List<Result> results;


    public void addResult(Result result) {
        List<Result> list = new ArrayList<>(List.copyOf(results));
        list.add(result);
        setResults(list);
    }

    @PostConstruct
    public void init() {
        results = resultService.getAll();
    }
}
