package com.hello.travelogic.utils;

import lombok.AllArgsConstructor;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest;
import software.amazon.awssdk.services.s3.model.S3Exception;

import java.io.File;
import java.io.IOException;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Component
//@AllArgsConstructor   // S3Client를 수동으로 주입하므로 @AllArgsConstructor는 제거하거나 필요에 따라 수정
@Slf4j
public class FileUploadUtils {

    @Value("${aws.s3.bucket-name}")
    private String bucketName;

    private final S3Client s3Client;


    // S3 파일 업로드 유틸리티 추가
    public FileUploadUtils(
            @Value("${aws.s3.access-key}") String accessKey,
                           @Value("${aws.s3.secret-key}") String secretKey,
                           @Value("${aws.s3.region}") String region) {

        // AWS SDK v2에서는 S3Client.builder()를 사용합니다.
        // 자격 증명은 EnvironmentVariableCredentialsProvider, SystemPropertyCredentialsProvider,
        // DefaultCredentialsProvider 등을 사용하거나 정적으로 설정할 수 있습니다.
        // 여기서는 예시로 StaticCredentialsProvider를 사용하지만, 프로덕션 환경에서는 IAM Role 사용을 권장합니다.

        // S3 클라이언트 초기화
        this.s3Client = S3Client.builder()
                .region(Region.of(region))  // Region.of()를 사용하여 Region 객체 생성
                 .credentialsProvider(StaticCredentialsProvider.create(AwsBasicCredentials.create(accessKey, secretKey)))
                .build();
    }

    // 범용버킷 내 폴더가 아니라 바로 저장을 위해 매개변수가 하나인 경우
    public String uploadToS3(MultipartFile file) throws IOException {
        return uploadToS3(file, null);
    }

    public String uploadToS3(MultipartFile file, String folderName) throws IOException {
        // 범용버킷에 바로저장
//        String fileName = System.currentTimeMillis() + "-" + file.getOriginalFilename();

        String originalFileName = file.getOriginalFilename();
        // 범용 버킷 내 폴더에 저장
//        String fileName = folderName + "/" + System.currentTimeMillis() + "-" + originalFileName;
        // 폴더 있을 때와 없을 때 모두 가능
        String fileName;
        if (folderName == null || folderName.isBlank()) {
            fileName = System.currentTimeMillis() + "-" + originalFileName;
        } else {
            fileName = folderName + "/" + System.currentTimeMillis() + "-" + originalFileName;
        }
        
        s3Client.putObject(builder -> builder.bucket(bucketName).key(fileName),
                RequestBody.fromInputStream(file.getInputStream(), file.getSize()));

        // S3 URL 반환
        return String.format("https://%s.s3.%s.amazonaws.com/%s", bucketName, s3Client.serviceClientConfiguration().region().id(), fileName);
    }


    //  S3 파일 삭제 메서드
    public void deleteS3File(String s3Url) {

        try {
            // URL에서 파일 경로 추출 (버킷 이름 뒤부터)
            URL    url  = new URL(s3Url);
            String path = url.getPath(); // 예: "/1748761273162-뿔바투최용멍.jpg"
            String key = path.startsWith("/") ? path.substring(1) : path; // 맨 앞 '/' 제거
            
            if (key.isEmpty()) {
                System.err.println("URL에서 유효한 S3 키를 추출할 수 없습니다: " + s3Url);
                return;
            }
            
            log.debug ("S3에서 삭제할 파일 키 : {}" , key);

            DeleteObjectRequest deleteObjectRequest = DeleteObjectRequest.builder()
                    .bucket(bucketName)
                    .key(key)
                    .build();

            s3Client.deleteObject(deleteObjectRequest);
//            System.out.println("S3에서 파일 삭제 성공: " + key);
            
        } catch (S3Exception e) {
            log.error ("S3 파일 삭제 중 오류 발생 (S3 Exception) : {}" , e.awsErrorDetails ().errorMessage ());
            e.printStackTrace ();
            // ProductService로 예외를 전파하여 트랜잭션 롤백 유도
            throw new RuntimeException("S3 파일 삭제 중 오류가 발생했습니다.", e);
        }
        catch (Exception e) {
            System.err.println("S3 파일 삭제 중 오류 발생: " + e.getMessage());
            e.printStackTrace();
            // ProductService로 예외를 전파하여 트랜잭션 롤백 유도
            throw new RuntimeException("S3 파일 삭제 중 알 수 없는 오류가 발생했습니다.", e);
        }
    }


    // 기존 로컬 파일 저장 유틸리티는 그대로 유지하거나 제거

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
