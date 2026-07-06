package com.Company.SMS.Controller;

import com.Company.SMS.DTO.Role.RoleRES;
import com.Company.SMS.Service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/API/Role")
public class RoleController {

    @Autowired
    private RoleService roleService;

    @GetMapping()
    public List<RoleRES> getAllRoles(){
        return roleService.getAllRoles();
    }

}
