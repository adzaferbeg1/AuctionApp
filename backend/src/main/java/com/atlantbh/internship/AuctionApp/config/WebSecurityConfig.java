package com.atlantbh.internship.AuctionApp.config;

import com.atlantbh.internship.AuctionApp.security.jwt.JwtAuthEntryPoint;
import com.atlantbh.internship.AuctionApp.security.jwt.JwtAuthTokenFilter;
import com.atlantbh.internship.AuctionApp.service.PersonService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
@AllArgsConstructor
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    private final String[] publicRoutes = {
            "/bid/bids-no",
            "/bid/highest-bids",
            "/bid/highest-bidder",
            "/category/**",
            "/item/sold-items",
            "/item/active-items",
            "/item/subcategory-items",
            "/item/search",
            "/item/avg-price",
            "/item/min-price",
            "/item/max-price",
            "/item/time-left",
            "/item/new-to-old",
            "/item/sort-default",
            "/item/sort-price-high",
            "/item/sort-price-low",
            "/item/single-item",
            "/item/category",
            "/item/last-chance",
            "/item/new-arrival",
            "/notification/all-notifications",
            "/notification/post-notification",
            "/auth/sign-in",
            "/auth/sign-up",
            "/auth/single-user",
            "/auth/user-email",
    };

    private final String[] privateRoutes = {
            "/bid/place-bid",
            "/bid/bidders",
            "/card/user-information",
            "/item/place-bid",
            "/item/add-item",
            "/notification/set-seen",
            "/notification/user-notifications",
            "/checkout/card-payment",
            "/auth/update-information",
            "/auth/delete-user",
            "/auth/user-bids",
            "/auth/user-address",
    };

    @Autowired
    PersonService personService;

    @Autowired
    private JwtAuthEntryPoint unauthorizedHandler;

    @Bean
    public JwtAuthTokenFilter authenticationJwtTokenFilter() {
        return new JwtAuthTokenFilter();
    }

    @Override
    public void configure(AuthenticationManagerBuilder authenticationManagerBuilder) throws Exception {
        authenticationManagerBuilder
                .userDetailsService(personService)
                .passwordEncoder(passwordEncoder());
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .cors()
                .and()
                .csrf()
                .disable()
                .authorizeRequests()
                .antMatchers(publicRoutes)
                .permitAll()
                .and()
                .authorizeRequests()
                .antMatchers(privateRoutes)
                .authenticated()
                .and()
                .exceptionHandling()
                .authenticationEntryPoint(unauthorizedHandler)
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        http.addFilterBefore(authenticationJwtTokenFilter(), UsernamePasswordAuthenticationFilter.class);
    }
}
