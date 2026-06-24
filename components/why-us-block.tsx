import { Check } from "lucide-react";

const points = [
  "Chứng chỉ kế toán viên hành nghề",
  "Báo cáo đúng hạn 99%",
  "Hỗ trợ 7 ngày/tuần",
  "Bảo mật thông tin tuyệt đối",
];

export function WhyUsBlock() {
  return (
    <div className="border rounded-xl p-8 flex flex-col md:flex-row gap-10">
      <div className="flex-1">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-3">
          Vì sao chọn TAF Viet
        </p>
        <h2 className="text-2xl font-medium mb-4">
          Minh bạch, chuyên nghiệp, tận tâm
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Đội ngũ kế toán viên có chứng chỉ hành nghề, am hiểu sâu về pháp luật
          thuế Việt Nam, luôn cập nhật kịp thời các thay đổi chính sách để bảo
          vệ quyền lợi cho doanh nghiệp bạn.
        </p>
      </div>
      <ul className="flex flex-col gap-3 justify-center">
        {points.map((p) => (
          <li key={p} className="flex items-center gap-3 text-sm">
            <Check size={15} className="text-green-600 shrink-0" />
            {p}
          </li>
        ))}
      </ul>
    </div>
  );
}
