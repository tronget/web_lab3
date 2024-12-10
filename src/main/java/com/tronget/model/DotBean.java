package com.tronget.model;

import jakarta.faces.view.ViewScoped;
import jakarta.inject.Named;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Named("dotBean")
@ViewScoped
@Getter
@Setter
public class DotBean implements Serializable {
    private Double x;
    private Double y;
    private Double r;

    public Dot toEntityDot() {
        return new Dot(x, y, r);
    }

    public void clear() {
        x = null;
        y = null;
        r = null;
    }
}
