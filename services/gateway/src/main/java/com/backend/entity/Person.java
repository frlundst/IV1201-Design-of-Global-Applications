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
@Table(name = "person")
/**
 * Person entity.
 */
public class Person implements UserDetails{

    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid")
    private String id;

    @Column(name = "name")
    private String name;

    @Column(name = "surname")
    private String surname;

    @Column(name = "pnr")
    private String pnr;

    @Column(name = "email")
    private String email;

    @Column(name = "password")
    private String password;

    private Boolean enabled = true;

    @Column(name = "role")
    String personRole = "USER";

    @Column(name = "username")
    private String username;

    @OneToMany
    @JoinColumn(name = "person_id")
    private Collection<Availability> availabilities;

    @OneToMany
    @JoinColumn(name = "person_id")
    private Collection<CompetenceProfile> competenceProfiles;

    public Person() {
    }

    /**
     * Get username.
     * @return String username
     */
    @Override
    public String getUsername() {
        return email;
    }

    /**
     * Get is enabled.
     * @return boolean enabled
     */
    @Override
    public boolean isEnabled() {
        return enabled;
    }

    /**
     * Override toString()
     * @return String of object.
     */
    @Override
    public String toString() {
        return "Person [email=" + email + ", id=" + id + ", password="
                + password + "]";
    }

    /**
     * Get authorities.
     * @return Collection of authorities.
     */
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        SimpleGrantedAuthority authority = new SimpleGrantedAuthority(personRole);
        return Collections.singletonList(authority);
    }

    /**
     * Get is account non expired.
     * @return boolean account non expired
     */
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    /**
     * Get is account non locked.
     * @return boolean account non locked
     */
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    /**
     * Get is credentials non expired.
     * @return boolean credentials non expired
     */
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

}
