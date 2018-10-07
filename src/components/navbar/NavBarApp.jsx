// import React, { Component } from 'react';
// import { withRouter } from "react-router-dom";
// import {
//     Collapse,
//     Navbar,
//     Nav,
//     UncontrolledDropdown,
//     DropdownToggle,
//     DropdownMenu,
//     DropdownItem
// } from 'reactstrap';
// import Lougout from './Lougout';

// class NavBarApp extends Component {

//     handleUsers(e) {
//         e.preventDefault();
//         this.props.history.push('/users');
//     }

//     handleRoles(e) {
//         e.preventDefault();
//         this.props.history.push('/roles');
//     }

//     render() {
//         return (
//             <div>
//                 <Navbar color="light" light expand="md">
//                     <Collapse navbar>
//                         <Nav navbar>
//                             <UncontrolledDropdown nav inNavbar>
//                                 <DropdownToggle nav caret>
//                                     Admin
//                                 </DropdownToggle>
//                                 <DropdownMenu>
//                                     <DropdownItem
//                                         onClick={(e) => this.handleUsers(e)} >
//                                         Users
//                                     </DropdownItem>
//                                     <DropdownItem
//                                         onClick={(e) => this.handleRoles(e)}>
//                                         Roles
//                                     </DropdownItem>
//                                 </DropdownMenu>
//                             </UncontrolledDropdown>
//                             <Lougout />
//                         </Nav>
//                     </Collapse>
//                 </Navbar>
//             </div>
//         );
//     }
// }

// export default withRouter(NavBarApp);