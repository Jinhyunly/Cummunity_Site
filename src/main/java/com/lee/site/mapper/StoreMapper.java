package com.lee.site.mapper;

import java.util.Optional;
import com.lee.site.models.entities.Store;

public interface StoreMapper {
	
	public Optional<Store> findById(long id);
}

//@Component
//public class StoreMapper {
//	
//	@Autowired
//	private SqlSession sqlSessionTemplate;
//	
//	public Optional<Store> findById(long id) {
//		return Optional.ofNullable(sqlSessionTemplate.selectOne("com.lee.site.mapper.StoreMapper.findById", id));
//	}
//	
//}
