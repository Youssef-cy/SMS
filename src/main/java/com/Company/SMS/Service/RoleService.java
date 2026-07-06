package com.Company.SMS.Service;

import com.Company.SMS.DTO.Role.RoleRES;
import com.Company.SMS.Repo.RoleRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoleService {

    @Autowired
    private RoleRepo roleRepo;


    public List<RoleRES> getAllRoles(){
        return roleRepo.findAllRole();
    }

}
