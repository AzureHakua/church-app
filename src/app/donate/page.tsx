"use client"
import StripeButtonOneTime from '@/components/StripeButtonOneTime';
import StripeButtonMonthly20 from '@/components/StripeButtonMonthlyTwenty';
import StripeButtonMonthly50 from '@/components/StripeButtonMonthlyFifty';
import StripeButtonMonthly100 from '@/components/StripeButtonMonthlyHundred';

export default function Page() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-6">
      <div className="bg-gray-50 p-2 sm:p-6 mb-6 rounded-lg">
        <h1 className="text-lg sm:text-3xl text-center font-bold">Donations</h1>
      </div>


      <div className="flex flex-col md:grid md:grid-cols-[1fr_2fr] gap-6 mb-6">
        <div className="bg-gray-50 p-4 rounded-lg shadow text-black flex flex-col justify-center h-full">
          <p>Tất cả đóng góp cho Saint Joseph Vietnamese Parish sẽ được sử dụng cho nhà thờ tương lai, bác ái, hỗ trợ các cha và xây dựng cộng đoàn.</p>
        </div>

        <div className='text-center'>
          <StripeButtonOneTime />
        </div>
      </div>


      <div className="bg-gray-50 p-2 sm:p-6 mb-6 rounded-lg">
        <h1 className="text-lg sm:text-3xl text-center font-bold">Recurring Donations (Monthly)</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-center">
        <div>
          <StripeButtonMonthly20 />
        </div>
        <div>
          <StripeButtonMonthly50 />
        </div>
        <div>
          <StripeButtonMonthly100 />
        </div>
      </div>
    </main>
  );
}