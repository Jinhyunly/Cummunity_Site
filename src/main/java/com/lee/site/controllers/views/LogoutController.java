package com.lee.site.controllers.views;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import com.lee.site.models.entities.SecurityUser;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Controller
public class LogoutController {


	@GetMapping(value = "/logout")
	public String index(@AuthenticationPrincipal SecurityUser securityUser){
		return "redirect:/login";
	}

}
