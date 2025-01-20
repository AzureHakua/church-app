import Image from 'next/image'

export default function Banner() {
  return (
    <div className="relative h-80">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/images/banner-bg.jpg" // Update this path to match your image
          alt="Church Banner"
          fill
          className="object-cover object-[center_30%]"
          priority
        />
      </div>
      
      {/* Overlay to ensure text is readable */}
      <div className="absolute inset-0 bg-black/30" /> {/* Adjust opacity as needed */}
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 h-full">
        <div className="flex flex-col justify-center items-center h-full text-center">
          <h1 className="text-4xl font-bold text-red-500">CỘNG ĐOÀN THÁNH GIUSE</h1>
          <p className="mt-2 text-xl text-white">
            Thánh Lễ Việt Nam hằng tuần 7:30 pm tại giáo đường: <br />
            IMMACULATE CONCEPTION <br />
            Basement Chapel <br />
            489 BROADWAY <br />
            EVERETT, MA 02149 <br />
            Email: StJosephVietParish@gmail.com
          </p>
        </div>
      </div>
    </div>
  );
}