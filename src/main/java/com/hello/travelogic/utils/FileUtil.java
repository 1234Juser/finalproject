//package com.hello.travelogic.utils;
//
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.stereotype.Component;
//import org.springframework.web.multipart.MultipartFile;
//
//import java.io.IOException;
//import java.nio.file.Files;
//import java.nio.file.Path;
//import java.nio.file.Paths;
//import java.util.ArrayList;
//import java.util.List;
//import java.util.UUID;
//
////여행커뮤니티 파일업로드
//@Component
//public class FileUtil {
//
//    @Value("${file.upload-dir}")
//    private String uploadDir;
//
//    // 단일 파일 저장
//    public String saveFile(MultipartFile file) throws IOException {
//        if (file.isEmpty()) {
//            return null;
//        }
//
//        // 업로드 디렉토리 생성 (없으면)
//        Path uploadPath = Paths.get(uploadDir);
//        if (!Files.exists(uploadPath)) {
//            Files.createDirectories(uploadPath);
//        }
//
//        // 파일명 중복 방지를 위해 UUID 사용
//        String originalFilename = file.getOriginalFilename();
//        String fileExtension = "";
//        if (originalFilename != null && originalFilename.contains(".")) {
//            fileExtension = originalFilename.substring(originalFilename.lastIndexOf("."));
//        }
//        String uniqueFileName = UUID.randomUUID().toString() + fileExtension;
//        Path filePath = uploadPath.resolve(uniqueFileName);
//
//        Files.copy(file.getInputStream(), filePath);
//
//        // 저장된 파일의 상대 경로 반환 (웹에서 접근 가능한 경로)
//        return uploadDir + "/" + uniqueFileName;
//    }
//
//    // 다중 파일 저장
//    public List<String> saveFiles(List<MultipartFile> files) throws IOException {
//        List<String> savedFilePaths = new ArrayList<>();
//        for (MultipartFile file : files) {
//            String filePath = saveFile(file);
//            if (filePath != null) {
//                savedFilePaths.add(filePath);
//            }
//        }
//        return savedFilePaths;
//    }
//
//    // 파일 삭제
//    public boolean deleteFile(String filePath) {
//        if (filePath == null || filePath.trim().isEmpty()) {
//            return false;
//        }
//        try {
//            Path fileToDelete = Paths.get(filePath);
//            return Files.deleteIfExists(fileToDelete);
//        } catch (IOException e) {
//            // 파일 삭제 중 에러 발생 시 로그 기록 등 처리
//            e.printStackTrace();
//            return false;
//        }
//    }
//}
//
