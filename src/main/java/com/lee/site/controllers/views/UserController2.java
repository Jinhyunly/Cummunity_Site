package com.lee.site.controllers.views;

import java.util.HashMap;
import java.util.Map;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
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
@RequestMapping(value = {"/user"})
public class UserController2 {

  private final UserService userService;

  @RequestMapping("/update")
  public ModelAndView index(@AuthenticationPrincipal SecurityUser securityUser, ModelAndView mav){
    if(securityUser != null) {
      if(securityUser.getRoleTypes().contains(RoleType.ROLE_VIEW)) {
        mav.addObject("user", securityUser);

        // 나중에 메서드로 만들기
        if("1".equals(securityUser.getSex())) {
          mav.addObject("sexFlg", true);
        }else {
          mav.addObject("sexFlg", false);
        }

        mav.setViewName("/user/update");
        return mav;
      }
    }
    mav.setViewName("/login/login2");
    return mav;
  }


  @ResponseBody
  @PostMapping(value = "/update")
  public Map<String, Object> join(@RequestBody UserValue value){
    Map<String, Object> response = new HashMap<>();

//    if(userService.findByEmail(value.getEmail()).isPresent()) {
//      response.put("duplicate", true);
//      return response;
//    }

    if(!value.getPassword().equals(value.getConfirmPassword())) {
      response.put("passwordFail", true);
      return response;
    }

    response.put("success", userService.updateUserValue(value) ? true : false);
    return response;
  }



}
