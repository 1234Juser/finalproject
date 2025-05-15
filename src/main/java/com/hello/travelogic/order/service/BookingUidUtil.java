package com.hello.travelogic.order.service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Random;

public class BookingUidUtil {

    // Booking UID 생성
    public static String generateBookingUid() {
        // 알파벳 3자리 (랜덤)
        String alphabet = generateRandomAlphabet(3);

        // 연도 4자리
        String year = String.valueOf(LocalDate.now().getYear());

        // 월일 4자리 (MMDD)
        String monthDay = LocalDate.now().format(DateTimeFormatter.ofPattern("MMdd"));

        // 랜덤 숫자 4자리
        String randomDigits = generateRandomDigits(4);

        // 최종 Booking UID
        return String.format("%s-%s-%s-%s", alphabet, year, monthDay, randomDigits);
    }

    // 랜덤 알파벳 생성 (대문자 3자리)
    private static String generateRandomAlphabet(int length) {
        StringBuilder sb = new StringBuilder(length);
        Random random = new Random();
        for (int i = 0; i < length; i++) {
            char randomChar = (char) ('A' + random.nextInt(26)); // A~Z
            sb.append(randomChar);
        }
        return sb.toString();
    }

    // 랜덤 숫자 생성 (4자리)
    private static String generateRandomDigits(int length) {
        StringBuilder sb = new StringBuilder(length);
        Random random = new Random();
        for (int i = 0; i < length; i++) {
            sb.append(random.nextInt(10)); // 0~9
        }
        return sb.toString();
    }
}
