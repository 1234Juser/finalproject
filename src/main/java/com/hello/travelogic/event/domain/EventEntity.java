package com.hello.travelogic.event.domain;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.cglib.core.Local;

import java.time.LocalDateTime;

@Entity
@Table(name="tbl_event")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EventEntity {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name="event_code", nullable=false, columnDefinition = "INT COMMENT '이벤트번호'")
    private Integer eventCode;

    @Column(name="event_title", nullable=false, length=50, columnDefinition = "VARCHAR(50) COMMENT '제목'")
    private String eventTitle;

    @Column(name="event_content", nullable= false, length=255, columnDefinition = "VARCHAR(255) COMMENT '내용'")
    private String eventContent;

    @Column(name="event_img", nullable=false, length=255, columnDefinition = "VARCHAR(255) COMMENT '이미지 파일 경로'")
    private String eventImg;

    @Column(name = "event_status", nullable = false, length=10, columnDefinition = "VARCHAR(10) COMMENT '진행 상태'")
    private String eventStatus;

    @Column(name="event_startdate", nullable=false)
    private LocalDateTime eventStartdate;

    @Column(name="event_enddate", nullable=false)
    private LocalDateTime eventEnddate;





}
