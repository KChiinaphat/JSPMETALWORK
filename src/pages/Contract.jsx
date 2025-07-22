import React from 'react';
import logo from '../assets/JSP_Logo.jpg';

const Contract = () => {
    return (
        <div className="relative min-h-screen bg-base-light">
            <div className="absolute inset-0">
                <img src={logo} alt="Background" className="w-full h-full object-cover opacity-10" />
            </div>
            <div className="container mx-auto px-6 py-12 relative z-10">
                <h1 className="text-4xl font-bold mb-8 text-center text-green-primary">ติดต่อเรา</h1>
                <div className="max-w-3xl mx-auto bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-8 border border-green-soft/20">
                    <p className="text-green-secondary mb-8 text-center text-lg">
                        หากคุณมีคำถามหรือต้องการข้อมูลเพิ่มเติม กรุณาติดต่อเราได้เลย
                    </p>
                    <ul className="space-y-6 text-base">
                        <li className="flex items-start gap-4">
                            <span className="font-semibold min-w-[100px] text-green-primary">ที่อยู่:</span>
                            <span className="text-green-secondary">JSP เลขที่ 11/43 หมู่ที่ 1 ตำบลอ้อมน้อย ตำบลอ้อมน้อย อำเภอกระทุ่มแบน จังหวัดสมุทรสาคร 74130</span>
                        </li>
                        <li className="flex items-center gap-4">
                            <span className="font-semibold min-w-[100px] text-green-primary">โทรศัพท์:</span>
                            <a href="tel:+66819879729" className="text-accent-orange hover:text-accent-orange-dark transition-colors">081-987-9729</a>
                        </li>
                        <li className="flex items-center gap-4">
                            <span className="font-semibold min-w-[100px] text-green-primary">อีเมล:</span>
                            <a href="mailto:jsp.metal2517@gmail.com" className="text-accent-orange hover:text-accent-orange-dark transition-colors">jsp.metal2517@gmail.com</a>
                        </li>
                        <li className="flex items-center gap-4">
                            <span className="font-semibold min-w-[100px] text-green-primary">เวลาทำการ:</span>
                            <span className="text-green-secondary">จันทร์ - เสาร์: 08:00 - 17:00 น.</span>
                        </li>
                    </ul>   

                    <div className="mt-12 pt-8 border-t border-green-soft/30">
                        <h2 className="text-2xl font-bold mb-6 text-center text-green-primary">แผนที่ของเรา</h2>
                        <div className="w-full aspect-[16/9]">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3876.564306861667!2d100.27150331113407!3d13.684236586645126!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e295918bd6c405%3A0xfdc11e38c47b1226!2z4Lie4Liy4Lin4LmA4Lin4Lit4Lij4LmM4Lit4Li14LmC4Lih4LiU4Li54Lil4Liy4Lij4LmMIOC4iOC4s-C4geC4seC4lA!5e0!3m2!1sen!2sth!4v1748493483612!5m2!1sen!2sth"
                                className="w-full h-full rounded-lg"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="JSP Location"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contract;
