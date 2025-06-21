import React, { useState } from 'react';
import { Link } from 'react-router';

const frequenlyAQ = [
    {   
        id: 1,
        title: 'What services do you offer',
        description: 'We offer a wide range of on-demand services including home cleaning, appliance repair, plumbing, electrical work, and parcel delivery. Check our Services page for the full list.'
    },
    {   
        id: 2,
        title: 'How do I book a service?',
        description: 'You can easily book a service through our website or mobile app. Just choose the service you need, select a time slot, and confirm your booking with a few clicks'
    },
    {   
        id: 3,
        title: 'Can I schedule a service in advance?',
        description: 'Yes! You can schedule your service up to 30 days in advance. Just pick a date and time that suits you during the booking process.'
    },
    {   
        id: 4,
        title: 'Do you offer same-day delivery or service?',
        description: 'Yes, we offer same-day services for select options depending on availability in your area. Same-day delivery is also available for eligible items booked before the cut-off time.'
    },
    {   
        id: 5,
        title: 'How are your service providers selected?',
        description: 'All our professionals go through a strict background check, training, and onboarding process to ensure you receive high-quality and trustworthy service.'
    },
    {   
        id: 6,
        title: 'Is there a delivery fee?',
        description: 'Delivery fees depend on the distance and the size of the order. The fee will be calculated and shown to you before you confirm the order.'
    },
    {   
        id: 7,
        title: 'Can I cancel or reschedule my booking?',
        description: 'Yes. You can cancel or reschedule your booking up to 2 hours before the scheduled time without any charges. Late cancellations may incur a fee.'
    },
    {   
        id: 8,
        title: 'What happens if a service provider is late or doesn’t show up?',
        description: 'If a provider is running late, you’ll be notified. If they fail to show up, you’ll receive a full refund or an option to reschedule at no extra cost.'
    },
    {   
        id: 9,
        title: 'How do I pay for the services?',
        description: 'We accept multiple payment methods including credit/debit cards, mobile wallets, and cash on delivery (for select services).'
    },
    {   
        id: 10,
        title: 'Is my information safe with you?',
        description: 'Absolutely. We use industry-standard encryption and data protection practices to ensure your personal information is safe and secure.'
    },
    {   
        id: 11,
        title: 'Do you operate in my area?',
        description: 'We are rapidly expanding. You can check availability by entering your ZIP/postal code on our homepage.'
    },
    {   
        id: 12,
        title: 'How do I contact customer support?',
        description: 'You can reach our support team 24/7 via live chat, email at syedmohiuddinmeshal24@gmail.com, or call us at +880 1764 447574'
    },
]

const Faq = () => {
    const [faq, setFaq] = useState(frequenlyAQ.slice(0, 5));
    const [see, setSee] = useState(true);
    const handleSeeMore = () => {
        if(see === true){
            setFaq(frequenlyAQ);
        }else{  
            setFaq(frequenlyAQ.slice(0, 5));
        }
        setSee(!see);
    }
    return (
        <div className='md:w-10/12 xl:w-8/12 mx-auto my-10 md:my-20 space-y-3'>
            <h2 className='text-5xl font-bold text-black text-center'>Frequently Asked Question (FAQ)</h2>
            <p className='text-gray-400 text-center'>We offer the lowest delivery charge with the highest value along with 100% safety of your product. Pathao courier delivers your parcels in every corner of Bangladesh right on time.</p>
            <div className='mt-5'>
                {
                    faq.map((f) => 
                        <div key={f.id} className="collapse collapse-arrow bg-white border border-base-300 my-3">
                            <input type="radio" name="my-accordion-2"/>
                            <div className="collapse-title font-semibold">{f.title}</div>
                            <div className="collapse-content text-sm  border-t-2 border-gray-400 pt-2">{f.description}</div>
                        </div>
                    )
                }
            </div>
            <div className='flex items-center justify-center'>
                <Link onClick={handleSeeMore} className='btn px-4 py-2 rounded-md bg-[#CAEB66] font-semibold'>{see ? "See More" : "See Less"} FAQ’s</Link>
            </div>
        </div>
    );
};

export default Faq;