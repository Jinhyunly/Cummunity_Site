package com.lee.site.controllers.views;

import java.util.List;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;
import com.lee.site.models.entities.NoticeMstBean;
import com.lee.site.services.NoticeMstService;
import com.lee.site.services.StoreService;
import com.lee.site.services.UserService;
import lombok.RequiredArgsConstructor;

@RequestMapping("/v")
@RequiredArgsConstructor
@Controller
public class VController {

	private final StoreService storeService;
	private final UserService userService;
	private final NoticeMstService noticeMstService;

	@GetMapping("")
	public ModelAndView main(ModelAndView mav) {
	  List<NoticeMstBean> noticeList = noticeMstService.getNoticeAll();
	  mav.addObject("noticeList", noticeList);
	  mav.setViewName("content/main2");
		return mav;
	}

	@GetMapping("/users")
	public String selectUsers(Model model, @PageableDefault(page=0, size=5, sort="id", direction = Sort.Direction.DESC) Pageable pageable) {
		model.addAttribute("users", userService.findAll(pageable));
		model.addAttribute("currentPage", "user");
		return "content/user";
	}

	@GetMapping("/stores")
	public String selectStores(Model model, @PageableDefault(page=0, size=5, sort="id", direction = Sort.Direction.DESC) Pageable pageable) {
		model.addAttribute("stores", storeService.findAll(pageable));
		model.addAttribute("currentPage", "store");
		return "content/store";
	}
}
