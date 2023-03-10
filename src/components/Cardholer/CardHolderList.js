import React, { useState, useEffect } from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
// import { ProductService } from '../service/ProductService';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import { Link } from 'react-router-dom';
import { baseurl } from '../../api/baseurl';
import axios from 'axios';
import logo from '../../assets/images/profile.png'
// import 'primeflex/primeflex.css';

function CardHolderList() {
	const [products, setProducts] = useState([]);
	const [card, setCard] = useState(0)
	const token = localStorage.getItem("Token");
	const header = {
		'Authorization': `Bearer ${token}`,
	}

	const getCardList = async () => {
		try {
			const response = await axios.get(`${baseurl}/api/cards/cards-list/`, { headers: header });
			console.log("RESPONSE>>>", response.data);
			setProducts(response.data);

		} catch (error) {
			console.log(error);
		}
	}
	useEffect(() => {
		getCardList();
	}, []);
	// const [multiSortMeta, setMultiSortMeta] = useState([{ field: 'category', order: -1 }]);
	// const productService = new ProductService();


	// useEffect(() => {
	//     productService.getProductsSmall().then(data => setProducts(data));
	// }, []); // eslint-disable-line react-hooks/exhaustive-deps

	const formatCurrency = (value) => {
		return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
	}

	const priceBodyTemplate = (rowData) => {
		return formatCurrency(rowData.price);
	}
	const columns = [
		{ field: 'user_id.profile_pic', header: 'User' },
		{ field: 'card_holder_name', header: 'Holder Name' },
		{ field: `card_number`, header: 'Card' },
		{ field: 'card_type', header: 'Type' },
		{ field: 'card_bank_name', header: 'Bank name' },
		{ field: 'user_id.email', header: 'Email' },
		{ field: 'due_amount', header: 'Total Due' },
		{ field: 'due_date', header: 'Due date' },
	];

	return (
		<div className="wrapper min-h-full">
			<div className="flex items-center justify-between pb-9">
				<h3 className="text-yankeesBlue leading-8">Holder List</h3>
				<div className="flex space-x-3">
					<Link to='createaccount' className="btn-secondary flex">
						<svg className='mr-3' width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M8.6 1.6C8.6 1.26863 8.33137 1 8 1C7.66863 1 7.4 1.26863 7.4 1.6L7.4 7.4H1.6C1.26863 7.4 1 7.66863 1 8C1 8.33137 1.26863 8.6 1.6 8.6H7.4V14.4C7.4 14.7314 7.66863 15 8 15C8.33137 15 8.6 14.7314 8.6 14.4V8.6H14.4C14.7314 8.6 15 8.33137 15 8C15 7.66863 14.7314 7.4 14.4 7.4H8.6L8.6 1.6Z" fill="white" stroke="white" strokeLinecap="round" />
						</svg>
						Create Account
					</Link>
					<Link to='../dashboard/adminaddcard' className="btn-secondary flex">
						<svg className='mr-3' width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M8.6 1.6C8.6 1.26863 8.33137 1 8 1C7.66863 1 7.4 1.26863 7.4 1.6L7.4 7.4H1.6C1.26863 7.4 1 7.66863 1 8C1 8.33137 1.26863 8.6 1.6 8.6H7.4V14.4C7.4 14.7314 7.66863 15 8 15C8.33137 15 8.6 14.7314 8.6 14.4V8.6H14.4C14.7314 8.6 15 8.33137 15 8C15 7.66863 14.7314 7.4 14.4 7.4H8.6L8.6 1.6Z" fill="white" stroke="white" strokeLinecap="round" />
						</svg>
						Add Card
					</Link>
				</div>
			</div>
			<div className="card">

				<DataTable value={products}>
					{columns.map((col, i) => (
						
							<Column key={col.field} field={col.field} header={col.header} />
						
					))}
				</DataTable>
			</div>
		</div>
	)
}

export default CardHolderList
