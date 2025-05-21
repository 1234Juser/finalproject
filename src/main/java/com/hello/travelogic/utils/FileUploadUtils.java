package com.hello.travelogic.utils;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Component
@AllArgsConstructor
public class FileUploadUtils {


    public static String saveNewFile(MultipartFile file) throws IOException {

        String fileName = null;

        if (file.isEmpty()) {
            fileName = "nan";
        } else {
            fileName = UUID.randomUUID().toString() + "-" + file.getOriginalFilename();
        }
        System.out.println("fileName = " + fileName);


        // OR System.getProperty("user.dir")
        String baseDir = System.getProperty("user.dir") + File.separator + "upload" + File.separator + "product" + File.separator;
        
        Path path = Paths.get(baseDir + fileName);      // 파일 저장 경로 설정
        Files.createDirectories(path.getParent());      // 디렉토리 없으면 생성함

        System.out.println("path = " + path);
        System.out.println("path.getParent() = " + path.getParent());

        if(!file.isEmpty()) {
            file.transferTo(path);   // 파일 저장
        }
        System.out.println("file = " + file);
        return fileName;
    }

    public static String saveReviewFile(MultipartFile file) throws IOException {
        if (file == null || file.isEmpty()) {
            System.out.println("빈 파일이 업로드되었거나 파일이 없습니다.");
            return null;
        }

        // 파일명 생성
        String fileName = UUID.randomUUID().toString() + "-" + file.getOriginalFilename();

        // 리뷰 파일은 upload/review 폴더에 저장
        String baseDir = System.getProperty("user.dir") + File.separator + "upload" + File.separator + "review" + File.separator;
        Path path = Paths.get(baseDir + fileName);

        // 폴더가 없으면 생성
        Files.createDirectories(path.getParent());

        // 파일 저장
        file.transferTo(path);
        System.out.println("파일 저장 완료: " + fileName);
//        String fileName = null;
//
//        if (file.isEmpty()) {
//            fileName = "nan";
//        } else {
//            fileName = UUID.randomUUID().toString() + "-" + file.getOriginalFilename();
//        }
//
//        // 리뷰 파일은 upload/review 폴더에 저장
//        String baseDir = System.getProperty("user.dir") + File.separator + "upload" + File.separator + "review" + File.separator;
//
//        Path path = Paths.get(baseDir + fileName);
//        Files.createDirectories(path.getParent());
//
//        if (!file.isEmpty()) {
//            file.transferTo(path);
//        }

        return fileName;
    }
}
