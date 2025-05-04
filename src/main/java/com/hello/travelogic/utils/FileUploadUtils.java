package com.hello.travelogic.utils;

import com.hello.travelogic.member.domain.MemberEntity;
import com.hello.travelogic.product.domain.ProductEntity;
import com.hello.travelogic.product.dto.ProductDTO;
import com.hello.travelogic.product.repo.ProductRepo;
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


    private final ProductRepo productRepo;

    public static String saveNewFile(MultipartFile file) throws IOException {

        String fileName = null;

        if (file.isEmpty()) {
            fileName = "nan";
        } else {
            fileName = UUID.randomUUID().toString() + "-" + file.getOriginalFilename();
        }
        System.out.println("fileName = " + fileName);


        // OR System.getProperty("user.dir")
        String baseDir = System.getProperty("user.home") + File.separator + "Desktop"
                + File.separator + "hello_travelogic" + File.separator + "upload"
                + File.separator + "product" + File.separator;


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
}
