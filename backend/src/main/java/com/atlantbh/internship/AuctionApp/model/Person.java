package com.atlantbh.internship.AuctionApp.model;

import com.atlantbh.internship.AuctionApp.model.enums.PersonRole;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.Collection;
import java.util.Collections;

@Getter
@Setter
@EqualsAndHashCode
@NoArgsConstructor
@Entity
@Table(name="person")
public class Person implements UserDetails {
    @Enumerated(EnumType.STRING)
    private PersonRole personRole;
    private Boolean locked = false;
    private Boolean enabled = false;

    @Id
    @Column(name="id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NotBlank
    @Column(name="name")
    @Size(max = 200)
    @Size(min = 2)
    private String name;

    @NotBlank
    @Column(name="surname")
    @Size(max = 200)
    @Size(min = 2)
    private String surname;

    @NotBlank
    @Column(name="email", nullable = false, unique = true)
    @Size(max = 100)
    private String email;

    @NotBlank
    @Column(name="password", nullable = false)
    @Size(min = 4)
    private String password;

    @Column(name="address")
    @Size(max = 300)
    private String address;

    @Column(name="phone_no")
    @Size(max = 100)
    private String phoneNumber;

    public Person(@NotBlank @Max(200) @Min(2) String name, @NotBlank @Max(200) @Min(2) String surname, @NotBlank @Max(100) String email, @NotBlank @Max(100) String password, PersonRole role) {
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.password = password;
        this.personRole = role;
    }


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        SimpleGrantedAuthority authority = new SimpleGrantedAuthority(personRole.name());
        return Collections.singletonList(authority);
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return !locked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }
}
