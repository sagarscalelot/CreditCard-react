import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import CardBg from "../../assets/images/card.png";
import creditCard from "../../assets/images/credit-card.png";
import { baseurl } from '../../api/baseurl';
import axios from 'axios';

function AdminCards() {

    const token = localStorage.getItem("Token");
    const header = {
        'Authorization': `Bearer ${token}`,
    }

    const [accountDetails, setAccountDetails] = useState({});
    const [cards, setCards] = useState([]);

    const getAccountDetails = async () => {
        try {
            const response = await axios.get(`${baseurl}/api/user/admin-profile`, { headers: header });
            setAccountDetails(response.data.Data);
        } catch (error) {
            console.log(error);
        }
    }

    const getCards = async () => {
        try {
            const response = await axios.get(`${baseurl}/api/cards/card-view`, { headers: header });
            console.log("cards : ", response.data.Status);
            if (response.data.Status === true) {
                setCards(response.data.data);
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getAccountDetails();
        getCards();
    }, []);

    return (
        <div className="wrapper min-h-full relative">
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <svg width="24" height="16" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.65995 2.41586C8.0277 2.05138 8.03034 1.4578 7.66586 1.09005C7.30139 0.722305 6.7078 0.719657 6.34005 1.08414L4.09664 3.30762C3.25167 4.14505 2.56108 4.82949 2.07132 5.43932C1.56203 6.07348 1.19337 6.71716 1.09489 7.4898C1.0517 7.82858 1.0517 8.17142 1.09489 8.5102C1.19337 9.28284 1.56203 9.92652 2.07132 10.5607C2.56108 11.1705 3.25167 11.855 4.09665 12.6924L6.34005 14.9159C6.7078 15.2803 7.30138 15.2777 7.66586 14.9099C8.03034 14.5422 8.02769 13.9486 7.65995 13.5841L5.45624 11.4C4.56187 10.5136 3.94837 9.90353 3.53324 9.38662C3.39833 9.21863 3.29307 9.07075 3.21135 8.9375H22C22.5178 8.9375 22.9375 8.51777 22.9375 8C22.9375 7.48223 22.5178 7.0625 22 7.0625H3.21135C3.29308 6.92925 3.39833 6.78137 3.53324 6.61338C3.94837 6.09647 4.56187 5.48642 5.45624 4.6L7.65995 2.41586Z" fill="#0F172A" stroke="#0F172A" strokeLinecap="round" />
                    </svg>
                    <h3 className="text-yankeesBlue leading-8 pl-7">{accountDetails.first_name} {accountDetails.last_name} Cards</h3>
                </div>
                <Link to="../adminaddcard" className="btn-secondary flex">
                    <svg className='mr-3' width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.6 1.6C8.6 1.26863 8.33137 1 8 1C7.66863 1 7.4 1.26863 7.4 1.6L7.4 7.4H1.6C1.26863 7.4 1 7.66863 1 8C1 8.33137 1.26863 8.6 1.6 8.6H7.4V14.4C7.4 14.7314 7.66863 15 8 15C8.33137 15 8.6 14.7314 8.6 14.4V8.6H14.4C14.7314 8.6 15 8.33137 15 8C15 7.66863 14.7314 7.4 14.4 7.4H8.6L8.6 1.6Z" fill="white" stroke="white" strokeLinecap="round" />
                    </svg>
                    Add Card
                </Link>
            </div>
            <div className="pt-12 p-5 -mx-5">
                <div className="flex flex-wrap">
                    {cards.map((card) => (
                        <div className="relative w-1/2 2xl:w-1/3 h-72 overflow-hidden px-3 2xl:mb-4" key={card.card_id}>
                            <div className="bg-[#0F172A] rounded-[32px] overflow-hidden">
                                <img src={CardBg} alt="Credit card background" className='w-full h-full object-cover' />
                                <div className="absolute inset-0 p-10">
                                    <span className="text-lg text-white font-semibold">{card.card_holder_name}</span>
                                    <div className="flex flex-col pt-6">
                                        <span className="text-[#94A3B8] text-base leading-7 font-normal">{card.card_bank_name}</span>
                                        <span className="text-white text-2xl font-semibold">********{JSON.stringify((card.card_number)).slice(8)}</span>
                                    </div>
                                    <div className="flex flex-col pt-6">
                                        <span className="text-[#94A3B8] text-base leading-7 font-normal">Total Credit</span>
                                        <span className="text-white text-2xl font-semibold">₹3,00,000</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {/* credit card no Add */}
            {/* <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
				<div className="flex items-center justify-center flex-col">
					<img src={creditCard} alt="Credit Card Images" className='w-full h-full object-cover' />
					<span className="text-[#64748B] text-3xl font-normal pt-5">Please add your cards</span>
				</div>
			</div> */}
        </div>
    )
}

export default AdminCards