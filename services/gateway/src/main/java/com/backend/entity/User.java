package com.backend.entity;

import java.util.Collection;
import java.util.Collections;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import org.hibernate.annotations.GenericGenerator;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import jakarta.persistence.*;

@Getter
@Setter
@Entity
@EqualsAndHashCode
@Table(name = "user")
public class User implements UserDetails{

    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid")
    private String id;

    @Column(name = "email")
    private String email;

    @Column(name = "password")
    private String password;

    private Boolean enabled = true;

    String customerRole = "USER";

    public User() {
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }

    @Override
    public String toString() {
        return "Customer [email=" + email + ", id=" + id + ", password="
                + password + "]";
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        SimpleGrantedAuthority authority = new SimpleGrantedAuthority(customerRole);
        return Collections.singletonList(authority);
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

}
