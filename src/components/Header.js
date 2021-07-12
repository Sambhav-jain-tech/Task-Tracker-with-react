import PropTypes from 'prop-types'
import Button from './Button'
//import { useState } from 'react'

const Header = ({ title,showAdd, showTask}) => {
    return (
        <header className="header">
            <h1>{title}</h1>
            
            <Button color= 'black' text={showTask? 'close': 'add'} onClick={showAdd}/>
        </header>
    )
}

Header.defaultProps ={
    title: "Task Tracker",
}

Header.propTypes ={
    title : PropTypes.string.isRequired,
}


// css in js
// const headerStyling = {
//     color:'red',
//     backgroundColor: 'black'
// }
export default Header
