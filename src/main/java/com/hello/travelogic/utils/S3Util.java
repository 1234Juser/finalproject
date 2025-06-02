package com.hello.travelogic.utils;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.IOException;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Component
public class S3Util {

    private final S3Client s3Client;
    private final String bucketName;

    // 생성자를 통해 S3Client와 버킷 이름 주입
    public S3Util(S3Client s3Client, @Value("${aws.s3.bucket-name}") String bucketName) {
        this.s3Client = s3Client;
        this.bucketName = bucketName;
    }

    // 단일 파일 저장 -> S3에 업로드하고 전체 URL 반환
    public String saveFile(MultipartFile file) throws IOException {
        if (file == null || file.isEmpty()) {
            return null;
        }

        // S3 내에서 파일이 저장될 경로와 이름 설정 (예: community/uuid_filename.jpg)
        String originalFilename = file.getOriginalFilename();
        String key = "community/" + UUID.randomUUID().toString() + "_" + originalFilename;

        // S3 업로드 요청 생성
        PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                .bucket(bucketName)
                .key(key)
                .contentType(file.getContentType())
                .contentLength(file.getSize())
                .build();

        // 파일 업로드
        s3Client.putObject(putObjectRequest, RequestBody.fromInputStream(file.getInputStream(), file.getSize()));

        // 업로드된 파일의 전체 URL 반환
        return s3Client.utilities().getUrl(b -> b.bucket(bucketName).key(key)).toString();
    }

    // 다중 파일 저장
    public List<String> saveFiles(List<MultipartFile> files) throws IOException {
        List<String> savedFileUrls = new ArrayList<>();
        if (files == null || files.isEmpty()) {
            return savedFileUrls;
        }
        for (MultipartFile file : files) {
            String fileUrl = saveFile(file);
            if (fileUrl != null) {
                savedFileUrls.add(fileUrl);
            }
        }
        return savedFileUrls;
    }

    // 파일 삭제 -> S3 객체 삭제
    public boolean deleteFile(String fileUrl) {
        if (fileUrl == null || fileUrl.trim().isEmpty()) {
            return false;
        }
        try {
            // S3 URL에서 객체 키(파일 경로) 추출
            // 예: https://bucket-name.s3.region.amazonaws.com/community/filename.jpg -> community/filename.jpg
            String key = URLDecoder.decode(fileUrl.substring(fileUrl.indexOf("community/")), StandardCharsets.UTF_8);

            DeleteObjectRequest deleteObjectRequest = DeleteObjectRequest.builder()
                    .bucket(bucketName)
                    .key(key)
                    .build();

            s3Client.deleteObject(deleteObjectRequest);
            return true;
        } catch (Exception e) {
            // 파일 삭제 중 에러 발생 시 로그 기록
            System.err.println("S3 파일 삭제 중 오류 발생: " + fileUrl + ", 오류: " + e.getMessage());
            return false;
        }
    }
}