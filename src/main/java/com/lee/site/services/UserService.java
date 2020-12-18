package com.lee.site.services;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import javax.servlet.http.HttpServletResponse;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.mail.HtmlEmail;
import org.springframework.beans.BeanUtils;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.lee.site.mail.info.SendUserInfo;
import com.lee.site.mapper.UserMapper;
import com.lee.site.models.entities.User;
import com.lee.site.models.entities.UserRole;
import com.lee.site.models.entities.UserRole.RoleType;
import com.lee.site.models.values.UserValue;
import com.lee.site.repositories.UserRepository;
import com.lee.site.repositories.UserRoleRepository;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class UserService {

	private final UserRepository userRepository;
	private final UserRoleRepository userRoleRepository;
	private final UserMapper userMapper;
	private final PasswordEncoder passwordEncoder;

	public Optional<User> findById(Long id) {
		return userRepository.findWithUserRolesById(id);
	}

	public Optional<User> findByIdUsingMapper(Long id) {
		return userMapper.findById(id);
	}

	public Optional<User> findByIdUsingMapper2(Long id) {
		return userMapper.findById2(id);
	}

	public User findByIdUsingMapper3(Long id) {
    return userMapper.findById3(id);
  }


	@Transactional(transactionManager="transactionManager")
	public User save(UserValue value) {
		User user = userRepository.save(User.builder()
				.type(value.getType())
				.email(value.getEmail())
				.birthDate(value.getBirthDate())
				.name(value.getName())
				.password(passwordEncoder.encode(value.getPassword()))
				.phoneNumber(value.getPhoneNumber())
				.sex(value.getSex()).build());
		return user;
	}

	@Transactional
	private UserRole saveUserRole(User user) {
		return userRoleRepository.save(UserRole.builder().user(user).roleName(RoleType.ROLE_VIEW).build());
	}

	public User join(UserValue value) {
		User user = save(value);
		saveUserRole(user);
		return user;
	}

	@Transactional
	public boolean patch(long id, UserValue value) {
		Optional<User> oUser = userRepository.findById(id);
		if(oUser.isPresent()) {
			User user = oUser.get();
			if(StringUtils.isNotBlank(value.getType()))
				user.setType(value.getType());
			if(StringUtils.isNotBlank(value.getEmail()))
				user.setEmail(value.getEmail());
			if(StringUtils.isNotBlank(value.getBirthDate()))
				user.setBirthDate(value.getBirthDate());
			if(StringUtils.isNotBlank(value.getName()))
				user.setName(value.getName());
			if(StringUtils.isNotBlank(value.getPassword()))
				user.setPassword(passwordEncoder.encode(value.getPassword()));
			if(StringUtils.isNotBlank(value.getPhoneNumber()))
				user.setPhoneNumber(value.getPhoneNumber());
			if(StringUtils.isNotBlank(value.getSex()))
				user.setSex(value.getSex());
		} else {
			return false;
		}
		return true;
	}

	@Transactional
	public boolean delete(long id) {
		Optional<User> oUser = userRepository.findById(id);
		if(!oUser.isPresent())
			return false;

		User user = oUser.get();
		user.setDel(true);
		return true;
	}

	public List<User> findAll(Pageable pageable) {
		return userRepository.findAllByDelOrderByIdDesc(false, pageable);
	}

	public Optional<User> findByEmail(String email) {
		return userRepository.findByEmail(email);
	}

	public User findByEmailMapper(String email) {
    return userMapper.findByEmail(email);
  }

	public boolean updateUser(User user) {
    boolean successCheck = false;
	  try {
	    userMapper.updatePassword(user);
	    successCheck = true;
	  }catch(Exception e) {
	    e.printStackTrace();
	    successCheck = false;
	  }
	  return successCheck;
  }

	public void sendEmail(User user, String pw) throws Exception {
	  SendUserInfo userInfo = new SendUserInfo();
	  // Mail Server 설정
	  String charSet = SendUserInfo.CHARSET;
	  String hostSMTP = SendUserInfo.HOST_SMTP;
	  String hostSMTPid = SendUserInfo.HOST_SMTP_ID;
	  String hostSMTPpwd = SendUserInfo.HOST_SMTP_PWD;

	  // 보내는 사람 EMail, 제목, 내용
	  String fromEmail = SendUserInfo.HOST_SMTP_ID;
	  String fromName = SendUserInfo.FROM_EMAIL;
	  String subject = SendUserInfo.SUBJECT;
	  String msg = SendUserInfo.MSG;

    subject = "임시 비밀번호 입니다.";
    msg += "<div align='center' style='border:1px solid black; font-family:verdana'>";
    msg += "<h3 style='color: blue;'>";
    msg += user.getEmail() + "님의 임시 비밀번호 입니다. 비밀번호를 변경하여 사용하세요.</h3>";
    msg += "<p>임시 비밀번호 : ";
    msg += pw + "</p></div>";

	  // 받는 사람 E-Mail 주소
	  String mail = user.getEmail();
	  try {
	    HtmlEmail email = new HtmlEmail();

	    email.setDebug(true);
	    email.setCharset(charSet);
	    email.setSSL(true);
	    email.setHostName(hostSMTP);
	    email.setSmtpPort(465); //네이버 이용시 587

	    email.setAuthentication(hostSMTPid, hostSMTPpwd);
	    email.setTLS(true);
	    email.addTo(mail, charSet);
	    email.setFrom(fromEmail, fromName, charSet);
	    email.setSubject(subject);
	    email.setHtmlMsg(msg);
	    email.send();
	  } catch (Exception e) {
	    System.out.println("메일발송 실패 : " + e);
	  }
	}

	public Map<String, Object> temporaryPassword(HttpServletResponse response, UserValue user) throws Exception {

	  Map<String, Object> responseMap = new HashMap<String, Object>();
	  response.setContentType("text/html;charset=utf-8");

	  User searchedUser = findByEmailMapper(user.getEmail());

//	  PrintWriter out = response.getWriter();
	  // 가입된 이메일이 아니면
	  if(null == searchedUser) {
	    responseMap.put("failEmail", true);
	    return responseMap;
//	    out.print("등록되지 않은 이메일입니다.");
//	    out.close();
	  }else {
	    // 임시 비밀번호 생성
	    String pw = "";
	    for (int i = 0; i < 12; i++) {
	      pw += (char) ((Math.random() * 26) + 97);
	    }
	    searchedUser.setPassword(passwordEncoder.encode(pw)); //암호화
	    UserValue userValue = new UserValue();
	    BeanUtils.copyProperties(searchedUser, userValue);

	    // 비밀번호 변경
	    //patch(searchedUser.getId(), userValue);
	    if(!updateUser(searchedUser)) {
	      //비밀번호 변경 실패
	      responseMap.put("updateErr", true);
	      return responseMap;
	    };

	    // 비밀번호 변경 메일 발송
	    sendEmail(searchedUser, pw);

	    responseMap.put("sendEmail", true);
//	    out.print("이메일로 임시 비밀번호를 발송하였습니다.");
//	    out.close();
	  }

	  return responseMap;
	}

}
