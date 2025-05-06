package com.hello.travelogic.exception;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.client.HttpServerErrorException;

@RestControllerAdvice
public class GlobalExceptionHandler {
// 전역 예외 처리용 클래스
      // 여러 컨트롤러에서 공통으로 발생하는 예외를 한 곳에서 통합 처리함.
      // 모든 컨트롤러에서 발생하는 예외를 자동 감지 처리함.
      
      
      @ExceptionHandler ( EntityNotFoundException.class)
      public ResponseEntity <?> handleEntityNotFoundException( EntityNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
      }
      
      @ExceptionHandler(IllegalArgumentException.class)
      public ResponseEntity<?> handleIllegalArgumentException(IllegalArgumentException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("잘못된 요청입니다: " + ex.getMessage());
      }
      
      @ExceptionHandler( HttpServerErrorException.InternalServerError.class)
      public ResponseEntity<?> handleHttpServerException( HttpServerErrorException.InternalServerError ex) {
            return ResponseEntity.status (HttpStatus.INTERNAL_SERVER_ERROR).body (ex.getMessage());
      }
}
