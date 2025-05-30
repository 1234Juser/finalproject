package com.hello.travelogic.utils;

import lombok.AllArgsConstructor;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Component
//@AllArgsConstructor   // S3Client를 수동으로 주입하므로 @AllArgsConstructor는 제거하거나 필요에 따라 수정
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
                // .credentialsProvider(StaticCredentialsProvider.create(AwsBasicCredentials.create(accessKey, secretKey))) // 직접 자격 증명 설정 시
                .build();
    }

    public String uploadToS3(MultipartFile file) throws IOException {
        String fileName = System.currentTimeMillis() + "-" + file.getOriginalFilename();
        // todo. 이 fileName을 key로 파싱해서 데이터베이스에 저장하는게 좋음.
        //  그래서 아래 S3 파일 삭제 메서드에서 key를 직접 사용하면 훨씬 안정적으로 파일 삭제할 수 있음.

        // putObject 대신 putObject(PutObjectRequest, RequestBody)를 사용합니다.
        s3Client.putObject(builder -> builder.bucket(bucketName).key(fileName),
                RequestBody.fromInputStream(file.getInputStream(), file.getSize()));

        // S3 URL 반환
        return String.format("https://%s.s3.%s.amazonaws.com/%s", bucketName, s3Client.serviceClientConfiguration().region().id(), fileName);
    }


    //  S3 파일 삭제 메서드
    public void deleteS3File(String s3Url) {
        // S3 URL에서 파일 키(파일명)를 추출해야 합니다.
        // 예를 들어, "https://your-s3-bucket-name.s3.ap-northeast-2.amazonaws.com/1234567890-image.jpg"
        // 에서 "1234567890-image.jpg" 부분을 추출합니다.
        try {
            // URL에서 파일 경로 추출 (버킷 이름 뒤부터)
            String key = s3Url.substring(s3Url.indexOf(bucketName + ".s3") + bucketName.length() + 4 + s3Client.serviceClientConfiguration().region().id().length() + 10);
            // 위 substring 로직은 URL 구조에 따라 다소 복잡할 수 있습니다.
            // 더 안전한 방법은 파일을 업로드할 때 S3 URL 대신 'key' (파일명) 자체를 DB에 저장하고,
            // 삭제 시 그 'key'를 사용하는 것입니다.

            // 현재 URL에서 key를 직접 추출하는 임시 로직 (정확하지 않을 수 있음, 권장 안함)
            // String key = s3Url.substring(s3Url.lastIndexOf("/") + 1);
            // S3 URL이 `https://bucket-name.s3.region.amazonaws.com/key` 형태라고 가정
            // 정확한 key 추출을 위해 S3 URL을 저장할 때 key를 같이 저장하는 것이 좋습니다.
            // 여기서는 단순화된 예시를 위해 마지막 '/' 뒤를 key로 간주합니다.
//            String key = s3Url.substring(s3Url.lastIndexOf('/') + 1);


            DeleteObjectRequest deleteObjectRequest = DeleteObjectRequest.builder()
                    .bucket(bucketName)
                    .key(key)
                    .build();

            s3Client.deleteObject(deleteObjectRequest);
            System.out.println("S3에서 파일 삭제 성공: " + key);
        } catch (Exception e) {
            System.err.println("S3 파일 삭제 중 오류 발생: " + e.getMessage());
            e.printStackTrace();
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
