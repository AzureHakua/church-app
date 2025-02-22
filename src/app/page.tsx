import React from 'react'

export default function Home() {
  return (
    <main className="max-w-7xl mx-auto px-4 py-6">
      {/* Large text field */}
      <div className="bg-gray-50 p-6 mb-6 rounded-lg shadow">
        <h2 className="text-2xl text-red-500 font-semibold mb-4">Sứ Mệnh Của Cộng Đoàn:</h2>
        <p className='text-black'>Chúng tôi là một cộng đoàn với nền tảng gia đình Công Giáo La-Mã. Chúng tôi nhấn mạnh việc tái truyền giáo cho các giáo dân Việt Nam vùng Northshore của Tổng Giáo Phận Boston, và giúp các anh chị em tân tòng trở lại đạo, cũng như giúp các bạn trẻ Công Giáo Việt Nam bận rộn công việc chăm lo cuộc sống gia đình có được thời gian phù hợp, để tham dự Thánh Lễ hằng tuần vào tối thứ Bảy lúc 7:30pm.<br />
        Tạ ơn Thiên Chúa chúc phúc. Hàng tuần chúng tôi hân hoan đón tiếp một số gương mặt trẻ mới, và lâu lâu lại có một vài anh chị em tân tòng xin trở lại đạo. Theo đà phát triển như thế, chúng tôi ôm ấp hy vọng trong tương lai, cộng đoàn chúng tôi sẽ trở thành giáo xứ Việt Nam thứ hai vùng Northshore của Tổng Giáo Phận Boston, sau giáo xứ tiên khởi Chân Phước Andre Phú Yên.<br />
        Hàng tuần trong Thánh Lễ, chúng tôi cùng nhau cầu nguyện cho Giáo Hội, cho đất nước Hoa Kỳ, cho các nước trên thế giới và quê hương yêu dấu Việt Nam, cho tương lai của cộng đoàn chúng tôi, và cho các giáo xứ bạn được ơn đoàn kết yêu thương và cùng nhau phát triển một Giáo Hội chung.<br />
        Nguyện xin Chúa Thánh Thần ban ơn trợ giúp toàn thể anh chị em Công Giáo Việt Nam vùng Boston.  Xin Cha trên Trời luôn ban ơn đoàn kết và yêu thương nhau cho con dân Công Giáo Việt Nam để các cộng đoàn, giáo xứ Việt Nam được phát triển lành mạnh trong ân sủng của Chúa Giêsu Kitô. Xin Thánh cả Giuse luôn che chở, dìu dắt, và cầu bầu cho cộng đoàn chúng con. Amen.</p>
      </div>
      
      {/* Two column layout, stacks on mobile */}
      <div className="flex flex-col md:grid md:grid-cols-2 gap-6">
        {/* Left column */}
        <div className="bg-gray-50 p-6 rounded-lg shadow">
          <h3 className="text-xl text-red-500 font-semibold mb-4">Các Linh mục Việt Nam giúp mục vụ:</h3>
          <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-y-2 sm:gap-x-8">
            {[
              { name: "Cha Giuse Đặng Cao Khiết", phone: "857-588-2171" },
              { name: "Cha Giuse Nguyễn Khang, SJ", phone: "617-276-5234" },
              { name: "Cha cố Giuse Nguyễn Văn Điểm", phone: "617-276-5234" }
            ].map((contact, index) => (
              <React.Fragment key={index}>
                <div className="text-black font-medium">{contact.name}</div>
                <div className="text-gray-800">{contact.phone}</div>
              </React.Fragment>
            ))}
          </div>
          <div className='text-black mt-6'>
            <b>Business manager:</b><br />
            <span className='ml-8' />Maria Ðỗ Thị Thu Sương<br />
            <span className='ml-8' />Email: thusuongdo22@gmail.com<br />
            <b>Assistants: </b><br />
            <span className='ml-8' />Francis Xavier Phillip Pham<br />
            <span className='ml-8' />Theresa Caroline Pham<br />
          </div>
        </div>
        
        {/* Right column */}
        <div className="bg-gray-50 p-6 rounded-lg shadow">
          <h3 className="text-xl text-red-500 font-semibold mb-4">Ban Phục Vụ Cộng Đoàn:</h3>
          <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-y-2 sm:gap-x-8">
            {[
              { name: "Ngoại vụ: Agnes Cao Ngọc Ảnh", phone: "857-222-4219" },
              { name: "Nội vụ: Giuse Trần Thiện", phone: "" },
              { name: "Thư Ký: Martino Phạm Công Danh", phone: "" },
              { name: "Ban Phụng Vụ: Giuse Đặng Văn Trí", phone: "" },
              { name: "Công bố Lời Chúa: Martino Phạm Công Danh", phone: "" },
              { name: "Ca trưởng: Anna Nguyễn Thị Đan Hà", phone: "" },
              { name: "Ban trang trí: Giuse Phạm Văn Đoàn", phone: "" },
              { name: "Ban ẩm thực: Maria Jenifer Trang Du", phone: "" },
              { name: "Ban tài chánh: Maria Jenifer Trang Du", phone: "" }
            ].map((contact, index) => (
              <React.Fragment key={index}>
                <div className="text-black font-medium">{contact.name}</div>
                <div className="text-gray-800">{contact.phone}</div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}