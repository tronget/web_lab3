package com.tronget.service;

import com.tronget.model.Dot;
import com.tronget.model.DotBean;
import com.tronget.model.Result;
import com.tronget.model.ResultsBean;
import com.tronget.repository.ResultRepository;
import com.tronget.util.DotChecker;
import jakarta.enterprise.context.SessionScoped;
import jakarta.inject.Inject;
import jakarta.inject.Named;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Named
@SessionScoped
public class ResultService implements Serializable {
    @Inject
    private ResultRepository repository;

    @Inject
    private ResultsBean resultsBean;

    @Inject
    private DotChecker dotChecker;

    public Result save(Result result) {
        resultsBean.addResult(result);
        return repository.save(result);
    }

    public Result save(Dot dot) {
        boolean isHit = dotChecker.check(dot);
        Result result = new Result(dot, isHit);
        return save(result);
    }

    public List<Result> getAll() {
        List<Result> list = repository.findAll();
        if (list == null) {
            list = new ArrayList<>();
        }
        return list;
    }
}

