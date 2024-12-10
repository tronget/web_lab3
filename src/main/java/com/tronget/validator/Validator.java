package com.tronget.validator;

public interface Validator<T> {
    boolean validate(T obj);
}
