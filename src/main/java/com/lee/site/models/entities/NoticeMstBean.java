package com.lee.site.models.entities;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NoticeMstBean  extends TblBaseBean {

    /** ID. */
    private String id;

    /** NOTICE. */
    private String notice;

    /** INFO_COLOR. */
   private String info_color;

}