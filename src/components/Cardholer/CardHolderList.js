import React, { useState, useEffect } from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import Modal from "../modal/Modal";
// import { ProductService } from '../service/ProductService';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import { Link } from 'react-router-dom';
// import 'primeflex/primeflex.css';
import DemoImage from "../../assets/images/profile.png"
import { baseurl } from '../../api/baseurl';
import axios from 'axios';
import SingleCardHolderDetail from './SingleCardHolderDetail';
import { ToastContainer } from 'react-toastify';
function CardHolderList() {
	// const [products, setProducts] = useState([]);
	// const [multiSortMeta, setMultiSortMeta] = useState([{ field: 'category', order: -1 }]);
	// const productService = new ProductService();
	const [users, setUsers] = useState([]);
	const [oneUser, setOneUser] = useState({});
	const [isSingleUserPopUpOpen, setIsSingleUserPopUpOpen] = useState(false);
	const token = localStorage.getItem("Token");
	const [products, setProducts] = useState([]);
	const user = localStorage.getItem("Token");

	// useEffect(() => {
	//     productService.getProductsSmall().then(data => setProducts(data));
	// }, []); // eslint-disable-line react-hooks/exhaustive-deps
	const header = {
		'Authorization': `Bearer ${user}`
	}
	const getCardHolderList = async () => {
		try {
			const response = await axios.get(`${baseurl}/api/user/user-list`, { headers: header });
			console.log("RESPONSE>>>", response.data.data);
			setProducts(response.data.data);
		} catch (error) {
			console.log(error);
		}
	}
	useEffect(() => {
		getCardHolderList();

	}, []);

	const columns = [
		{
			header: 'user', field: (row) => {
				return <div><img width={30} height={30} src={DemoImage} /></div>
			},
		},
		{ field: 'first_name', header: 'Holder Name' },
		{ field: `email`, header: 'Email' },
		{ field: 'phone_no', header: 'Phone Number' },
		{ field: 'aadhar', header: 'Aadhar Card' },
		{ field: 'pan', header: 'Pan Card' },
		{ field: 'cheque', header: 'Cheque' },
	];

	const representativeBodyTemplate = (rowData) => {
		// const representative = rowData.representative;

		return (
			<div className="flex align-items-center gap-2">
				<img alt="Demom Images" src={DemoImage} width="32" />
				<span>Hello Name</span>
			</div>
		);
	};

	const aadharCardBodyTemplate = (rowData) => {
		// const representative = rowData.representative;

		return (
			<div className="flex justify-center items-center gap-3 border border-[#1E293B] rounded-lg py-1.5 max-w-[78px] w-full">
				<svg width="12" height="10" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M13.8529 8.25006L14.4622 8.68744L13.8529 8.25006ZM13.8529 5.75059L13.2437 6.18798L13.8529 5.75059ZM14.4421 7.00033H13.6921H14.4421ZM2.14716 8.25006L2.75641 7.81267L2.14716 8.25006ZM2.14716 5.75059L1.5379 5.31321L2.14716 5.75059ZM1.55798 7.00033H0.807983H1.55798ZM1.5379 8.68745C2.12319 9.50273 2.99916 10.5815 4.07615 11.4633C5.14456 12.3381 6.49021 13.0837 8.00004 13.0837V11.5837C6.98539 11.5837 5.97042 11.0756 5.02642 10.3027C4.09101 9.53679 3.30277 8.57372 2.75641 7.81267L1.5379 8.68745ZM8.00004 13.0837C9.50988 13.0837 10.8555 12.3381 11.9239 11.4633C13.0009 10.5815 13.8769 9.50273 14.4622 8.68744L13.2437 7.81267C12.6973 8.57372 11.9091 9.53679 10.9737 10.3027C10.0297 11.0756 9.01469 11.5837 8.00004 11.5837V13.0837ZM14.4622 5.31321C13.8769 4.49792 13.0009 3.41919 11.9239 2.53737C10.8555 1.66258 9.50988 0.916992 8.00004 0.916992V2.41699C9.01469 2.41699 10.0297 2.92504 10.9737 3.69797C11.9091 4.46386 12.6973 5.42693 13.2437 6.18798L14.4622 5.31321ZM8.00004 0.916992C6.49021 0.916992 5.14456 1.66258 4.07615 2.53737C2.99916 3.41919 2.12319 4.49792 1.5379 5.31321L2.75641 6.18798C3.30277 5.42693 4.09101 4.46386 5.02642 3.69797C5.97042 2.92504 6.98539 2.41699 8.00004 2.41699V0.916992ZM14.4622 8.68744C14.8202 8.18878 15.1921 7.71441 15.1921 7.00033H13.6921C13.6921 7.14433 13.6712 7.21709 13.2437 7.81267L14.4622 8.68744ZM13.2437 6.18798C13.6712 6.78357 13.6921 6.85632 13.6921 7.00033H15.1921C15.1921 6.28624 14.8202 5.81187 14.4622 5.31321L13.2437 6.18798ZM2.75641 7.81267C2.32884 7.21709 2.30798 7.14433 2.30798 7.00033H0.807983C0.807983 7.71441 1.17991 8.18878 1.5379 8.68745L2.75641 7.81267ZM1.5379 5.31321C1.17991 5.81187 0.807983 6.28624 0.807983 7.00033H2.30798C2.30798 6.85632 2.32884 6.78357 2.75641 6.18798L1.5379 5.31321ZM5.25004 7.00033C5.25004 8.51911 6.48126 9.75033 8.00004 9.75033V8.25033C7.30969 8.25033 6.75004 7.69068 6.75004 7.00033H5.25004ZM8.00004 9.75033C9.51883 9.75033 10.75 8.51911 10.75 7.00033H9.25004C9.25004 7.69068 8.6904 8.25033 8.00004 8.25033V9.75033ZM10.75 7.00033C10.75 5.48154 9.51883 4.25033 8.00004 4.25033V5.75033C8.6904 5.75033 9.25004 6.30997 9.25004 7.00033H10.75ZM8.00004 4.25033C6.48126 4.25033 5.25004 5.48154 5.25004 7.00033H6.75004C6.75004 6.30997 7.30969 5.75033 8.00004 5.75033V4.25033Z" fill="#1E293B" />
				</svg>
				<span className='text-xs font-semibold text-[#1E293B]'>View</span>
			</div>
		);
	};

	const panCardBodyTemplate = (rowData) => {
		// const representative = rowData.representative;

		return (
			<div className="flex justify-center items-center gap-3 border border-[#1E293B] rounded-lg py-1.5 max-w-[78px] w-full">
				<svg width="12" height="10" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M13.8529 8.25006L14.4622 8.68744L13.8529 8.25006ZM13.8529 5.75059L13.2437 6.18798L13.8529 5.75059ZM14.4421 7.00033H13.6921H14.4421ZM2.14716 8.25006L2.75641 7.81267L2.14716 8.25006ZM2.14716 5.75059L1.5379 5.31321L2.14716 5.75059ZM1.55798 7.00033H0.807983H1.55798ZM1.5379 8.68745C2.12319 9.50273 2.99916 10.5815 4.07615 11.4633C5.14456 12.3381 6.49021 13.0837 8.00004 13.0837V11.5837C6.98539 11.5837 5.97042 11.0756 5.02642 10.3027C4.09101 9.53679 3.30277 8.57372 2.75641 7.81267L1.5379 8.68745ZM8.00004 13.0837C9.50988 13.0837 10.8555 12.3381 11.9239 11.4633C13.0009 10.5815 13.8769 9.50273 14.4622 8.68744L13.2437 7.81267C12.6973 8.57372 11.9091 9.53679 10.9737 10.3027C10.0297 11.0756 9.01469 11.5837 8.00004 11.5837V13.0837ZM14.4622 5.31321C13.8769 4.49792 13.0009 3.41919 11.9239 2.53737C10.8555 1.66258 9.50988 0.916992 8.00004 0.916992V2.41699C9.01469 2.41699 10.0297 2.92504 10.9737 3.69797C11.9091 4.46386 12.6973 5.42693 13.2437 6.18798L14.4622 5.31321ZM8.00004 0.916992C6.49021 0.916992 5.14456 1.66258 4.07615 2.53737C2.99916 3.41919 2.12319 4.49792 1.5379 5.31321L2.75641 6.18798C3.30277 5.42693 4.09101 4.46386 5.02642 3.69797C5.97042 2.92504 6.98539 2.41699 8.00004 2.41699V0.916992ZM14.4622 8.68744C14.8202 8.18878 15.1921 7.71441 15.1921 7.00033H13.6921C13.6921 7.14433 13.6712 7.21709 13.2437 7.81267L14.4622 8.68744ZM13.2437 6.18798C13.6712 6.78357 13.6921 6.85632 13.6921 7.00033H15.1921C15.1921 6.28624 14.8202 5.81187 14.4622 5.31321L13.2437 6.18798ZM2.75641 7.81267C2.32884 7.21709 2.30798 7.14433 2.30798 7.00033H0.807983C0.807983 7.71441 1.17991 8.18878 1.5379 8.68745L2.75641 7.81267ZM1.5379 5.31321C1.17991 5.81187 0.807983 6.28624 0.807983 7.00033H2.30798C2.30798 6.85632 2.32884 6.78357 2.75641 6.18798L1.5379 5.31321ZM5.25004 7.00033C5.25004 8.51911 6.48126 9.75033 8.00004 9.75033V8.25033C7.30969 8.25033 6.75004 7.69068 6.75004 7.00033H5.25004ZM8.00004 9.75033C9.51883 9.75033 10.75 8.51911 10.75 7.00033H9.25004C9.25004 7.69068 8.6904 8.25033 8.00004 8.25033V9.75033ZM10.75 7.00033C10.75 5.48154 9.51883 4.25033 8.00004 4.25033V5.75033C8.6904 5.75033 9.25004 6.30997 9.25004 7.00033H10.75ZM8.00004 4.25033C6.48126 4.25033 5.25004 5.48154 5.25004 7.00033H6.75004C6.75004 6.30997 7.30969 5.75033 8.00004 5.75033V4.25033Z" fill="#1E293B" />
				</svg>
				<span className='text-xs font-semibold text-[#1E293B]'>View</span>
			</div>
		);
	};

	const ChequeBodyTemplate = (rowData) => {
		// const representative = rowData.representative;

		return (
			<div className="flex justify-center items-center gap-3 border border-[#1E293B] rounded-lg py-1.5 max-w-[78px] w-full">
				<svg width="12" height="10" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M13.8529 8.25006L14.4622 8.68744L13.8529 8.25006ZM13.8529 5.75059L13.2437 6.18798L13.8529 5.75059ZM14.4421 7.00033H13.6921H14.4421ZM2.14716 8.25006L2.75641 7.81267L2.14716 8.25006ZM2.14716 5.75059L1.5379 5.31321L2.14716 5.75059ZM1.55798 7.00033H0.807983H1.55798ZM1.5379 8.68745C2.12319 9.50273 2.99916 10.5815 4.07615 11.4633C5.14456 12.3381 6.49021 13.0837 8.00004 13.0837V11.5837C6.98539 11.5837 5.97042 11.0756 5.02642 10.3027C4.09101 9.53679 3.30277 8.57372 2.75641 7.81267L1.5379 8.68745ZM8.00004 13.0837C9.50988 13.0837 10.8555 12.3381 11.9239 11.4633C13.0009 10.5815 13.8769 9.50273 14.4622 8.68744L13.2437 7.81267C12.6973 8.57372 11.9091 9.53679 10.9737 10.3027C10.0297 11.0756 9.01469 11.5837 8.00004 11.5837V13.0837ZM14.4622 5.31321C13.8769 4.49792 13.0009 3.41919 11.9239 2.53737C10.8555 1.66258 9.50988 0.916992 8.00004 0.916992V2.41699C9.01469 2.41699 10.0297 2.92504 10.9737 3.69797C11.9091 4.46386 12.6973 5.42693 13.2437 6.18798L14.4622 5.31321ZM8.00004 0.916992C6.49021 0.916992 5.14456 1.66258 4.07615 2.53737C2.99916 3.41919 2.12319 4.49792 1.5379 5.31321L2.75641 6.18798C3.30277 5.42693 4.09101 4.46386 5.02642 3.69797C5.97042 2.92504 6.98539 2.41699 8.00004 2.41699V0.916992ZM14.4622 8.68744C14.8202 8.18878 15.1921 7.71441 15.1921 7.00033H13.6921C13.6921 7.14433 13.6712 7.21709 13.2437 7.81267L14.4622 8.68744ZM13.2437 6.18798C13.6712 6.78357 13.6921 6.85632 13.6921 7.00033H15.1921C15.1921 6.28624 14.8202 5.81187 14.4622 5.31321L13.2437 6.18798ZM2.75641 7.81267C2.32884 7.21709 2.30798 7.14433 2.30798 7.00033H0.807983C0.807983 7.71441 1.17991 8.18878 1.5379 8.68745L2.75641 7.81267ZM1.5379 5.31321C1.17991 5.81187 0.807983 6.28624 0.807983 7.00033H2.30798C2.30798 6.85632 2.32884 6.78357 2.75641 6.18798L1.5379 5.31321ZM5.25004 7.00033C5.25004 8.51911 6.48126 9.75033 8.00004 9.75033V8.25033C7.30969 8.25033 6.75004 7.69068 6.75004 7.00033H5.25004ZM8.00004 9.75033C9.51883 9.75033 10.75 8.51911 10.75 7.00033H9.25004C9.25004 7.69068 8.6904 8.25033 8.00004 8.25033V9.75033ZM10.75 7.00033C10.75 5.48154 9.51883 4.25033 8.00004 4.25033V5.75033C8.6904 5.75033 9.25004 6.30997 9.25004 7.00033H10.75ZM8.00004 4.25033C6.48126 4.25033 5.25004 5.48154 5.25004 7.00033H6.75004C6.75004 6.30997 7.30969 5.75033 8.00004 5.75033V4.25033Z" fill="#1E293B" />
				</svg>
				<span className='text-xs font-semibold text-[#1E293B]'>View</span>
			</div>
		);
	};


	return (
		<div>
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
					{/* <Link to='../dashboard/adminaddcard' className="btn-secondary flex">
						<svg className='mr-3' width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M8.6 1.6C8.6 1.26863 8.33137 1 8 1C7.66863 1 7.4 1.26863 7.4 1.6L7.4 7.4H1.6C1.26863 7.4 1 7.66863 1 8C1 8.33137 1.26863 8.6 1.6 8.6H7.4V14.4C7.4 14.7314 7.66863 15 8 15C8.33137 15 8.6 14.7314 8.6 14.4V8.6H14.4C14.7314 8.6 15 8.33137 15 8C15 7.66863 14.7314 7.4 14.4 7.4H8.6L8.6 1.6Z" fill="white" stroke="white" strokeLinecap="round" />
						</svg>
						Add Card
					</Link> */}
				</div>
			</div>
			<div className="card">
				{/* <DataTable sortMode="multiple" responsiveLayout="scroll"> */}
				{/* <Column field="Holder Name" header="Holder Name" sortable></Column> */}
				{/* <Column header="Holder Name" body={representativeBodyTemplate} sortable />
					<Column field="Email" header="Email" sortable></Column>
					<Column field="Phone Number" header="Phone Number" sortable></Column>
					<Column field="Aadhar card" header="Aadhar card" body={aadharCardBodyTemplate} sortable></Column>
					<Column field="Pan Card" header="Pan Card" body={panCardBodyTemplate} sortable></Column>
					<Column field="Cheque" header="Cheque" body={ChequeBodyTemplate} sortable></Column> */}
				{/* </DataTable> */}
				<DataTable value={products}>
					{columns.map((col, i) => (

						<Column key={col.field} field={col.field} header={col.header} />

					))}
				</DataTable>
			</div>
		</div>
			<Modal isOpen={isSingleUserPopUpOpen}>
					<SingleCardHolderDetail handleClose={setIsSingleUserPopUpOpen} details={oneUser} />

			</Modal>
			<ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
		</div>
	)
}

export default CardHolderList
