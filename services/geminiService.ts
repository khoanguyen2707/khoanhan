
export const generateLoveLetter = async (): Promise<string> => {
  // Hard-code nội dung, không gọi Gemini / API nào hết
  const letters: string[] = [
    "Anh biết là em sẽ chọn anh mà. Cảm ơn em đã bước vào cuộc đời anh, biến mọi khoảnh khắc trở nên rực rỡ và đầy ý nghĩa. Anh yêu em!",
    "Từ ngày em đến, mọi thứ trong anh đều đổi khác. Chỉ cần nghĩ đến em thôi là cả thế giới bỗng trở nên dịu dàng hơn rất nhiều.",
    "Giữa hàng ngàn lựa chọn, anh chỉ mong em chọn mỗi mình anh. Anh hứa sẽ nắm tay em đi qua mọi vui buồn, không bao giờ buông.",
    "Cảm ơn em vì đã xuất hiện, vì đã mỉm cười, vì đã vô tình làm trái tim anh rung động. Nếu được, anh chỉ xin một đặc quyền: được thương em cả đời.",
  ];

  // Giữ lại cảm giác “đang viết thư” bằng cách delay nhẹ
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const index = Math.floor(Math.random() * letters.length);
  return letters[index];
};
