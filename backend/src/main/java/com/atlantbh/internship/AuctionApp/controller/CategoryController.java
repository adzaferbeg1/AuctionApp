package com.atlantbh.internship.AuctionApp.controller;

import com.atlantbh.internship.AuctionApp.model.Category;
import com.atlantbh.internship.AuctionApp.repository.CategoryRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping(path = "/category")
public class CategoryController {
    @Autowired
    private final CategoryRepository categoryRepository;


    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/all")
    public List<Category> getAllCategories(){
        return categoryRepository.findAll();
    }
}
