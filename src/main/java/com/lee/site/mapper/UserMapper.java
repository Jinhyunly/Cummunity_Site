package com.lee.site.mapper;

import java.util.Optional;
import org.apache.ibatis.annotations.Select;
import com.lee.site.models.entities.User;

public interface UserMapper {

	public Optional<User> findById(long id);

	@Select("SELECT * FROM user where id = #{id}")
	public Optional<User> findById2(long id);

	public User findById3(long id);

	public User findByEmail(String email);

	public void updatePassword(User user);
}
