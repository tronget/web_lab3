package com.tronget.validator;

import com.tronget.model.DotBean;
import jakarta.enterprise.context.RequestScoped;
import jakarta.inject.Named;

@Named
@RequestScoped
public class FormValidator implements Validator<DotBean> {
    @Override
    public boolean validate(DotBean dot) {
        Double x = dot.getX();
        Double y = dot.getY();
        Double r = dot.getR();

        if (x == null || y == null || r == null) {
            return false;
        }
        return checkBounds(x, -3, 3) &&
                checkBounds(y, -3, 5) &&
                checkBounds(r, 1, 5);
    }

    private boolean checkBounds(double num, double left, double right) {
        return left <= num && num <= right;
    }
}
