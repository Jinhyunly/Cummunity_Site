package com.lee.site.models.responses;

import com.lee.site.models.entities.User;
import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "회원 Response")
public class UserResponse extends CommonResponse<User> {

	public UserResponse(User data) {
		super(data);
	}
	
}
