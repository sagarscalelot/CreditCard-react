import React,{useState, useEffect} from 'react'
import { Link, NavLink, Route, Routes, useNavigate } from 'react-router-dom'
import Logo from '../../assets/images/logo.png'
import DashboardIcon from '../../assets/svg/dashboard-lcon.svg'
import CardHolderIcon from '../../assets/svg/cardHolder-icon.svg'
import PaymentIcon from '../../assets/svg/payment.svg'
import TransactIons from '../../assets/svg/transactions.svg'
import CommissionIcon from '../../assets/svg/commission.svg'
import HelpIcon from '../../assets/svg/help.svg'
import LogoutIcon from '../../assets/svg/logout.svg'
import SearchIcon from '../../assets/svg/search.svg'
import Notification from '../../assets/svg/notification.svg'
import CardAdd from '../../assets/svg/newaddCard.svg'
import Profile from '../../assets/images/profile.png'
import BackArrow from '../../assets/svg/backArrow.svg'
// import Login from '../auth/Login'
import CardHolderList from '../Cardholer/CardHolderList'
import AdminAccountDetails from '../Admin/AdminAccountDetails'
import AdminCards from '../Admin/AdminCards'
import AdminAddCard from '../Admin/AdminAddCard'
import CreateAccount from '../Cardholer/CreateAccount'
import SingleCardHolderDetail from '../Cardholer/SingleCardHolderDetail';
import { baseurl } from '../../api/baseurl';
import axios from 'axios';

