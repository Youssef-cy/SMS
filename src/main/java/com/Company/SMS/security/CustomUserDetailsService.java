package com.Company.SMS.security;

import com.Company.SMS.entities.User;
import com.Company.SMS.Repo.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {
    private final UserRepo userRepo;

    @Override
    public UserDetails loadUserByUsername(String username)
            throws UsernameNotFoundException {
        User user = userRepo.findByEmail(username).orElseThrow(() ->
                new UsernameNotFoundException("User not found.")
        );
        return new CustomUserDetails(user);
    }
}
