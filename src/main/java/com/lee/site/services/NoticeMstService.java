package com.lee.site.services;

import java.util.List;
import org.springframework.stereotype.Service;
import com.lee.site.mapper.NoticeMstMapper;
import com.lee.site.models.entities.NoticeMstBean;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class NoticeMstService {
  private final NoticeMstMapper noticeMstMapper;

  public List<NoticeMstBean> getNoticeAll() {
    return noticeMstMapper.selectAll();
  }

}
