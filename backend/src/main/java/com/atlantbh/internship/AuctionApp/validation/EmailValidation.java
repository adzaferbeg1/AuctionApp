package com.atlantbh.internship.AuctionApp.validation;

import org.springframework.stereotype.Service;

import java.util.function.Predicate;
import java.util.regex.Pattern;

@Service
public class EmailValidation implements Predicate<String> {
    @Override
    public boolean test(String s) {
        return Pattern.compile("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$").matcher(s).matches();
    }
}
