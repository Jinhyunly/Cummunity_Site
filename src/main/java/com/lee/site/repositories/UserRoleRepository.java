package com.lee.site.repositories;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.lee.site.models.entities.User;
import com.lee.site.models.entities.UserRole;

@Repository
public interface UserRoleRepository extends JpaRepository<UserRole, Long>{
	
	Set<UserRole> findByUserAndDel(User user, boolean del);
	
}