import React from 'react'
import "./Newnav.css"


function NewNav() {



  return (
    <div className="new_nav">
        <div className="nav_data">
            <div className="left_data">
                <p>All</p>
                <p>Mobile</p>
                <p>BestSeller</p>
                <p>Fashion</p>
                <p>Customer Service</p>
                <p>Electronic</p>
                <p>Prime</p>
                <p>Today's deals</p>
                <p>Amazon Pay</p>
            </div>
            <div className="right_data">
                <img src="nav.jpg" alt="navpng" />
            </div>
        </div>
    </div>
  )
}

export default NewNav