function SideBar() {
	const navigator = useNavigate();
	const token = localStorage.getItem("Token");
    const [details, setDetails] = useState({});
		const header = {
			'Authorization': `Bearer ${token}`,
	}
	
	const getCardDetails = async () => {
		try {
				const response = await axios.get(`${baseurl}/api/user/user-profile/`, { headers: header });
				console.log("RESPONSE>>>", response.data.data);
				setDetails(response.data.data)
		} catch (error) {
				console.log(error);
		}
}
useEffect(() => {
		getCardDetails();
}, []);
	return (
		<div className="main flex min-h-screen bg-white">
			{/* <!-- Left Panel --> */}
			<div className="leftPanel max-w-[230px] w-full bg-lightWhite border-[#CBD5E1] border-r-2 relative z-30">
				<div className="flex flex-col min-h-full">
					<div className="mx-auto py-[64px] pl-[64px]">
						<img src={Logo} alt="logo images" />
					</div>
					<nav className="SideNav px-[24px]">
						<NavLink to="../dashboard" activeclassname="active" className="SideLink flex items-center rounded-lg px-[18px] py-4 text-lightGray ">
							<img src={DashboardIcon} alt="DashboardIcon" />
							<span className="text-sm font-bold leading-5  pl-[13px]">Dashboard</span>
						</NavLink>
						<NavLink to="../cardholder" activeclassname="active" className="SideLink flex items-center rounded-lg px-[18px] py-4 text-lightGray">
							<img src={CardHolderIcon} alt="DashboardIcon" />
							<span className="text-sm font-bold leading-5 pl-[13px]">Cards Holder</span>
						</NavLink>
						<NavLink to="/" activeclassname="active" className="SideLink flex items-center rounded-lg px-[18px] py-4 text-lightGray">
							<img src={PaymentIcon} alt="DashboardIcon" />
							<span className="text-sm font-bold leading-5 pl-[13px]">Payments</span>
						</NavLink>
						<NavLink to="/" activeclassname="active" className="SideLink flex items-center rounded-lg px-[18px] py-4 text-lightGray">
							<img src={TransactIons} alt="DashboardIcon" />
							<span className="text-sm font-bold leading-5 pl-[13px]">Transactions</span>
						</NavLink>
						<NavLink to="/" activeclassname="active" className="SideLink flex items-center rounded-lg px-[18px] py-4 text-lightGray">
							<img src={CommissionIcon} alt="DashboardIcon" />
							<span className="text-sm font-bold leading-5 pl-[13px]">Commission</span>
						</NavLink>
					</nav>
					<div className="mt-auto px-[24px] mb-[80px]">
						<Link to="/" className="SideLink flex items-center rounded-lg px-[18px] py-3.5 text-lightGray">
							<img src={HelpIcon} alt="DashboardIcon" />
							<span className="text-sm font-bold leading-5 pl-[13px]">Help</span>
						</Link>
						<button onClick={() => navigator('./')} className="SideLink w-full flex items-center rounded-lg px-[18px] py-3.5 text-lightGray">
							<img src={LogoutIcon} alt="DashboardIcon" />
							<span className="text-sm font-bold leading-5 pl-[13px]">Logout</span>
						</button>
					</div>
				</div>
			</div>
			{/* Right Panel  */}
			<div className="w-full">
				{/* <!-- Top Header --> */}
				<div className="w-full bg-lightWhite py-6 px-6 xl:px-20 xl:py-7 flex flex-wrap items-center border-[#CBD5E1] border-b-2">
					<div className="w-full flex justify-between items-center ">
						<h2 className='block font-bold leading-[48px] text-[#0F172A]'>Dashboard</h2>
						<div className="flex items-center space-x-10">
							<button type="button" className=""><img src={SearchIcon} alt="Search Icon" /></button>
							<div className="relative group">
								<button type="button" className=""><img src={Notification} alt="Notification Icon" /></button>
								{/* Notification Box  */}
								<div className="absolute right-0 top-10 w-full min-w-[482px] bg-white rounded-2xl p-6 shadow-shadowbox invisible group-hover:visible opacity-0 group-hover:opacity-100 translate-y-16 group-hover:translate-y-0 z-40 anim">
									<h6 className="text-[#1F2937] text-lg font-bold leading-8 border-b-2 border-[#CBD5E1] pb-2">Notifications</h6>
									<div className="space-y-6 pt-6">
										<div className="flex justify-between items-center">
											<div className="flex">
												<div className="w-8 h-8 rounded-full overflow-hidden">
													<img src={Profile} alt="Notification Images" className='w-full h-full object-cover' />
												</div>
												<div className="text-sm text-yankeesBlue pl-4">
													<div className="">
														<span className="font-bold">Ray Arnold</span>
														<span className="font-normal font-second pl-1">profile verify request</span>
													</div>
													<span className="font-second text-[#9CA3AF] text-xs font-normal">Yesterday at 11:42 PM</span>
												</div>
											</div>
											<div className="space-x-4">
												<button type="button" className="text-xs font-semibold text-[#64748B] border-[#64748B] border-2 rounded-lg py-2 px-3">View</button>
												<button type="button" className="text-xs font-semibold bg-darkGreen text-white border-darkGreen border-2 rounded-lg py-2 px-3">Approve</button>
											</div>
										</div>
										<div className="flex justify-between items-center">
											<div className="flex">
												<div className="w-8 h-8 rounded-full overflow-hidden">
													<img src={Profile} alt="Notification Images" className='w-full h-full object-cover' />
												</div>
												<div className="text-sm text-yankeesBlue pl-4">
													<div className="">
														<span className="font-bold">Ray Arnold</span>
														<span className="font-normal font-second pl-1">profile verify request profile verify request</span>
													</div>
													<span className="font-second text-[#9CA3AF] text-xs font-normal">Yesterday at 11:42 PM</span>
												</div>
											</div>
										</div>
										<div className="flex justify-between items-center">
											<div className="flex">
												<div className="w-8 h-8 rounded-full overflow-hidden">
													<img src={Profile} alt="Notification Images" className='w-full h-full object-cover' />
												</div>
												<div className="text-sm text-yankeesBlue pl-4">
													<div className="">
														<span className="font-bold">Ray Arnold</span>
														<span className="font-normal font-second pl-1">profile verify request profile verify request</span>
													</div>
													<span className="font-second text-[#9CA3AF] text-xs font-normal">Yesterday at 11:42 PM</span>
												</div>
											</div>
										</div>
										<div className="flex justify-between items-center">
											<div className="flex">
												<div className="w-8 h-8 rounded-full overflow-hidden">
													<img src={Profile} alt="Notification Images" className='w-full h-full object-cover' />
												</div>
												<div className="text-sm text-yankeesBlue pl-4">
													<div className="">
														<span className="font-bold">Ray Arnold</span>
														<span className="font-normal font-second pl-1">profile verify request</span>
													</div>
													<span className="font-second text-[#9CA3AF] text-xs font-normal">Yesterday at 11:42 PM</span>
												</div>
											</div>
											<div className="space-x-4">
												<button type="button" className="text-xs font-semibold text-[#64748B] border-[#64748B] border-2 rounded-lg py-2 px-3">View</button>
												<button type="button" className="text-xs font-semibold bg-darkGreen text-white border-darkGreen border-2 rounded-lg py-2 px-3">Approve</button>
											</div>
										</div>
										<div className="flex justify-between items-center">
											<div className="flex">
												<div className="w-8 h-8 rounded-full overflow-hidden">
													<img src={Profile} alt="Notification Images" className='w-full h-full object-cover' />
												</div>
												<div className="text-sm text-yankeesBlue pl-4">
													<div className="">
														<span className="font-bold">Ray Arnold</span>
														<span className="font-normal font-second pl-1">profile verify request profile verify request</span>
													</div>
													<span className="font-second text-[#9CA3AF] text-xs font-normal">Yesterday at 11:42 PM</span>
												</div>
											</div>
										</div>
										<div className="flex justify-between items-center">
											<div className="flex">
												<div className="w-8 h-8 rounded-full overflow-hidden">
													<img src={Profile} alt="Notification Images" className='w-full h-full object-cover' />
												</div>
												<div className="text-sm text-yankeesBlue pl-4">
													<div className="">
														<span className="font-bold">Ray Arnold</span>
														<span className="font-normal font-second pl-1">profile verify request profile verify request</span>
													</div>
													<span className="font-second text-[#9CA3AF] text-xs font-normal">Yesterday at 11:42 PM</span>
												</div>
											</div>
										</div>
										<div className="flex justify-between items-center">
											<div className="flex">
												<div className="w-8 h-8 rounded-full overflow-hidden">
													<img src={Profile} alt="Notification Images" className='w-full h-full object-cover' />
												</div>
												<div className="text-sm text-yankeesBlue pl-4">
													<div className="">
														<span className="font-bold">Ray Arnold</span>
														<span className="font-normal font-second pl-1">profile verify request</span>
													</div>
													<span className="font-second text-[#9CA3AF] text-xs font-normal">Yesterday at 11:42 PM</span>
												</div>
											</div>
											<div className="space-x-4">
												<button type="button" className="text-xs font-semibold text-[#64748B] border-[#64748B] border-2 rounded-lg py-2 px-3">View</button>
												<button type="button" className="text-xs font-semibold bg-darkGreen text-white border-darkGreen border-2 rounded-lg py-2 px-3">Approve</button>
											</div>
										</div>
										<div className="flex justify-between items-center">
											<div className="flex">
												<div className="w-8 h-8 rounded-full overflow-hidden">
													<img src={Profile} alt="Notification Images" className='w-full h-full object-cover' />
												</div>
												<div className="text-sm text-yankeesBlue pl-4">
													<div className="">
														<span className="font-bold">Ray Arnold</span>
														<span className="font-normal font-second pl-1">profile verify request profile verify request</span>
													</div>
													<span className="font-second text-[#9CA3AF] text-xs font-normal">Yesterday at 11:42 PM</span>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<button type="button" className=""><img src={CardAdd} alt="New ADD Card Icon" /></button>
							<button type="button" className="relative flex items-center bg-azureishWhite rounded-full py-[6px] px-4 group">
								<div className="relative">
									<div className="flex items-center">
										<div className="flex items-center">
											<div className="w-9 h-9 overflow-hidden rounded-full bg-white">
												<img src={Profile} alt="Profile Avatar" className='w-full h-full object-cover object-top' />
											</div>
											<span className="block text-left max-w-[120px] min-w-[120px] w-full text-sm font-bold leading-5 text-[#1E293B] ml-3 truncate">{details?.first_name} {details?.last_name}</span>
										</div>
										<img src={BackArrow} alt="Back Arrow Icon" className='pl-2' />
									</div>
								</div>
								{/* Profile Details Box   */}
								<div className="absolute w-full top-[54px] right-0 bg-white rounded-2xl shadow-shadowbox max-w-[218px] min-w-[218px] invisible group-hover:visible opacity-0 group-hover:opacity-100 translate-y-10 group-hover:translate-y-0 z-40 anim">
									<div className="">
										<span onClick={() => navigator('dashboard/adminaccountdetails')} className='w-full block text-left text-[#334155] hover:text-darkGreen text-sm font-medium anim px-6 py-2 pt-4'>Account Details</span>
										<span onClick={() => navigator('dashboard/admincards')} className='w-full block text-left text-[#334155] hover:text-darkGreen text-sm font-medium anim px-6 py-2'>Cards</span>
										<span className='w-full block text-left text-[#334155] hover:text-darkGreen text-sm font-medium anim px-6 py-2'>My wallet</span>
										<span className='w-full block text-left text-[#334155] hover:text-darkGreen text-sm font-medium anim px-6 py-2'>Bank Accounts</span>
										<span className='w-full block text-left text-[#334155] hover:text-darkGreen text-sm font-medium anim px-6 py-2 pb-4'>Transactions</span>
									</div>
								</div>
							</button>
						</div>
					</div>
				</div>
				{/* <!-- Content In --> */}
				<div className="rightInContent">
					<Routes>
						<Route path='dashboard'>
							<Route index path='admincards' element={<AdminCards />} />
							<Route path='adminaccountdetails' element={<AdminAccountDetails />} />
							<Route path='adminaddcard' element={<AdminAddCard />} />
						</Route>
						<Route path='cardholder'>
							<Route index element={<CardHolderList />} />
							<Route path='createaccount' element={<CreateAccount />} />
							<Route path='singlecardholderdetail' element={<SingleCardHolderDetail />} />
						</Route>
					</Routes>
				</div>
			</div>
		</div>

	)
}

export default SideBar