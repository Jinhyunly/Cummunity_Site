package com.lee.site.models.entities;

import java.math.BigDecimal;
import java.sql.Timestamp;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TblBaseBean implements java.io.Serializable {
  /** 등록담당. */
  private String add_tancd;

  /** 등록일시. */
  private Timestamp add_date;

  /** 변경담당. */
  private String upd_tancd;

  /** 변경일시. */
  private Timestamp upd_date;

  /** 변경카운트. */
  private BigDecimal upd_count;

  /** 등록구분. */
  private String ent_kbn = "1";

  /** 개시(0START). */
  private int limit = -1;

  /** 표시건수. */
  private int offset = -1;

}
