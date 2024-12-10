package com.tronget.util;

import com.tronget.model.Dot;
import com.tronget.model.DotBean;
import com.tronget.service.ResultService;
import com.tronget.validator.FormValidator;
import jakarta.enterprise.context.SessionScoped;
import jakarta.inject.Inject;
import jakarta.inject.Named;
import jakarta.transaction.Transactional;

import java.io.Serializable;

@Named
@SessionScoped
public class FormHandler implements Serializable {
    @Inject
    private DotBean dotBean;
    @Inject
    private ResultService service;
    @Inject
    private FormValidator validator;

    @Transactional
    public String handle() {
        if (!validator.validate(dotBean)) {
            return null;
        }
        System.out.println(dotBean.getX());
        System.out.println(123);
        Dot entityDot = dotBean.toEntityDot();
        dotBean.clear();
        service.save(entityDot);
        return null;
    }
}
