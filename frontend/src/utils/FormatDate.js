// 날짜 포맷 함수 (채팅방용)
const FormatDate = (isoString) => {
        const date = new Date(isoString);
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = date.getHours();
        const minutes = String(date.getMinutes()).padStart(2, '0');

        const ampm = hours < 12 ? '오전' : '오후';
        const formattedHour = String(hours % 12 || 12).padStart(2, '0');

        return `${month}.${day} ${ampm} ${formattedHour}:${minutes}`;
}

export default FormatDate;
