package com.lee.site.controllers.views;

import java.util.HashMap;
import java.util.Map;
import javax.servlet.http.HttpServletResponse;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import com.lee.site.models.entities.SecurityUser;
import com.lee.site.models.entities.UserRole.RoleType;
import com.lee.site.models.values.UserValue;
import com.lee.site.services.UserService;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Controller
public class LoginController {

	private final UserService userService;

	@GetMapping(value = "/")
	public String index(@AuthenticationPrincipal SecurityUser securityUser){
		if(securityUser != null) {
			if(securityUser.getRoleTypes().contains(RoleType.ROLE_VIEW)) {
				return "redirect:/v";
			}
		}
		return "redirect:/login";
	}

	@GetMapping(value = "/login")
	public ModelAndView login(@AuthenticationPrincipal SecurityUser securityUser, ModelAndView mav){
		if(securityUser != null && securityUser.getRoleTypes().contains(RoleType.ROLE_VIEW)) {
		  mav.setViewName("/v");
			return mav;
		}
		mav.setViewName("login/login2");
		return mav;
	}

	@RequestMapping(value = "/err/denied-page")
	public String accessDenied(){
		return "err/deniedPage";
	}

	@GetMapping(value = "/join")
	public String joinForm(@AuthenticationPrincipal SecurityUser securityUser){
		if(securityUser != null && securityUser.getRoleTypes().contains(RoleType.ROLE_VIEW)) {
			return "redirect:/v";
		}
		return "login/join2";
	}

	@ResponseBody
	@PostMapping(value = "/join")
	public Map<String, Object> join(@RequestBody UserValue value){
		Map<String, Object> response = new HashMap<>();

		if(userService.findByEmail(value.getEmail()).isPresent()) {
			response.put("duplicate", true);
			return response;
		}

		if(!value.getPassword().equals(value.getConfirmPassword())) {
		  response.put("passwordFail", true);
		}

		response.put("success", userService.join(value) != null ? true : false);
		return response;
	}

	@GetMapping(value = "/searchPassword")
  public String searchPassword(){

    return "login/password";
  }

	@ResponseBody
	@PostMapping(value = "/resetPassword")
	public Map<String, Object> temporaryPassword(HttpServletResponse response, @RequestBody UserValue user) throws Exception {
	  return userService.temporaryPassword(response, user);
	}

}
