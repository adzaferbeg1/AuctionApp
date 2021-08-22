package com.atlantbh.internship.AuctionApp.controller;

import com.atlantbh.internship.AuctionApp.model.Category;
import com.atlantbh.internship.AuctionApp.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "/category")
public class CategoryController {
    @Autowired
    private final CategoryRepository categoryRepository;

    public CategoryController(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/all")
    public List<Category> getAllSupercategories() {
        return categoryRepository.getAllSupercategories();
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/subcategories")
    public List<Category> getAllSubcategories() {
        return categoryRepository.getAllSubcategories();
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/title")
    public Optional<Category> getCategoryByTitle(@RequestParam String title) {
        return categoryRepository.findByTitle(title);
    }
}
