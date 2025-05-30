//package com.hello.travelogic.config;
//
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
//import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
//import software.amazon.awssdk.regions.Region;
//import software.amazon.awssdk.services.s3.S3Client;
//
//@Configuration
//public class AwsS3Config {
//
//    @Value("${aws.s3.region}")
//    private String awsRegion;
//    @Value("${aws.s3.access-key}")
//    private String awsAccessKey;
//    @Value("${aws.s3.secret-key}")
//    private String awsSecretKey;
//
//    @Bean
//    public S3Client s3Client() {
//        return S3Client.builder()
//                .region(Region.of(awsRegion))
//                .credentialsProvider(StaticCredentialsProvider.create(
//                        AwsBasicCredentials.create(awsAccessKey, awsSecretKey)))
//                .build();
//    }
//}